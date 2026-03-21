'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Search, Trash2, GripVertical, X } from 'lucide-react';
import { addToFeatured, removeFromFeatured, updateFeaturedOrder } from './actions';

export interface Property {
    id: string;
    title: string;
    address: string;
    price: number;
    images: string[];
    city: string;
}

export interface FeaturedProperty {
    id: string; // The featured_properties ID
    property_id: string; // The properties ID
    display_order: number;
    property: Property;
}

export interface FeaturedClientProps {
    initialFeatured: FeaturedProperty[];
}

export default function FeaturedClient({ initialFeatured }: FeaturedClientProps) {
    const [featured, setFeatured] = useState<FeaturedProperty[]>(initialFeatured);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Property[]>([]);
    const [searching, setSearching] = useState(false);

    // Update local state when props change (e.g. after revalidation)
    useEffect(() => {
        setFeatured(initialFeatured.sort((a, b) => a.display_order - b.display_order));
    }, [initialFeatured]);

    // Search properties for adding
    useEffect(() => {
        if (!isAddModalOpen) return;

        const searchProperties = async () => {
            setSearching(true);
            const supabase = createClient();

            // Get already featured IDs to exclude
            const featuredIds = featured.map(f => f.property_id);

            let query = supabase
                .from('properties')
                .select('id, title, address, price, images, city')
                .limit(20);

            if (searchQuery) {
                query = query.ilike('title', `%${searchQuery}%`);
            }

            const { data } = await query;

            if (data) {
                // Filter out already featured properties client-side as "not in" is potentialperf hit or just easier here
                const available = (data as Property[]).filter((p) => !featuredIds.includes(p.id));
                setSearchResults(available);
            }
            setSearching(false);
        };

        const debounce = setTimeout(searchProperties, 300);
        return () => clearTimeout(debounce);
    }, [searchQuery, isAddModalOpen, featured]);

    const handleAdd = async (propertyId: string) => {
        try {
            await addToFeatured(propertyId);
            setIsAddModalOpen(false);
            setSearchQuery('');
        } catch (error) {
            console.error(error);
            alert('Failed to add property');
        }
    };

    const handleRemove = async (featuredId: string) => {
        if (!confirm('Remove from featured?')) return;
        try {
            await removeFromFeatured(featuredId);
        } catch (error) {
            console.error(error);
            alert('Failed to remove property');
        }
    };

    // Simple Drag and Drop implementation
    const [draggedItem, setDraggedItem] = useState<FeaturedProperty | null>(null);

    const handleDragStart = (e: React.DragEvent, item: FeaturedProperty) => {
        setDraggedItem(item);
        e.dataTransfer.effectAllowed = 'move';
        // Make the drag image transparent or look like the row
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (!draggedItem) return;

        const draggedIndex = featured.findIndex(i => i.id === draggedItem.id);
        if (draggedIndex === index) return;

        const newItems = [...featured];
        const item = newItems[draggedIndex];
        newItems.splice(draggedIndex, 1);
        newItems.splice(index, 0, item);

        // Update display_order locally
        const reordered = newItems.map((item, idx) => ({
            ...item,
            display_order: idx
        }));

        setFeatured(reordered);
    };

    const handleDragEnd = async () => {
        setDraggedItem(null);
        // Persist new order
        const orderUpdates = featured.map((item, index) => ({
            id: item.id,
            display_order: index
        }));

        try {
            await updateFeaturedOrder(orderUpdates);
        } catch (error) {
            console.error('Failed to update order', error);
            // Revert or show error
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-light tracking-[0.15em] text-gray-900 mb-2">
                        FEATURED PROPERTIES
                    </h1>
                    <p className="text-gray-500">
                        Manage properties displayed in the homepage carousel
                    </p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    Add Property
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                {featured.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        No featured properties yet. Click "Add Property" to get started.
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {featured.map((item, index) => (
                            <li
                                key={item.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, item)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDragEnd={handleDragEnd}
                                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-move group"
                            >
                                <div className="text-gray-300 group-hover:text-gray-500 cursor-grab active:cursor-grabbing">
                                    <GripVertical className="w-5 h-5" />
                                </div>
                                <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-xs font-bold text-gray-500">
                                    {index + 1}
                                </div>
                                {item.property.images?.[0] && (
                                    <img
                                        src={item.property.images[0]}
                                        alt={item.property.title}
                                        className="w-16 h-12 object-cover rounded border border-gray-200"
                                    />
                                )}
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-gray-900">
                                        {item.property.title}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        {item.property.city}
                                    </p>
                                </div>
                                <div className="text-sm font-semibold text-gray-900">
                                    ${item.property.price?.toLocaleString()}
                                </div>
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                    title="Remove from featured"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Add Featured Property
                            </h2>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-4 border-b border-gray-100">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search properties..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-2">
                            {searching ? (
                                <div className="text-center py-8 text-gray-500 text-sm">
                                    Searching...
                                </div>
                            ) : searchResults.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 text-sm">
                                    No available properties found
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {searchResults.map((property) => (
                                        <button
                                            key={property.id}
                                            onClick={() => handleAdd(property.id)}
                                            className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg text-left transition-colors group"
                                        >
                                            {property.images?.[0] ? (
                                                <img
                                                    src={property.images[0]}
                                                    alt=""
                                                    className="w-12 h-12 object-cover rounded border border-gray-200"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-orange-600">
                                                    {property.title}
                                                </h3>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {property.city} • ${property.price?.toLocaleString()}
                                                </p>
                                            </div>
                                            <Plus className="w-4 h-4 text-gray-300 group-hover:text-orange-600" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
