'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Edit2, Save, X, Loader2, Eye, EyeOff } from 'lucide-react';

interface Statistic {
    id: string;
    stat_key: string;
    value: string;
    label: string;
    sublabel: string | null;
    category: string;
    order: number;
    is_active: boolean;
}

export default function StatisticsPage() {
    const [stats, setStats] = useState<Statistic[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Statistic>>({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchStats();
    }, []);

    async function fetchStats() {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('site_statistics')
            .select('*')
            .order('category', { ascending: true })
            .order('order', { ascending: true });

        if (error) {
            console.error('Error fetching stats:', error);
        } else {
            setStats(data || []);
        }
        setLoading(false);
    }

    async function handleSave() {
        if (!editingId || !editForm) return;

        const supabase = createClient();
        const { error } = await supabase
            .from('site_statistics')
            .update({
                ...editForm,
                updated_at: new Date().toISOString()
            })
            .eq('id', editingId);

        if (error) {
            setMessage('Error saving statistic');
            console.error(error);
        } else {
            setMessage('Statistic saved successfully!');
            setEditingId(null);
            setEditForm({});
            fetchStats();
            setTimeout(() => setMessage(''), 3000);
        }
    }

    async function toggleActive(id: string, currentState: boolean) {
        const supabase = createClient();
        const { error } = await supabase
            .from('site_statistics')
            .update({ is_active: !currentState })
            .eq('id', id);

        if (!error) {
            fetchStats();
        }
    }

    function startEdit(stat: Statistic) {
        setEditingId(stat.id);
        setEditForm(stat);
    }

    function cancelEdit() {
        setEditingId(null);
        setEditForm({});
    }

    const groupedStats = stats.reduce((acc, stat) => {
        if (!acc[stat.category]) acc[stat.category] = [];
        acc[stat.category].push(stat);
        return acc;
    }, {} as Record<string, Statistic[]>);

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
                    <h1 className="text-3xl font-light text-gray-900">Site Statistics</h1>
                    <p className="text-gray-500 mt-2">Manage company statistics displayed across the site</p>
                </div>

                {message && (
                    <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
                        }`}>
                        {message}
                    </div>
                )}

                <div className="space-y-8">
                    {Object.entries(groupedStats).map(([category, categoryStats]) => (
                        <div key={category} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900 capitalize">{category}</h2>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {categoryStats.map(stat => (
                                    <div key={stat.id} className="p-6">
                                        {editingId === stat.id ? (
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                                                        <input
                                                            type="text"
                                                            value={editForm.value || ''}
                                                            onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                                            placeholder="e.g., 6.6K, $87B"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
                                                        <input
                                                            type="text"
                                                            value={editForm.label || ''}
                                                            onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                                        />
                                                    </div>
                                                    <div className="col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Sublabel (Optional)</label>
                                                        <input
                                                            type="text"
                                                            value={editForm.sublabel || ''}
                                                            onChange={(e) => setEditForm({ ...editForm, sublabel: e.target.value })}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                                        />
                                                    </div>
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
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-baseline gap-4">
                                                    <span className="text-4xl font-light text-gray-900">{stat.value}</span>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-700 uppercase">{stat.label}</p>
                                                        {stat.sublabel && (
                                                            <p className="text-xs text-gray-500 uppercase">{stat.sublabel}</p>
                                                        )}
                                                    </div>
                                                    <span className={`px-2 py-1 text-xs rounded-full ${stat.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {stat.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => toggleActive(stat.id, stat.is_active)}
                                                        className="p-2 hover:bg-gray-100 rounded-lg"
                                                        title={stat.is_active ? 'Deactivate' : 'Activate'}
                                                    >
                                                        {stat.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        onClick={() => startEdit(stat)}
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
