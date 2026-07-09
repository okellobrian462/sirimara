'use client';

import { useState } from 'react';
import { Plus, BarChart2, Edit2, Trash2, X, Check, Save } from 'lucide-react';
import { Statistic, updateStatistic, createStatistic, deleteStatistic } from '@/app/admin/actions/statistics';

interface StatsManagerProps {
    initialStatistics: Statistic[];
}

export default function StatsManager({ initialStatistics }: StatsManagerProps) {
    const [statistics, setStatistics] = useState<Statistic[]>(initialStatistics);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    
    const [formData, setFormData] = useState<Partial<Statistic>>({});

    const handleEdit = (stat: Statistic) => {
        setEditingId(stat.id);
        setFormData(stat);
        setIsAdding(false);
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsAdding(false);
        setFormData({});
    };

    const handleSave = async () => {
        if (editingId) {
            
            const result = await updateStatistic(editingId, formData);
            if (result.success && result.data) {
                setStatistics(statistics.map(s => s.id === editingId ? result.data : s));
                setEditingId(null);
            } else {
                alert('Failed to update: ' + result.error);
            }
        } else {
            
            const result = await createStatistic({
                label: formData.label || '',
                value: formData.value || '',
                sublabel: formData.sublabel || null,
                category: formData.category || 'company',
                order_index: formData.order_index || statistics.length + 1,
                is_active: true
            } as Omit<Statistic, 'id'>);

            if (result.success && result.data) {
                setStatistics([...statistics, result.data]);
                setIsAdding(false);
            } else {
                alert('Failed to create: ' + result.error);
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this statistic?')) return;

        const result = await deleteStatistic(id);
        if (result.success) {
            setStatistics(statistics.filter(s => s.id !== id));
        } else {
            alert('Failed to delete: ' + result.error);
        }
    };

    const handleChange = (field: keyof Statistic, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    
    const groupedStats = statistics.reduce((acc, stat) => {
        const cat = stat.category || 'uncategorized';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(stat);
        return acc;
    }, {} as Record<string, Statistic[]>);

    return (
        <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-light tracking-wide mb-2">Statistics Manager</h1>
                    <p className="text-gray-600">Manage numbers displayed across the site</p>
                </div>
                <button
                    onClick={() => { setIsAdding(true); setFormData({ category: 'company' }); setEditingId(null); }}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Statistic
                </button>
            </div>

            {isAdding && (
                <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Add New Statistic</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                        <input
                            placeholder="Value (e.g. $34.4B)"
                            className="border p-2 rounded"
                            value={formData.value || ''}
                            onChange={e => handleChange('value', e.target.value)}
                        />
                        <input
                            placeholder="Label (e.g. CLOSED SALES)"
                            className="border p-2 rounded"
                            value={formData.label || ''}
                            onChange={e => handleChange('label', e.target.value)}
                        />
                        <input
                            placeholder="Sublabel (optional)"
                            className="border p-2 rounded"
                            value={formData.sublabel || ''}
                            onChange={e => handleChange('sublabel', e.target.value)}
                        />
                        <select
                            className="border p-2 rounded"
                            value={formData.category || 'company'}
                            onChange={e => handleChange('category', e.target.value)}
                        >
                            <option value="company">Company</option>
                            <option value="market">Market</option>
                            <option value="new_development">New Development</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Order"
                            className="border p-2 rounded"
                            value={formData.order_index || 0}
                            onChange={e => handleChange('order_index', parseInt(e.target.value))}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button onClick={handleCancel} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                        <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
                    </div>
                </div>
            )}

            <div className="space-y-8">
                {Object.entries(groupedStats).map(([category, stats]) => (
                    <div key={category} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-lg font-medium capitalize flex items-center gap-2">
                                <BarChart2 className="w-5 h-5 text-gray-500" />
                                {category.replace(/_/g, ' ')}
                            </h2>
                            <span className="text-sm text-gray-500">{stats.length} items</span>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {stats.map(stat => (
                                <div key={stat.id} className="p-6 transition-colors hover:bg-gray-50">
                                    {editingId === stat.id ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                                            <input
                                                className="border p-2 rounded"
                                                value={formData.value || ''}
                                                onChange={e => handleChange('value', e.target.value)}
                                            />
                                            <input
                                                className="border p-2 rounded"
                                                value={formData.label || ''}
                                                onChange={e => handleChange('label', e.target.value)}
                                            />
                                            <input
                                                className="border p-2 rounded"
                                                value={formData.sublabel || ''}
                                                onChange={e => handleChange('sublabel', e.target.value)}
                                            />
                                            <select
                                                className="border p-2 rounded"
                                                value={formData.category || 'company'}
                                                onChange={e => handleChange('category', e.target.value)}
                                            >
                                                <option value="company">Company</option>
                                                <option value="market">Market</option>
                                                <option value="new_development">New Development</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    className="border p-2 rounded w-16"
                                                    value={formData.order_index || 0}
                                                    onChange={e => handleChange('order_index', parseInt(e.target.value))}
                                                />
                                                <button onClick={handleSave} className="p-2 text-green-600 hover:bg-green-100 rounded-full"><Save className="w-5 h-5" /></button>
                                                <button onClick={handleCancel} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
                                                <div>
                                                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Value</div>
                                                    <div className="text-2xl font-light">{stat.value}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Label</div>
                                                    <div className="font-medium">{stat.label}</div>
                                                </div>
                                                {stat.sublabel && (
                                                    <div>
                                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Sublabel</div>
                                                        <div className="text-gray-600">{stat.sublabel}</div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 ml-4">
                                                <button onClick={() => handleEdit(stat)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(stat.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                                    <Trash2 className="w-4 h-4" />
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
    );
}
