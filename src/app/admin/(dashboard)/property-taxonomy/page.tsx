'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';

interface TaxonomyItem {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    order_index: number;
    is_active: boolean;
    category?: string; 
}

const TABS = [
    { value: 'categories', label: 'Categories', table: 'property_categories' },
    { value: 'types', label: 'Property Types', table: 'property_types' },
    { value: 'contract_types', label: 'Contract Types', table: 'property_contract_types' },
    { value: 'features', label: 'Features', table: 'property_features' },
];

const FEATURE_CATEGORIES = [
    { value: 'security', label: 'Security' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'recreational', label: 'Recreational' },
    { value: 'interior', label: 'Interior' },
    { value: 'exterior', label: 'Exterior' },
    { value: 'general', label: 'General' },
];

export default function PropertyTaxonomyPage() {
    const [activeTab, setActiveTab] = useState('categories');
    const [items, setItems] = useState<TaxonomyItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TaxonomyItem | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        category: 'general',
        is_active: true,
    });

    const currentTable = TABS.find(t => t.value === activeTab)?.table || 'property_categories';
    const isFeaturesTab = activeTab === 'features';

    const fetchItems = useCallback(async () => {
        setLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase
            .from(currentTable)
            .select('*')
            .order('order_index', { ascending: true })
            .order('name', { ascending: true });

        if (!error && data) {
            setItems(data as TaxonomyItem[]);
        }
        setLoading(false);
    }, [currentTable]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    function generateSlug(name: string): string {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    }

    function openModal(item?: TaxonomyItem) {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name,
                slug: item.slug,
                description: item.description || '',
                category: item.category || 'general',
                is_active: item.is_active,
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: '',
                slug: '',
                description: '',
                category: 'general',
                is_active: true,
            });
        }
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setEditingItem(null);
        setFormData({
            name: '',
            slug: '',
            description: '',
            category: 'general',
            is_active: true,
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const supabase = createClient();

        const slug = formData.slug || generateSlug(formData.name);

        if (editingItem) {
            const { error } = await supabase
                .from(currentTable)
                .update({
                    name: formData.name,
                    slug: slug,
                    description: formData.description || null,
                    ...(isFeaturesTab && { category: formData.category }),
                    is_active: formData.is_active,
                })
                .eq('id', editingItem.id);

            if (!error) {
                fetchItems();
                closeModal();
            } else {
                alert('Error updating: ' + error.message);
            }
        } else {
            const maxOrder = items.length > 0 ? Math.max(...items.map(i => i.order_index)) : 0;
            const { error } = await supabase
                .from(currentTable)
                .insert({
                    name: formData.name,
                    slug: slug,
                    description: formData.description || null,
                    ...(isFeaturesTab && { category: formData.category }),
                    order_index: maxOrder + 1,
                    is_active: formData.is_active,
                });

            if (!error) {
                fetchItems();
                closeModal();
            } else {
                alert('Error creating: ' + error.message);
            }
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this item? This may affect existing properties.')) return;

        const supabase = createClient();
        const { error } = await supabase
            .from(currentTable)
            .delete()
            .eq('id', id);

        if (!error) {
            fetchItems();
        } else {
            alert('Error deleting: ' + error.message);
        }
    }

    async function handleToggleActive(item: TaxonomyItem) {
        const supabase = createClient();
        const { error } = await supabase
            .from(currentTable)
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

        const supabase = createClient();
        await Promise.all([
            supabase
                .from(currentTable)
                .update({ order_index: targetIndex })
                .eq('id', newItems[targetIndex].id),
            supabase
                .from(currentTable)
                .update({ order_index: index })
                .eq('id', newItems[index].id),
        ]);

        fetchItems();
    }

    return (
        <div className="p-8">
            {}
            <div className="mb-8">
                <h1 className="text-3xl font-light tracking-[0.15em] text-gray-900 mb-2">
                    PROPERTY TAXONOMY
                </h1>
                <p className="text-gray-500">
                    Manage property categories, types, contract types, and features for the Kenyan market
                </p>
            </div>

            {}
            <div className="mb-6 border-b border-gray-200">
                <div className="flex gap-4 overflow-x-auto">
                    {TABS.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.value
                                ? 'border-orange-600 text-orange-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {}
            <div className="mb-6">
                <button
                    onClick={() => openModal()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add {TABS.find(t => t.value === activeTab)?.label}
                </button>
            </div>

            {}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading...</div>
                ) : items.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No items yet. Click "Add" to create one.
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {items.map((item, index) => (
                            <div
                                key={item.id}
                                className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                            >
                                {}
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

                                {}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                                        {!item.is_active && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                                Inactive
                                            </span>
                                        )}
                                        {isFeaturesTab && item.category && (
                                            <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                                                {item.category}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Slug: {item.slug}
                                        {item.description && ` • ${item.description}`}
                                    </p>
                                </div>

                                {}
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

            {}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            {editingItem ? 'Edit' : 'Add'} {TABS.find(t => t.value === activeTab)?.label}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => {
                                        const name = e.target.value;
                                        setFormData(prev => ({ 
                                            ...prev, 
                                            name,
                                            slug: editingItem ? prev.slug : generateSlug(name)
                                        }));
                                    }}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="e.g., Luxury Apartments"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Slug *
                                </label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="luxury-apartments"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    URL-friendly identifier (auto-generated from name)
                                </p>
                            </div>

                            {isFeaturesTab && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Feature Category
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                                    >
                                        {FEATURE_CATEGORIES.map(cat => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Optional description..."
                                />
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
                                    Active (visible in forms)
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
