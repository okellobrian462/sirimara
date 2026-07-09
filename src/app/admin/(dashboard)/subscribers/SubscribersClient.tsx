'use client';

import { useState, useMemo } from 'react';
import { Search, Download, Trash2, Mail, Check, X } from 'lucide-react';
import { toggleSubscriberStatus, deleteSubscriber } from './actions';
import Pagination from '@/components/admin/Pagination';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';

interface Subscriber {
    id: string;
    email: string;
    subscribed_at: string;
    is_active: boolean;
    unsubscribed_at: string | null;
}

interface SubscribersClientProps {
    subscribers: Subscriber[];
}

const ITEMS_PER_PAGE = 20;

export default function SubscribersClient({ subscribers }: SubscribersClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; subscriber: Subscriber | null }>({
        isOpen: false,
        subscriber: null
    });

    const filteredSubscribers = useMemo(() => {
        return subscribers.filter(sub => {
            const matchesSearch = sub.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' ||
                (statusFilter === 'active' ? sub.is_active : !sub.is_active);
            return matchesSearch && matchesStatus;
        });
    }, [subscribers, searchQuery, statusFilter]);

    const totalPages = Math.ceil(filteredSubscribers.length / ITEMS_PER_PAGE);
    const paginatedSubscribers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredSubscribers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredSubscribers, currentPage]);

    const handleExport = () => {
        const headers = ['Email', 'Status', 'Subscribed At', 'Unsubscribed At'];
        const csvContent = filteredSubscribers.map(s => [
            s.email,
            s.is_active ? 'Active' : 'Unsubscribed',
            new Date(s.subscribed_at).toLocaleDateString(),
            s.unsubscribed_at ? new Date(s.unsubscribed_at).toLocaleDateString() : ''
        ].join(',')).join('\n');

        const blob = new Blob([headers.join(',') + '\n' + csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const handleToggleStatus = async (subscriber: Subscriber) => {
        await toggleSubscriberStatus(subscriber.id, !subscriber.is_active);
    };

    const handleDelete = async () => {
        if (!deleteModal.subscriber) return;
        await deleteSubscriber(deleteModal.subscriber.id);
        setDeleteModal({ isOpen: false, subscriber: null });
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-light tracking-[0.15em] text-gray-900 mb-2">
                        SUBSCRIBERS
                    </h1>
                    <p className="text-gray-500">
                        Manage newsletter subscriptions ({subscribers.length} total)
                    </p>
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                >
                    <Download className="w-5 h-5" />
                    Export CSV
                </button>
            </div>

            {}
            <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="unsubscribed">Unsubscribed</option>
                </select>
            </div>

            {}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Subscribed Date
                                </th>
                                <th className="px-6 py-3 text-right text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedSubscribers.map((sub) => (
                                <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">
                                                {sub.email}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${sub.is_active
                                                ? 'bg-green-50 text-green-700 border-green-100'
                                                : 'bg-gray-50 text-gray-600 border-gray-200'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${sub.is_active ? 'bg-green-500' : 'bg-gray-400'}`} />
                                            {sub.is_active ? 'Active' : 'Unsubscribed'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(sub.subscribed_at).toLocaleDateString()}
                                        <div className="text-xs text-gray-400">
                                            {new Date(sub.subscribed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleToggleStatus(sub)}
                                                className={`p-1.5 rounded transition-colors ${sub.is_active
                                                        ? 'text-yellow-600 hover:bg-yellow-50'
                                                        : 'text-green-600 hover:bg-green-50'
                                                    }`}
                                                title={sub.is_active ? "Unsubscribe" : "Resubscribe"}
                                            >
                                                {sub.is_active ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => setDeleteModal({ isOpen: true, subscriber: sub })}
                                                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredSubscribers.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                        No subscribers found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            <DeleteConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, subscriber: null })}
                onConfirm={handleDelete}
                title="Delete Subscriber"
                message="Are you sure you want to delete this subscriber? This action cannot be undone."
                itemName={deleteModal.subscriber?.email}
            />
        </div>
    );
}
