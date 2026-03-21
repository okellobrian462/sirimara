'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';

interface NavigationItem {
    id: string;
    menu_location: string;
    label: string;
    url: string;
    order_index: number;
    is_active: boolean;
    opens_in_new_tab: boolean;
}

const MENU_LOCATIONS = [
    { value: 'header_main', label: 'Header Main Navigation' },
    { value: 'header_secondary', label: 'Header Secondary Navigation' },
    { value: 'footer_company', label: 'Footer - Company' },
    { value: 'footer_resources', label: 'Footer - Resources' },
    { value: 'footer_portfolio', label: 'Footer - Brand Portfolio' },
    { value: 'footer_markets', label: 'Footer - Our Markets' },
    { value: 'footer_legal', label: 'Footer - Legal' },
];

export default function NavigationPage() {
    const [activeTab, setActiveTab] = useState('header_main');
    const [items, setItems] = useState<NavigationItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);

    const [formData, setFormData] = useState({
        label: '',
        url: '',
        opens_in_new_tab: false,
        is_active: true,
    });



    const fetchItems = useCallback(async () => {
        setLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase
            .from('navigation_items')
            .select('*')
            .eq('menu_location', activeTab)
            .order('order_index', { ascending: true });

        if (!error && data) {
            setItems(data);
        }
        setLoading(false);
    }, [activeTab]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    function openModal(item?: NavigationItem) {
        if (item) {
            setEditingItem(item);
            setFormData({
                label: item.label,
                url: item.url,
                opens_in_new_tab: item.opens_in_new_tab,
                is_active: item.is_active,
            });
        } else {
            setEditingItem(null);
            setFormData({
                label: '',
                url: '',
                opens_in_new_tab: false,
                is_active: true,
            });
        }
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setEditingItem(null);
        setFormData({
            label: '',
            url: '',
            opens_in_new_tab: false,
            is_active: true,
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const supabase = createClient();

        if (editingItem) {
            // Update existing item
            const { error } = await supabase
                .from('navigation_items')
                .update(formData)
                .eq('id', editingItem.id);

            if (!error) {
                fetchItems();
                closeModal();
            }
        } else {
            // Create new item
            const maxOrder = items.length > 0 ? Math.max(...items.map(i => i.order_index)) : 0;
            const { error } = await supabase
                .from('navigation_items')
                .insert({
                    ...formData,
                    menu_location: activeTab,
                    order_index: maxOrder + 1,
                });

            if (!error) {
                fetchItems();
                closeModal();
            }
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this navigation item?')) return;

        const supabase = createClient();
        const { error } = await supabase
            .from('navigation_items')
            .delete()
            .eq('id', id);

        if (!error) {
            fetchItems();
        }
    }

    async function handleToggleActive(item: NavigationItem) {
        const supabase = createClient();
        const { error } = await supabase
            .from('navigation_items')
            .update({ is_active: !item.is_active })
            .eq('id', item.id);

        if (!error) {
            fetchItems();
        }
    }

    async function moveItem(index: number, direction: 'up' | 'down') {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === items.length - 1) return;

        const newItems = [...items];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];

        // Update order_index for both items
        const supabase = createClient();
        await Promise.all([
            supabase
                .from('navigation_items')
                .update({ order_index: targetIndex })
                .eq('id', newItems[targetIndex].id),
            supabase
                .from('navigation_items')
                .update({ order_index: index })
                .eq('id', newItems[index].id),
        ]);

        fetchItems();
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-light tracking-[0.15em] text-gray-900 mb-2">
                    NAVIGATION MANAGEMENT
                </h1>
                <p className="text-gray-500">
                    Manage navigation menus across your site
                </p>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <div className="flex gap-4 overflow-x-auto">
                    {MENU_LOCATIONS.map((location) => (
                        <button
                            key={location.value}
                            onClick={() => setActiveTab(location.value)}
                            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === location.value
                                ? 'border-orange-600 text-orange-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {location.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Add Button */}
            <div className="mb-6">
                <button
                    onClick={() => openModal()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Navigation Item
                </button>
            </div>

            {/* Items List */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading...</div>
                ) : items.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No navigation items yet. Click "Add Navigation Item" to create one.
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {items.map((item, index) => (
                            <div
                                key={item.id}
                                className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                            >
                                {/* Drag Handle */}
                                <div className="flex flex-col gap-1">
                                    <button
                                        onClick={() => moveItem(index, 'up')}
                                        disabled={index === 0}
                                        className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                                    >
                                        <GripVertical className="w-4 h-4 text-gray-400" />
                                    </button>
                                    <button
                                        onClick={() => moveItem(index, 'down')}
                                        disabled={index === items.length - 1}
                                        className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                                    >
                                        <GripVertical className="w-4 h-4 text-gray-400" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-medium text-gray-900">{item.label}</h3>
                                        {!item.is_active && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                                Inactive
                                            </span>
                                        )}
                                        {item.opens_in_new_tab && (
                                            <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                                                New Tab
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{item.url}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleToggleActive(item)}
                                        className={`px-3 py-1 text-xs rounded transition-colors ${item.is_active
                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {item.is_active ? 'Active' : 'Inactive'}
                                    </button>
                                    <button
                                        onClick={() => openModal(item)}
                                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                                    >
                                        <Edit className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 hover:bg-red-100 rounded transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            {editingItem ? 'Edit Navigation Item' : 'Add Navigation Item'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Label *
                                </label>
                                <input
                                    type="text"
                                    value={formData.label}
                                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    URL *
                                </label>
                                <input
                                    type="text"
                                    value={formData.url}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    required
                                    placeholder="/page or https://..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="opens_in_new_tab"
                                    checked={formData.opens_in_new_tab}
                                    onChange={(e) => setFormData({ ...formData, opens_in_new_tab: e.target.checked })}
                                    className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                                />
                                <label htmlFor="opens_in_new_tab" className="text-sm font-medium text-gray-700">
                                    Open in new tab
                                </label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={formData.is_active}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                                    Active
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                                >
                                    {editingItem ? 'Update' : 'Create'}
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
