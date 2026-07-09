'use client';

import { useState, useTransition } from 'react';
import { 
    Search, 
    Inbox, 
    Mail, 
    Home, 
    Trash2, 
    Eye, 
    CheckCircle, 
    Archive, 
    X, 
    Calendar,
    Phone,
    User,
    MapPin,
    AlertCircle,
    RotateCcw,
    Sparkles
} from 'lucide-react';
import { FormSubmission, updateSubmissionStatus, deleteSubmission } from '@/app/admin/actions/submissions';
import { useRouter } from 'next/navigation';

interface SubmissionsClientProps {
    initialSubmissions: FormSubmission[];
}

export default function SubmissionsClient({ initialSubmissions }: SubmissionsClientProps) {
    // 🔍 DEBUG LOG: View the parsed prop in the browser DevTools console
    console.log("Submissions received by client:", initialSubmissions);

    const router = useRouter();
    const [submissions, setSubmissions] = useState<FormSubmission[]>(initialSubmissions);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTypeFilter, setActiveTypeFilter] = useState<'all' | 'contact' | 'valuation'>('all');
    const [activeStatusFilter, setActiveStatusFilter] = useState<'all' | 'new' | 'read' | 'archived'>('all');
    const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    // Helper: Sender name
    const getSenderName = (sub: FormSubmission) => {
        const first = sub.data.firstName || '';
        const last = sub.data.lastName || '';
        return `${first} ${last}`.trim() || 'Anonymous';
    };

    // Helper: Initials
    const getInitials = (sub: FormSubmission) => {
        const first = String(sub.data.firstName || '');
        const last = String(sub.data.lastName || '');
        if (!first && !last) return 'SM';
        return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
    };

    // Helper: Format Date
    const formatDate = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateStr;
        }
    };

    // Status change handler
    const handleStatusChange = async (id: string, newStatus: string) => {
        // Optimistic UI update
        const previousSubmissions = [...submissions];
        setSubmissions(prev => 
            prev.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub)
        );

        if (selectedSubmission?.id === id) {
            setSelectedSubmission(prev => prev ? { ...prev, status: newStatus } : null);
        }

        startTransition(async () => {
            const res = await updateSubmissionStatus(id, newStatus);
            if (!res.success) {
                // Revert on error
                setSubmissions(previousSubmissions);
                if (selectedSubmission?.id === id) {
                    setSelectedSubmission(previousSubmissions.find(s => s.id === id) || null);
                }
                alert('Failed to update submission status. Please try again.');
            } else {
                router.refresh();
            }
        });
    };

    // Delete handler
    const handleDelete = async (id: string) => {
        const previousSubmissions = [...submissions];
        setSubmissions(prev => prev.filter(sub => sub.id !== id));
        
        if (selectedSubmission?.id === id) {
            setSelectedSubmission(null);
        }
        setShowDeleteConfirm(null);

        startTransition(async () => {
            const res = await deleteSubmission(id);
            if (!res.success) {
                setSubmissions(previousSubmissions);
                alert('Failed to delete submission. Please try again.');
            } else {
                router.refresh();
            }
        });
    };

    // Filtering logic
    const filteredSubmissions = submissions.filter(sub => {
        // Type filter
        if (activeTypeFilter !== 'all' && sub.form_type !== activeTypeFilter) return false;

        // Status filter
        if (activeStatusFilter !== 'all' && sub.status !== activeStatusFilter) return false;

        // Search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            const name = getSenderName(sub).toLowerCase();
            const email = String(sub.data.email || '').toLowerCase();
            const phone = String(sub.data.phone || '').toLowerCase();
            const message = String(sub.data.message || sub.data.details || '').toLowerCase();
            const address = String(sub.data.address || '').toLowerCase();

            return (
                name.includes(query) ||
                email.includes(query) ||
                phone.includes(query) ||
                message.includes(query) ||
                address.includes(query)
            );
        }

        return true;
    });

    // Counts for stat badges
    const totalCount = submissions.length;
    const newCount = submissions.filter(s => s.status === 'new').length;
    const readCount = submissions.filter(s => s.status === 'read').length;
    const archivedCount = submissions.filter(s => s.status === 'archived').length;

    const contactCount = submissions.filter(s => s.form_type === 'contact').length;
    const valuationCount = submissions.filter(s => s.form_type === 'valuation').length;

    return (
        <div className="p-8 relative min-h-screen">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-light tracking-[0.15em] text-gray-900 mb-2 uppercase">
                        INQUIRIES & SUBMISSIONS
                    </h1>
                    <p className="text-gray-500 text-sm">
                        View, manage, and process visitor inquiries and valuation requests.
                    </p>
                </div>
            </div>

            {/* Stats Dashboard Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Submissions</p>
                        <p className="text-2xl font-semibold text-gray-900">{totalCount}</p>
                    </div>
                    <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600">
                        <Inbox className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-1">New Submissions</p>
                        <p className="text-2xl font-semibold text-gray-900">{newCount}</p>
                    </div>
                    <div className="bg-orange-50 p-2.5 rounded-lg text-orange-600">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Valuation Requests</p>
                        <p className="text-2xl font-semibold text-gray-900">{valuationCount}</p>
                    </div>
                    <div className="bg-amber-50 p-2.5 rounded-lg text-amber-600">
                        <Home className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Contact Inquiries</p>
                        <p className="text-2xl font-semibold text-gray-900">{contactCount}</p>
                    </div>
                    <div className="bg-purple-50 p-2.5 rounded-lg text-purple-600">
                        <Mail className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Filter and Search Controls */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8 shadow-sm flex flex-col gap-4">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search submissions by sender name, email, phone, message or address..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                    />
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-gray-100">
                    {/* Type Filters */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setActiveTypeFilter('all')}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                                activeTypeFilter === 'all'
                                    ? 'bg-[#100B28] text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            All Types ({totalCount})
                        </button>
                        <button
                            onClick={() => setActiveTypeFilter('contact')}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                                activeTypeFilter === 'contact'
                                    ? 'bg-[#100B28] text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Contact Us ({contactCount})
                        </button>
                        <button
                            onClick={() => setActiveTypeFilter('valuation')}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                                activeTypeFilter === 'valuation'
                                    ? 'bg-[#100B28] text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Valuations ({valuationCount})
                        </button>
                    </div>

                    {/* Status Filters */}
                    <div className="flex items-center gap-1.5 overflow-x-auto self-start lg:self-auto pb-1 lg:pb-0">
                        <span className="text-xs text-gray-400 uppercase tracking-widest font-bold mr-2">Status:</span>
                        <button
                            onClick={() => setActiveStatusFilter('all')}
                            className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border transition-all ${
                                activeStatusFilter === 'all'
                                    ? 'bg-gray-900 border-gray-900 text-white shadow-sm'
                                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            All ({totalCount})
                        </button>
                        <button
                            onClick={() => setActiveStatusFilter('new')}
                            className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border transition-all ${
                                activeStatusFilter === 'new'
                                    ? 'bg-orange-500 border-orange-500 text-white shadow-sm'
                                    : 'border-gray-200 text-orange-600 hover:bg-orange-50'
                            }`}
                        >
                            New ({newCount})
                        </button>
                        <button
                            onClick={() => setActiveStatusFilter('read')}
                            className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border transition-all ${
                                activeStatusFilter === 'read'
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                                    : 'border-gray-200 text-blue-600 hover:bg-blue-50'
                            }`}
                        >
                            Read ({readCount})
                        </button>
                        <button
                            onClick={() => setActiveStatusFilter('archived')}
                            className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border transition-all ${
                                activeStatusFilter === 'archived'
                                    ? 'bg-gray-500 border-gray-500 text-white shadow-sm'
                                    : 'border-gray-200 text-gray-500 hover:bg-gray-100'
                            }`}
                        >
                            Archived ({archivedCount})
                        </button>
                    </div>
                </div>
            </div>

            {/* Submissions List */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] w-[22%]">Sender</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] w-[15%]">Type</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] w-[35%]">Preview</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] w-[15%]">Received</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] w-[13%] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredSubmissions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-16 text-gray-400">
                                        <Inbox className="w-12 h-12 mx-auto mb-4 text-gray-300 stroke-[1.5]" />
                                        <p className="text-sm font-medium">No inquiries found matching your filters.</p>
                                        <p className="text-xs mt-1 text-gray-300">Try adjusting your search criteria or resetting filters.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredSubmissions.map((sub) => {
                                    const senderName = getSenderName(sub);
                                    const senderEmail = String(sub.data.email || 'N/A');
                                    const isValuation = sub.form_type === 'valuation';
                                    
                                    // Get dynamic preview text
                                    const previewText = isValuation 
                                        ? `Property: ${String(sub.data.address || 'N/A')}`
                                        : String(sub.data.message || 'No message provided');

                                    return (
                                        <tr 
                                            key={sub.id} 
                                            onClick={() => setSelectedSubmission(sub)}
                                            className={`hover:bg-gray-50/70 transition-all cursor-pointer group ${
                                                sub.status === 'new' ? 'bg-orange-50/10 font-medium' : ''
                                            }`}
                                        >
                                            {/* Sender column */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                                                        isValuation 
                                                            ? 'bg-amber-100 text-amber-800' 
                                                            : 'bg-purple-100 text-purple-800'
                                                    }`}>
                                                        {getInitials(sub)}
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <div className="text-sm text-gray-900 font-medium truncate">
                                                            {senderName}
                                                        </div>
                                                        <div className="text-xs text-gray-400 truncate">
                                                            {senderEmail}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Type Column */}
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase rounded-sm border ${
                                                    isValuation
                                                        ? 'bg-amber-50 text-amber-700 border-amber-100'
                                                        : 'bg-purple-50 text-purple-700 border-purple-100'
                                                }`}>
                                                    {isValuation ? (
                                                        <>
                                                            <Home className="w-2.5 h-2.5" />
                                                            Valuation
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Mail className="w-2.5 h-2.5" />
                                                            Contact
                                                        </>
                                                    )}
                                                </span>
                                            </td>

                                            {/* Preview Column */}
                                            <td className="px-6 py-4">
                                                <div className="text-xs text-gray-600 line-clamp-1 max-w-[400px]">
                                                    {previewText}
                                                </div>
                                                {isValuation && !!sub.data.unit && (
                                                    <div className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">
                                                        Apt/Unit: {String(sub.data.unit)}
                                                    </div>
                                                )}
                                            </td>

                                            {/* Received Column */}
                                            <td className="px-6 py-4">
                                                <div className="text-xs text-gray-900 font-serif">
                                                    {formatDate(sub.created_at).split(',')[0]}
                                                </div>
                                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                                                    {formatDate(sub.created_at).split(',')[1]?.trim() || ''}
                                                </div>
                                            </td>

                                            {/* Actions Column */}
                                            <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex items-center justify-end gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                                                    {/* Quick Mark Read/Archive action if new */}
                                                    {sub.status === 'new' && (
                                                        <button
                                                            onClick={() => handleStatusChange(sub.id, 'read')}
                                                            title="Mark as read"
                                                            className="p-1.5 hover:bg-blue-50 text-blue-600 hover:text-blue-700 rounded-md transition-colors"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    {sub.status === 'read' && (
                                                        <button
                                                            onClick={() => handleStatusChange(sub.id, 'archived')}
                                                            title="Archive inquiry"
                                                            className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-gray-700 rounded-md transition-colors"
                                                        >
                                                            <Archive className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    {sub.status === 'archived' && (
                                                        <button
                                                            onClick={() => handleStatusChange(sub.id, 'read')}
                                                            title="Unarchive inquiry"
                                                            className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-gray-700 rounded-md transition-colors"
                                                        >
                                                            <RotateCcw className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    
                                                    {/* Show delete confirm or delete button */}
                                                    {showDeleteConfirm === sub.id ? (
                                                        <div className="flex items-center gap-1 bg-red-50 border border-red-100 rounded-md p-0.5">
                                                            <button
                                                                onClick={() => handleDelete(sub.id)}
                                                                className="text-[9px] font-bold uppercase tracking-widest text-red-600 px-1.5 py-0.5 hover:bg-red-100 rounded transition-colors"
                                                            >
                                                                Yes
                                                            </button>
                                                            <button
                                                                onClick={() => setShowDeleteConfirm(null)}
                                                                className="text-[9px] font-bold uppercase tracking-widest text-gray-500 px-1.5 py-0.5 hover:bg-white rounded transition-colors"
                                                            >
                                                                No
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => setShowDeleteConfirm(sub.id)}
                                                            title="Delete submission"
                                                            className="p-1.5 hover:bg-red-50 text-red-500 hover:text-red-600 rounded-md transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={() => setSelectedSubmission(sub)}
                                                        title="View details"
                                                        className="p-1.5 hover:bg-gray-100 text-gray-700 rounded-md transition-colors"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Sliding Drawer for Inquiry Details */}
            {selectedSubmission && (
                <div className="fixed inset-0 z-50 flex justify-end transition-opacity duration-300">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-all"
                        onClick={() => setSelectedSubmission(null)}
                    />

                    {/* Drawer Content */}
                    <div className="relative w-full max-w-lg h-full bg-white shadow-2xl flex flex-col animate-slide-in-right border-l border-gray-100 z-10">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#100B28]/[0.02]">
                            <div>
                                <span className={`inline-flex px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase rounded-sm border mb-1.5 ${
                                    selectedSubmission.form_type === 'valuation'
                                        ? 'bg-amber-50 text-amber-700 border-amber-100'
                                        : 'bg-purple-50 text-purple-700 border-purple-100'
                                }`}>
                                    {selectedSubmission.form_type}
                                </span>
                                <h2 className="text-md font-serif text-brand-dark tracking-wide">
                                    Inquiry Details
                                </h2>
                            </div>
                            <button
                                onClick={() => setSelectedSubmission(null)}
                                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Body */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* Sender Card */}
                            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-sm border border-white shadow-sm">
                                        {getInitials(selectedSubmission)}
                                    </div>
                                    <div>
                                        <h3 className="text-md font-serif text-gray-900">
                                            {getSenderName(selectedSubmission)}
                                        </h3>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                                            Client ID: {selectedSubmission.id.substring(0, 8)}...
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2.5 pt-2.5 border-t border-gray-200/60 text-xs">
                                    <div className="flex items-center gap-2.5 text-gray-600">
                                        <User className="w-4 h-4 text-gray-400 shrink-0" />
                                        <span className="font-bold uppercase text-[9px] tracking-wider text-gray-400 w-12 shrink-0">Email:</span>
                                        <a href={`mailto:${String(selectedSubmission.data.email)}`} className="text-brand-dark hover:underline font-medium break-all">
                                            {String(selectedSubmission.data.email || 'N/A')}
                                        </a>
                                    </div>

                                    {String(selectedSubmission.data.phone || '') && (
                                        <div className="flex items-center gap-2.5 text-gray-600">
                                            <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                                            <span className="font-bold uppercase text-[9px] tracking-wider text-gray-400 w-12 shrink-0">Phone:</span>
                                            <a href={`tel:${String(selectedSubmission.data.phone).replace(/[^0-9]/g, '')}`} className="text-brand-dark hover:underline font-medium">
                                                {String(selectedSubmission.data.phone)}
                                            </a>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2.5 text-gray-600">
                                        <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                                        <span className="font-bold uppercase text-[9px] tracking-wider text-gray-400 w-12 shrink-0">Received:</span>
                                        <span className="font-serif text-brand-dark">
                                            {formatDate(selectedSubmission.created_at)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Dynamic Content Details Card */}
                            {selectedSubmission.form_type === 'valuation' ? (
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">Property Valuation Request</h4>
                                    
                                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Property Address</p>
                                                <p className="text-sm font-serif text-gray-900 mt-0.5">{String(selectedSubmission.data.address || 'N/A')}</p>
                                            </div>
                                        </div>

                                        {!!selectedSubmission.data.unit && (
                                            <div className="pl-8 border-t border-gray-50 pt-3">
                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Unit / Apartment</p>
                                                <p className="text-sm font-serif text-gray-900 mt-0.5">{String(selectedSubmission.data.unit)}</p>
                                            </div>
                                        )}

                                        {!!selectedSubmission.data.details && (
                                            <div className="pl-8 border-t border-gray-50 pt-3">
                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Additional Details Provided</p>
                                                <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100 whitespace-pre-wrap mt-1">
                                                    {String(selectedSubmission.data.details)}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">Message Content</h4>
                                    
                                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Message</p>
                                        <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border border-gray-100">
                                            {String(selectedSubmission.data.message || 'No message provided.')}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* SMS / Messaging Consent Indicator */}
                            <div className="bg-[#100B28]/[0.02] border border-[#100B28]/10 rounded-xl p-4 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-gray-500 shrink-0" />
                                <div>
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">SMS Consent Status</p>
                                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                                        {String(selectedSubmission.data.consent) === 'true' 
                                            ? '✓ Client consented to receive text/SMS communication from the site.'
                                            : '✗ Client did not consent/opted out of text messages.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Controls */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col gap-3">
                            <div className="flex gap-2">
                                {selectedSubmission.status === 'new' && (
                                    <>
                                        <button
                                            onClick={() => handleStatusChange(selectedSubmission.id, 'read')}
                                            disabled={isPending}
                                            className="flex-1 py-3 bg-[#100B28] text-white hover:bg-opacity-95 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Mark as Read
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(selectedSubmission.id, 'archived')}
                                            disabled={isPending}
                                            className="px-4 py-3 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center"
                                        >
                                            <Archive className="w-4 h-4" />
                                        </button>
                                    </>
                                )}

                                {selectedSubmission.status === 'read' && (
                                    <>
                                        <button
                                            onClick={() => handleStatusChange(selectedSubmission.id, 'archived')}
                                            disabled={isPending}
                                            className="flex-1 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                                        >
                                            <Archive className="w-4 h-4" />
                                            Archive Inquiry
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(selectedSubmission.id, 'new')}
                                            disabled={isPending}
                                            className="px-4 py-3 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                                        >
                                            Mark New
                                        </button>
                                    </>
                                )}

                                {selectedSubmission.status === 'archived' && (
                                    <>
                                        <button
                                            onClick={() => handleStatusChange(selectedSubmission.id, 'read')}
                                            disabled={isPending}
                                            className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                            Unarchive / Restore
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(selectedSubmission.id, 'new')}
                                            disabled={isPending}
                                            className="px-4 py-3 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center"
                                        >
                                            Mark New
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Delete submission button inside drawer */}
                            <button
                                onClick={() => {
                                    if (confirm('Are you absolutely sure you want to permanently delete this submission? This action cannot be undone.')) {
                                        handleDelete(selectedSubmission.id);
                                    }
                                }}
                                disabled={isPending}
                                className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-red-100"
                            >
                                <Trash2 className="w-4 h-4" />
                                Permanent Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
