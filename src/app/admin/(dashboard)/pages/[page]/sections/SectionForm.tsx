'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { createPageSection, updatePageSection, PageSection } from '@/app/admin/actions/pageSections';

interface ComponentTemplate {
    id: string;
    name: string;
    component_type: string;
    description: string | null;
    default_config: Record<string, unknown>;
}

interface SectionFormProps {
    page: string;
    section: PageSection | null;
    templates: ComponentTemplate[];
    onClose: () => void;
    onUpdate: (sections: PageSection[]) => void;
    currentSections: PageSection[];
}

export default function SectionForm({ page, section, templates, onClose, onUpdate, currentSections }: SectionFormProps) {
    const isEditing = !!section;

    const [formData, setFormData] = useState<Partial<PageSection>>({
        page,
        section_type: section?.section_type || 'hero',
        title: section?.title || '',
        subtitle: section?.subtitle || '',
        content: section?.content || '',
        media_url: section?.media_url || '',
        media_type: section?.media_type || 'image',
        layout_config: section?.layout_config || {},
        cta_primary_text: section?.cta_primary_text || '',
        cta_primary_link: section?.cta_primary_link || '',
        cta_secondary_text: section?.cta_secondary_text || '',
        cta_secondary_link: section?.cta_secondary_link || '',
        background_color: section?.background_color || '#FFFFFF',
        text_color: section?.text_color || '#000000',
        order_index: section?.order_index || currentSections.length + 1,
        is_active: section?.is_active ?? true,
        template_id: section?.template_id || null,
    });

    const [selectedTemplate, setSelectedTemplate] = useState<ComponentTemplate | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleTemplateSelect = (template: ComponentTemplate) => {
        setSelectedTemplate(template);
        setFormData(prev => ({
            ...prev,
            section_type: template.component_type,
            layout_config: template.default_config || {},
            template_id: template.id,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            let result;
            if (isEditing && section?.id) {
                result = await updatePageSection(section.id, formData as PageSection);
            } else {
                result = await createPageSection(formData as Omit<PageSection, 'id'>);
            }

            if (result.success) {
                // Refresh sections
                const updatedSections = isEditing
                    ? currentSections.map(s => s.id === section?.id ? result.data : s)
                    : [...currentSections, result.data];

                onUpdate(updatedSections);
                onClose();
            } else {
                alert('Error: ' + result.error);
            }
        } catch (error) {
            console.error('Error saving section:', error);
            alert('Failed to save section');
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (field: keyof PageSection, value: string | number | boolean | Record<string, unknown> | null) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-light">
                        {isEditing ? 'Edit Section' : 'Add New Section'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        {/* Template Selector (only for new sections) */}
                        {!isEditing && (
                            <div>
                                <label className="block text-sm font-medium mb-3">Select Template</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {templates.map(template => (
                                        <button
                                            key={template.id}
                                            type="button"
                                            onClick={() => handleTemplateSelect(template)}
                                            className={`p-4 border-2 rounded-lg text-left transition-all ${selectedTemplate?.id === template.id
                                                ? 'border-gray-900 bg-gray-50'
                                                : 'border-gray-200 hover:border-gray-400'
                                                }`}
                                        >
                                            <div className="font-medium mb-1">{template.name}</div>
                                            <div className="text-xs text-gray-500 uppercase mb-2">
                                                {template.component_type}
                                            </div>
                                            {template.description && (
                                                <div className="text-sm text-gray-600">{template.description}</div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Section Type */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Section Type</label>
                            <select
                                value={formData.section_type}
                                onChange={(e) => handleChange('section_type', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                required
                            >
                                <option value="hero">Hero</option>
                                <option value="stats">Stats</option>
                                <option value="quote">Quote</option>
                                <option value="banner">Banner</option>
                                <option value="contact">Contact</option>
                                <option value="legal">Legal Content</option>
                            </select>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Title</label>
                            <input
                                type="text"
                                value={formData.title || ''}
                                onChange={(e) => handleChange('title', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                placeholder="Section title"
                            />
                        </div>

                        {/* Subtitle */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Subtitle</label>
                            <input
                                type="text"
                                value={formData.subtitle || ''}
                                onChange={(e) => handleChange('subtitle', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                placeholder="Section subtitle"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Content</label>
                            <textarea
                                value={formData.content || ''}
                                onChange={(e) => handleChange('content', e.target.value)}
                                className={`w-full border border-gray-300 rounded-lg px-4 py-2 ${formData.section_type === 'legal' ? 'min-h-[400px] font-mono text-sm' : 'min-h-[100px]'}`}
                                placeholder="Section content (supports HTML)"
                            />
                        </div>

                        {/* Media */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Media Type</label>
                                <select
                                    value={formData.media_type || 'image'}
                                    onChange={(e) => handleChange('media_type', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                >
                                    <option value="image">Image</option>
                                    <option value="video">Video</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Media URL</label>
                                <input
                                    type="url"
                                    value={formData.media_url || ''}
                                    onChange={(e) => handleChange('media_url', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        {/* Primary CTAs */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Primary CTA Text</label>
                                <input
                                    type="text"
                                    value={formData.cta_primary_text || ''}
                                    onChange={(e) => handleChange('cta_primary_text', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="Click Here"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Primary CTA Link</label>
                                <input
                                    type="text"
                                    value={formData.cta_primary_link || ''}
                                    onChange={(e) => handleChange('cta_primary_link', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="/link"
                                />
                            </div>
                        </div>

                        {/* Secondary CTAs */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Secondary CTA Text</label>
                                <input
                                    type="text"
                                    value={formData.cta_secondary_text || ''}
                                    onChange={(e) => handleChange('cta_secondary_text', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="Learn More"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Secondary CTA Link</label>
                                <input
                                    type="text"
                                    value={formData.cta_secondary_link || ''}
                                    onChange={(e) => handleChange('cta_secondary_link', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="/learn-more"
                                />
                            </div>
                        </div>

                        {/* Colors */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Background Color</label>
                                <input
                                    type="color"
                                    value={formData.background_color}
                                    onChange={(e) => handleChange('background_color', e.target.value)}
                                    className="w-full h-10 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Text Color</label>
                                <input
                                    type="color"
                                    value={formData.text_color}
                                    onChange={(e) => handleChange('text_color', e.target.value)}
                                    className="w-full h-10 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Active Status */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={formData.is_active}
                                onChange={(e) => handleChange('is_active', e.target.checked)}
                                className="w-4 h-4"
                            />
                            <label htmlFor="is_active" className="text-sm font-medium">
                                Active (visible on site)
                            </label>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSaving}
                        className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : isEditing ? 'Update Section' : 'Create Section'}
                    </button>
                </div>
            </div>
        </div>
    );
}
