'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Plus, Search, Mail, Phone, ExternalLink } from 'lucide-react';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import Pagination from '@/components/admin/Pagination';
import { deleteAgent, toggleAgentStatus } from './actions';

interface Agent {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    photo_url: string | null;
    title: string | null;
    is_active: boolean;
    specialties: string[];
}

interface AgentsClientProps {
    agents: Agent[];
}

const ITEMS_PER_PAGE = 15;

export default function AgentsClient({ agents }: AgentsClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; agent: Agent | null }>({
        isOpen: false,
        agent: null
    });

    // Filter and search agents
    const filteredAgents = useMemo(() => {
        return agents.filter(agent => {
            const fullName = `${agent.first_name} ${agent.last_name}`.toLowerCase();
            const matchesSearch = searchQuery === '' ||
                fullName.includes(searchQuery.toLowerCase()) ||
                agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (agent.title && agent.title.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesStatus = statusFilter === '' ||
                (statusFilter === 'active' ? agent.is_active : !agent.is_active);

            return matchesSearch && matchesStatus;
        });
    }, [agents, searchQuery, statusFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredAgents.length / ITEMS_PER_PAGE);
    const paginatedAgents = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredAgents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredAgents, currentPage]);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        setCurrentPage(1);
    };

    const handleDelete = async () => {
        if (!deleteModal.agent) return;
        await deleteAgent(deleteModal.agent.id);
    };

    const handleToggleStatus = async (agent: Agent) => {
        await toggleAgentStatus(agent.id, agent.is_active);
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-light tracking-[0.15em] text-gray-900 mb-2">
                        AGENTS
                    </h1>
                    <p className="text-gray-500">
                        Manage real estate agents ({filteredAgents.length})
                    </p>
                </div>
                <Link
                    href="/admin/agents/new"
                    className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-sm hover:shadow-md"
                >
                    <Plus className="w-5 h-5" />
                    Add Agent
                </Link>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or title..."
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
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            {/* Agents Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Agent
                                </th>
                                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Contact
                                </th>
                                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Title & Specialties
                                </th>
                                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedAgents.map((agent) => (
                                <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {agent.photo_url ? (
                                                <img
                                                    src={agent.photo_url}
                                                    alt={`${agent.first_name} ${agent.last_name}`}
                                                    className="w-10 h-10 object-cover rounded-full border border-gray-200"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold border border-gray-200">
                                                    {agent.first_name[0]}{agent.last_name[0]}
                                                </div>
                                            )}
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 font-serif">
                                                    {agent.first_name} {agent.last_name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                                <Mail className="w-3 h-3" />
                                                {agent.email}
                                            </div>
                                            {agent.phone && (
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <Phone className="w-3 h-3" />
                                                    {agent.phone}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 mb-1">
                                            {agent.title || 'Agent'}
                                        </div>
                                        {agent.specialties && agent.specialties.length > 0 && (
                                            <div className="flex gap-1 flex-wrap">
                                                {agent.specialties.slice(0, 2).map((specialty, idx) => (
                                                    <span key={idx} className="inline-flex px-1.5 py-0.5 text-[9px] font-medium bg-orange-50 text-orange-700 rounded border border-orange-100">
                                                        {specialty}
                                                    </span>
                                                ))}
                                                {agent.specialties.length > 2 && (
                                                    <span className="inline-flex px-1.5 py-0.5 text-[9px] font-medium bg-gray-50 text-gray-500 rounded border border-gray-200">
                                                        +{agent.specialties.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleToggleStatus(agent)}
                                            className={`inline-flex px-2 py-1 text-[9px] font-bold tracking-widest uppercase rounded-sm transition-colors ${agent.is_active
                                                    ? 'bg-green-50 text-green-700 border border-green-100 hover:bg-green-100'
                                                    : 'bg-gray-50 text-gray-400 border border-gray-200 hover:bg-gray-100'
                                                }`}
                                        >
                                            {agent.is_active ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            href={`/admin/agents/${agent.id}/edit`}
                                            className="text-orange-600 hover:text-orange-900 mr-4 text-xs font-bold uppercase tracking-wider"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => setDeleteModal({ isOpen: true, agent })}
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

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            {/* Empty State */}
            {filteredAgents.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200 mt-6">
                    <p className="text-gray-500 mb-4">
                        {searchQuery || statusFilter
                            ? 'No agents match your filters'
                            : 'No agents found'}
                    </p>
                    {!searchQuery && !statusFilter && (
                        <Link
                            href="/admin/agents/new"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Add Your First Agent
                        </Link>
                    )}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, agent: null })}
                onConfirm={handleDelete}
                title="Delete Agent"
                message="Are you sure you want to delete this agent? This action cannot be undone."
                itemName={deleteModal.agent ? `${deleteModal.agent.first_name} ${deleteModal.agent.last_name}` : undefined}
            />
        </div>
    );
}
