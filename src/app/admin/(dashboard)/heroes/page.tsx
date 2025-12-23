'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Edit2, Trash2, Save, X, Loader2, Eye, EyeOff } from 'lucide-react';

interface HeroSection {
    id: string;
    page: string;
    section_key: string;
    headline: string | null;
    subheadline: string | null;
    cta_text: string | null;
    cta_link: string | null;
    media_type: 'image' | 'video' | null;
    media_url: string | null;
    overlay_opacity: number;
    is_active: boolean;
    order: number;
}

export default function HeroSectionsPage() {
    const [heroes, setHeroes] = useState<HeroSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<HeroSection>>({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchHeroes();
    }, []);

    async function fetchHeroes() {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('hero_sections')
            .select('*')
            .order('page', { ascending: true })
            .order('order', { ascending: true });

        if (error) {
            console.error('Error fetching heroes:', error);
        } else {
            setHeroes(data || []);
        }
        setLoading(false);
    }

    async function handleSave() {
        if (!editingId || !editForm) return;

        const supabase = createClient();
        const { error } = await supabase
            .from('hero_sections')
            .update({
                ...editForm,
                updated_at: new Date().toISOString()
            })
            .eq('id', editingId);

        if (error) {
            setMessage('Error saving hero section');
            console.error(error);
        } else {
            setMessage('Hero section saved successfully!');
            setEditingId(null);
            setEditForm({});
            fetchHeroes();
            setTimeout(() => setMessage(''), 3000);
        }
    }

    async function toggleActive(id: string, currentState: boolean) {
        const supabase = createClient();
        const { error } = await supabase
            .from('hero_sections')
            .update({ is_active: !currentState })
            .eq('id', id);

        if (!error) {
            fetchHeroes();
        }
    }

    function startEdit(hero: HeroSection) {
        setEditingId(hero.id);
        setEditForm(hero);
    }

    function cancelEdit() {
        setEditingId(null);
        setEditForm({});
    }

    const groupedHeroes = heroes.reduce((acc, hero) => {
        if (!acc[hero.page]) acc[hero.page] = [];
        acc[hero.page].push(hero);
        return acc;
    }, {} as Record<string, HeroSection[]>);

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
                    <h1 className="text-3xl font-light text-gray-900">Hero Sections</h1>
                    <p className="text-gray-500 mt-2">Manage hero content across all pages</p>
                </div>

                {message && (
                    <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
                        }`}>
                        {message}
                    </div>
                )}

                <div className="space-y-8">
                    {Object.entries(groupedHeroes).map(([page, pageHeroes]) => (
                        <div key={page} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900 capitalize">{page}</h2>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {pageHeroes.map(hero => (
                                    <div key={hero.id} className="p-6">
                                        {editingId === hero.id ? (
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
                                                        <input
                                                            type="text"
                                                            value={editForm.headline || ''}
                                                            onChange={(e) => setEditForm({ ...editForm, headline: e.target.value })}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Subheadline</label>
                                                        <input
                                                            type="text"
                                                            value={editForm.subheadline || ''}
                                                            onChange={(e) => setEditForm({ ...editForm, subheadline: e.target.value })}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">CTA Text</label>
                                                        <input
                                                            type="text"
                                                            value={editForm.cta_text || ''}
                                                            onChange={(e) => setEditForm({ ...editForm, cta_text: e.target.value })}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">CTA Link</label>
                                                        <input
                                                            type="text"
                                                            value={editForm.cta_link || ''}
                                                            onChange={(e) => setEditForm({ ...editForm, cta_link: e.target.value })}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Media Type</label>
                                                        <select
                                                            value={editForm.media_type || ''}
                                                            onChange={(e) => setEditForm({ ...editForm, media_type: e.target.value as 'image' | 'video' })}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                                        >
                                                            <option value="image">Image</option>
                                                            <option value="video">Video</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Media URL</label>
                                                        <input
                                                            type="text"
                                                            value={editForm.media_url || ''}
                                                            onChange={(e) => setEditForm({ ...editForm, media_url: e.target.value })}
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
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-lg font-semibold text-gray-900">{hero.headline || 'No headline'}</h3>
                                                        <span className={`px-2 py-1 text-xs rounded-full ${hero.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {hero.is_active ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </div>
                                                    {hero.subheadline && (
                                                        <p className="text-gray-600 mb-2">{hero.subheadline}</p>
                                                    )}
                                                    <div className="flex gap-4 text-sm text-gray-500">
                                                        {hero.cta_text && <span>CTA: {hero.cta_text}</span>}
                                                        {hero.media_type && <span>Media: {hero.media_type}</span>}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => toggleActive(hero.id, hero.is_active)}
                                                        className="p-2 hover:bg-gray-100 rounded-lg"
                                                        title={hero.is_active ? 'Deactivate' : 'Activate'}
                                                    >
                                                        {hero.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        onClick={() => startEdit(hero)}
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
