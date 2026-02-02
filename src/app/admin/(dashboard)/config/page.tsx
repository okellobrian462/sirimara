'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2 } from 'lucide-react';
import { getSiteConfig, updateSiteConfigBatch, SiteConfigItem } from '@/app/admin/actions/siteConfig';

export default function SiteConfigPage() {
    const router = useRouter();
    const [config, setConfig] = useState<SiteConfigItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchConfig();
    }, []);

    async function fetchConfig() {
        const result = await getSiteConfig();

        if (result.success) {
            setConfig(result.data);
        } else {
            setMessage('Error loading configuration');
        }
        setLoading(false);
    }

    async function handleSave() {
        setSaving(true);
        setMessage('');

        const items = config.map(item => ({
            id: item.id,
            value: item.value
        }));

        const result = await updateSiteConfigBatch(items);

        if (result.success) {
            setMessage('Configuration saved successfully!');
            router.refresh(); // Refresh to show updated data on main site
            setTimeout(() => setMessage(''), 3000);
        } else {
            setMessage('Error saving configuration');
        }

        setSaving(false);
    }

    function updateValue(id: string, newValue: string) {
        setConfig(prev => prev.map(item =>
            item.id === id ? { ...item, value: newValue } : item
        ));
    }

    const groupedConfig = config.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, SiteConfigItem[]>);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-light text-gray-900">Site Configuration</h1>
                        <p className="text-gray-500 mt-2">Manage site-wide settings and branding</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>

                {message && (
                    <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
                        }`}>
                        {message}
                    </div>
                )}

                <div className="space-y-8">
                    {Object.entries(groupedConfig).map(([category, items]) => (
                        <div key={category} className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 capitalize">
                                {category}
                            </h2>
                            <div className="space-y-4">
                                {items.map(item => (
                                    <div key={item.id}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                                            {item.key.replace(/_/g, ' ')}
                                        </label>
                                        <input
                                            type="text"
                                            value={typeof item.value === 'string' ? item.value : JSON.stringify(item.value)}
                                            onChange={(e) => updateValue(item.id, e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                        />
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
