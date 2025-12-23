'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Edit2, Save, X, Loader2, Eye, EyeOff } from 'lucide-react';

interface ContentBlock {
    id: string;
    page: string;
    block_type: string;
    title: string | null;
    content: string | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata: any;
    order: number;
    is_active: boolean;
}

export default function ContentBlocksPage() {
    const [blocks, setBlocks] = useState<ContentBlock[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<ContentBlock>>({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchBlocks();
    }, []);

    async function fetchBlocks() {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('content_blocks')
            .select('*')
            .order('page', { ascending: true })
            .order('order', { ascending: true });

        if (error) {
            console.error('Error fetching blocks:', error);
        } else {
            setBlocks(data || []);
        }
        setLoading(false);
    }

    async function handleSave() {
        if (!editingId || !editForm) return;

        const supabase = createClient();
        const { error } = await supabase
            .from('content_blocks')
            .update({
                ...editForm,
                updated_at: new Date().toISOString()
            })
            .eq('id', editingId);

        if (error) {
            setMessage('Error saving content block');
            console.error(error);
        } else {
            setMessage('Content block saved successfully!');
            setEditingId(null);
            setEditForm({});
            fetchBlocks();
            setTimeout(() => setMessage(''), 3000);
        }
    }

    async function toggleActive(id: string, currentState: boolean) {
        const supabase = createClient();
        const { error } = await supabase
            .from('content_blocks')
            .update({ is_active: !currentState })
            .eq('id', id);

        if (!error) {
            fetchBlocks();
        }
    }

    function startEdit(block: ContentBlock) {
        setEditingId(block.id);
        setEditForm(block);
    }

    function cancelEdit() {
        setEditingId(null);
        setEditForm({});
    }

    const groupedBlocks = blocks.reduce((acc, block) => {
        if (!acc[block.page]) acc[block.page] = [];
        acc[block.page].push(block);
        return acc;
    }, {} as Record<string, ContentBlock[]>);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-light text-gray-900">Content Blocks</h1>
                    <p className="text-gray-500 mt-2">Manage page-specific content sections</p>
                </div>

                {message && (
                    <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
                        }`}>
                        {message}
                    </div>
                )}

                <div className="space-y-8">
                    {Object.entries(groupedBlocks).map(([page, pageBlocks]) => (
                        <div key={page} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900 capitalize">{page}</h2>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {pageBlocks.map(block => (
                                    <div key={block.id} className="p-6">
                                        {editingId === block.id ? (
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                                    <input
                                                        type="text"
                                                        value={editForm.title || ''}
                                                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                                                    <textarea
                                                        value={editForm.content || ''}
                                                        onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                                                        rows={4}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                                    />
                                                </div>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={handleSave}
                                                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                                                    >
                                                        <Save className="w-4 h-4" />
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                                    >
                                                        <X className="w-4 h-4" />
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-lg font-semibold text-gray-900">{block.title || 'Untitled Block'}</h3>
                                                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                                                            {block.block_type}
                                                        </span>
                                                        <span className={`px-2 py-1 text-xs rounded-full ${block.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {block.is_active ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </div>
                                                    {block.content && (
                                                        <p className="text-gray-600 line-clamp-2">{block.content}</p>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => toggleActive(block.id, block.is_active)}
                                                        className="p-2 hover:bg-gray-100 rounded-lg"
                                                        title={block.is_active ? 'Deactivate' : 'Activate'}
                                                    >
                                                        {block.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        onClick={() => startEdit(block)}
                                                        className="p-2 hover:bg-gray-100 rounded-lg"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
