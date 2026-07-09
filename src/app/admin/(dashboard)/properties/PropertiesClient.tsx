'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Plus, Search, Star } from 'lucide-react';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import Pagination from '@/components/admin/Pagination';
import { deleteProperty, toggleFeatured } from './actions';

interface Property {
    id: string;
    title: string;
    slug: string;
    city: string;
    address: string | null;
    bedrooms: number;
    bathrooms: number;
    half_baths: number;
    price: number;
    status: string;
    is_featured: boolean;
    category: string | null;
    category_id: string | null;
    images: string[];
}

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface PropertiesClientProps {
    properties: Property[];
    categories: Category[];
}

const ITEMS_PER_PAGE = 15;

export default function PropertiesClient({ properties, categories }: PropertiesClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; property: Property | null }>({
        isOpen: false,
        property: null
    });

    
    const filteredProperties = useMemo(() => {
        return properties.filter(property => {
            const matchesSearch = searchQuery === '' ||
                property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (property.address && property.address.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesStatus = statusFilter === '' || property.status === statusFilter;
            const matchesCategory = categoryFilter === '' || property.category_id === categoryFilter;

            return matchesSearch && matchesStatus && matchesCategory;
        });
    }, [properties, searchQuery, statusFilter, categoryFilter]);

    
    const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
    const paginatedProperties = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredProperties, currentPage]);

    
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (value: string) => {
        setCategoryFilter(value);
        setCurrentPage(1);
    };

    const handleDelete = async () => {
        if (!deleteModal.property) return;
        await deleteProperty(deleteModal.property.id);
    };

    const handleToggleFeatured = async (property: Property) => {
        await toggleFeatured(property.id, property.is_featured);
    };

    return (
        <div className="p-8">
            {}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-light tracking-[0.15em] text-gray-900 mb-2">
                        PROPERTIES
                    </h1>
                    <p className="text-gray-500">
                        Manage all property listings ({filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'})
                    </p>
                </div>
                <Link
                    href="/admin/properties/new"
                    className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-sm hover:shadow-md"
                >
                    <Plus className="w-5 h-5" />
                    Add Property
                </Link>
            </div>

            {}
            <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by title, city, or address..."
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="sold">Sold</option>
                    <option value="off-market">Off Market</option>
                </select>
                <select
                    value={categoryFilter}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            {}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Property
                                </th>
                                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Details
                                </th>
                                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Featured
                                </th>
                                <th className="px-6 py-3 text-right text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedProperties.map((property) => (
                                <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {property.images && property.images.length > 0 && (
                                                <img
                                                    src={property.images[0]}
                                                    alt={property.title}
                                                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                                                />
                                            )}
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 font-serif max-w-xs truncate">
                                                    {property.title}
                                                </div>
                                                <div className="text-xs text-gray-400 font-mono">
                                                    {property.slug}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 uppercase tracking-wider text-[10px] font-bold">{property.city}</div>
                                        {property.address && (
                                            <div className="text-xs text-gray-500">{property.address}</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {property.bedrooms} BR | {property.bathrooms} BA
                                            {property.half_baths > 0 && `, ${property.half_baths} Half BA`}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-gray-900">
                                            KES {property.price.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-[9px] font-bold tracking-widest uppercase rounded-sm ${property.status === 'active'
                                            ? 'bg-green-50 text-green-700 border border-green-100'
                                            : property.status === 'pending'
                                                ? 'bg-yellow-50 text-yellow-700 border border-yellow-100'
                                                : property.status === 'sold'
                                                    ? 'bg-blue-50 text-blue-700 border border-blue-100'
                                                    : 'bg-gray-50 text-gray-700 border border-gray-100'
                                            }`}>
                                            {property.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleToggleFeatured(property)}
                                            className={`inline-flex items-center gap-1 px-2 py-1 text-[9px] font-bold tracking-widest uppercase rounded-sm transition-colors ${property.is_featured
                                                ? 'bg-orange-50 text-orange-700 border border-orange-100 hover:bg-orange-100'
                                                : 'bg-gray-50 text-gray-400 border border-gray-200 hover:bg-gray-100'
                                                }`}
                                        >
                                            <Star className={`w-3 h-3 ${property.is_featured ? 'fill-orange-700' : ''}`} />
                                            {property.is_featured ? 'Featured' : 'Feature'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            href={`/admin/properties/${property.id}/edit`}
                                            className="text-orange-600 hover:text-orange-900 mr-4 text-xs font-bold uppercase tracking-wider"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => setDeleteModal({ isOpen: true, property })}
                                            className="text-red-600 hover:text-red-900 text-xs font-bold uppercase tracking-wider"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            {}
            {filteredProperties.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200 mt-6">
                    <p className="text-gray-500 mb-4">
                        {searchQuery || statusFilter || categoryFilter
                            ? 'No properties match your filters'
                            : 'No properties found'}
                    </p>
                    {!searchQuery && !statusFilter && !categoryFilter && (
                        <Link
                            href="/admin/properties/new"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Add Your First Property
                        </Link>
                    )}
                </div>
            )}

            {}
            <DeleteConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, property: null })}
                onConfirm={handleDelete}
                title="Delete Property"
                message="Are you sure you want to delete this property? This action cannot be undone."
                itemName={deleteModal.property?.title}
            />
        </div>
    );
}
