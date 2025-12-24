'use client';

import { useState } from 'react';
import { GripVertical, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { deletePageSection, toggleSectionActive, reorderPageSections, PageSection } from '@/app/admin/actions/pageSections';

interface SectionListProps {
    page: string;
    sections: PageSection[];
    onEdit: (section: PageSection) => void;
    onUpdate: (sections: PageSection[]) => void;
}

export default function SectionList({ page, sections, onEdit, onUpdate }: SectionListProps) {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        const newSections = [...sections];
        const draggedSection = newSections[draggedIndex];
        newSections.splice(draggedIndex, 1);
        newSections.splice(index, 0, draggedSection);

        setDraggedIndex(index);
        onUpdate(newSections);
    };

    const handleDragEnd = async () => {
        if (draggedIndex !== null) {
            // Save new order to database
            const sectionIds = sections.map(s => s.id!).filter(Boolean);
            await reorderPageSections(page, sectionIds);
        }
        setDraggedIndex(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this section?')) return;

        const result = await deletePageSection(id);
        if (result.success) {
            onUpdate(sections.filter(s => s.id !== id));
        } else {
            alert('Failed to delete section: ' + result.error);
        }
    };

    const handleToggleActive = async (id: string, currentStatus: boolean) => {
        const result = await toggleSectionActive(id, !currentStatus);
        if (result.success && result.data) {
            onUpdate(sections.map(s => s.id === id ? result.data : s));
        } else {
            alert('Failed to toggle section: ' + result.error);
        }
    };

    if (sections.length === 0) {
        return (
            <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-500 mb-4">No sections yet</p>
                <p className="text-sm text-gray-400">Click "Add Section" to create your first section</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {sections.map((section, index) => (
                <div
                    key={section.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`bg-white border rounded-lg p-6 transition-all ${draggedIndex === index ? 'opacity-50' : 'hover:shadow-md'
                        } ${!section.is_active ? 'bg-gray-50 opacity-60' : ''}`}
                >
                    <div className="flex items-start gap-4">
                        {/* Drag Handle */}
                        <div className="cursor-move pt-1">
                            <GripVertical className="w-5 h-5 text-gray-400" />
                        </div>

                        {/* Section Info */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full uppercase">
                                            {section.section_type}
                                        </span>
                                        {!section.is_active && (
                                            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                                                Hidden
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-medium">
                                        {section.title || section.subtitle || 'Untitled Section'}
                                    </h3>
                                </div>
                                <span className="text-sm text-gray-500">Order: {section.order_index}</span>
                            </div>

                            {section.content && (
                                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{section.content}</p>
                            )}

                            {section.media_url && (
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                        {section.media_type === 'video' ? '🎥 Video' : '🖼️ Image'}
                                    </span>
                                    <span className="truncate max-w-md">{section.media_url}</span>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleToggleActive(section.id!, section.is_active)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title={section.is_active ? 'Hide section' : 'Show section'}
                            >
                                {section.is_active ? (
                                    <Eye className="w-5 h-5 text-gray-600" />
                                ) : (
                                    <EyeOff className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                            <button
                                onClick={() => onEdit(section)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Edit section"
                            >
                                <Edit className="w-5 h-5 text-gray-600" />
                            </button>
                            <button
                                onClick={() => handleDelete(section.id!)}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete section"
                            >
                                <Trash2 className="w-5 h-5 text-red-600" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
