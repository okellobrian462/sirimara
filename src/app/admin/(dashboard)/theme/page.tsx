'use client';

import { useState, useEffect } from 'react';
import { getSiteConfig, updateSiteConfigItem } from '@/app/admin/actions/siteConfig';
import { Palette } from 'lucide-react';

interface ThemeColors {
    primary: string;
    primary_hover: string;
    accent: string;
}

export default function ThemePage() {
    const [colors, setColors] = useState<ThemeColors>({
        primary: '#111827',
        primary_hover: '#252438',
        accent: '#8B5CF6'
    });
    const [configId, setConfigId] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function loadTheme() {
            const result = await getSiteConfig();
            if (result.success && result.data) {
                const themeConfig = result.data.find((item: { key: string }) => item.key === 'theme_colors');
                if (themeConfig) {
                    setConfigId(themeConfig.id);
                    const themeColors = typeof themeConfig.value === 'string'
                        ? JSON.parse(themeConfig.value)
                        : themeConfig.value;
                    setColors(themeColors as ThemeColors);
                }
            }
            setLoading(false);
        }
        loadTheme();
    }, []);

    async function handleSave() {
        setSaving(true);
        const result = await updateSiteConfigItem(configId, colors as unknown as { [key: string]: unknown });
        if (result.success) {
            alert('Theme updated successfully! The changes will appear across the site.');
        } else {
            alert('Failed to update theme: ' + result.error);
        }
        setSaving(false);
    }

    function handleReset() {
        setColors({
            primary: '#111827',
            primary_hover: '#252438',
            accent: '#8B5CF6'
        });
    }

    if (loading) {
        return (
            <div className="p-8">
                <div className="text-center text-gray-500">Loading theme settings...</div>
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Palette className="w-8 h-8 text-orange-600" />
                    <h1 className="text-3xl font-light tracking-[0.15em] text-gray-900">
                        THEME SETTINGS
                    </h1>
                </div>
                <p className="text-gray-500">
                    Customize your site's color scheme. Changes apply instantly across the entire website.
                </p>
            </div>

            {/* Color Settings */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-2xl">
                <div className="space-y-6">
                    {/* Primary Color */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Primary Brand Color
                        </label>
                        <p className="text-xs text-gray-500 mb-3">
                            Used for header, footer, buttons, and main brand elements
                        </p>
                        <div className="flex items-center gap-4">
                            <input
                                type="color"
                                value={colors.primary}
                                onChange={(e) => setColors({ ...colors, primary: e.target.value })}
                                className="w-20 h-20 rounded-lg border-2 border-gray-300 cursor-pointer"
                            />
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={colors.primary}
                                    onChange={(e) => setColors({ ...colors, primary: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                                    placeholder='#111827'
                                />
                            </div>
                        </div>
                    </div>

                    {/* Primary Hover Color */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Primary Hover Color
                        </label>
                        <p className="text-xs text-gray-500 mb-3">
                            Used when hovering over primary elements
                        </p>
                        <div className="flex items-center gap-4">
                            <input
                                type="color"
                                value={colors.primary_hover}
                                onChange={(e) => setColors({ ...colors, primary_hover: e.target.value })}
                                className="w-20 h-20 rounded-lg border-2 border-gray-300 cursor-pointer"
                            />
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={colors.primary_hover}
                                    onChange={(e) => setColors({ ...colors, primary_hover: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                                    placeholder="#252438"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Accent Color */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Accent Color
                        </label>
                        <p className="text-xs text-gray-500 mb-3">
                            Used for highlights, links, and call-to-action elements
                        </p>
                        <div className="flex items-center gap-4">
                            <input
                                type="color"
                                value={colors.accent}
                                onChange={(e) => setColors({ ...colors, accent: e.target.value })}
                                className="w-20 h-20 rounded-lg border-2 border-gray-300 cursor-pointer"
                            />
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={colors.accent}
                                    onChange={(e) => setColors({ ...colors, accent: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                                    placeholder="#8B5CF6"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="mt-8 p-6 rounded-lg border-2 border-gray-200 bg-gray-50">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Preview</h3>
                    <div className="space-y-3">
                        <div
                            className="px-6 py-3 rounded-lg text-white font-medium text-center"
                            style={{ backgroundColor: colors.primary }}
                        >
                            Primary Color Sample
                        </div>
                        <div
                            className="px-6 py-3 rounded-lg text-white font-medium text-center"
                            style={{ backgroundColor: colors.accent }}
                        >
                            Accent Color Sample
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-8">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                        Reset to Defaults
                    </button>
                </div>
            </div>
        </div>
    );
}
