'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GripVertical, Edit, Trash2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { deletePageSection, toggleSectionActive, reorderPageSections, PageSection } from '@/app/admin/actions/pageSections';

interface SectionListProps {
    page: string;
    sections: PageSection[];
    onEdit: (section: PageSection) => void;
    onUpdate: (sections: PageSection[]) => void;
}

export default function SectionList({ page, sections, onEdit, onUpdate }: SectionListProps) {
    const router = useRouter();
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        
    };

    const handleDragEnter = (index: number) => {
        if (draggedIndex === null) return;
        setDragOverIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === targetIndex) {
            setDraggedIndex(null);
            setDragOverIndex(null);
            return;
        }

        const newSections = [...sections];
        const draggedSection = newSections[draggedIndex];

        
        newSections.splice(draggedIndex, 1);
        
        newSections.splice(targetIndex, 0, draggedSection);

        
        const reorderedSections = newSections.map((s, i) => ({
            ...s,
            order_index: i + 1
        }));

        onUpdate(reorderedSections);
        setDraggedIndex(null);
        setDragOverIndex(null);
        setIsSaving(true);

        try {
            const sectionIds = reorderedSections.map(s => s.id!).filter(Boolean);
            const result = await reorderPageSections(page, sectionIds);
            if (!result.success) {
                alert('Failed to save order: ' + result.error);
                
            }
            router.refresh();
        } catch (error) {
            console.error('Reorder error:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this section?')) return;

        const result = await deletePageSection(id);
        if (result.success) {
            onUpdate(sections.filter(s => s.id !== id));
            router.refresh();
        } else {
            alert('Failed to delete section: ' + result.error);
        }
    };

    const handleToggleActive = async (id: string, currentStatus: boolean) => {
        const result = await toggleSectionActive(id, !currentStatus);
        if (result.success && result.data) {
            onUpdate(sections.map(s => s.id === id ? result.data : s));
            router.refresh();
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

    
    const hasOrderIssues = new Set(sections.map(s => s.order_index)).size !== sections.length;

    return (
        <div className="space-y-4">
            {hasOrderIssues && (
                <div className="flex items-center gap-2 p-4 bg-amber-50 text-amber-800 rounded-lg border border-amber-200 mb-4">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm">
                        Duplicate order indexes detected. Drag items to fix the sequence.
                    </p>
                </div>
            )}

            {sections.map((section, index) => (
                <div
                    key={section.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`bg-white border rounded-lg p-6 transition-all relative ${draggedIndex === index ? 'opacity-20 bg-gray-100' : 'hover:shadow-md'
                        } ${dragOverIndex === index && draggedIndex !== index ? 'border-t-4 border-t-gray-900 pt-5' : ''} ${!section.is_active ? 'bg-gray-50 opacity-60' : ''}`}
                >
                    <div className="flex items-start gap-4">
                        {}
                        <div className="cursor-move pt-1">
                            <GripVertical className="w-5 h-5 text-gray-400" />
                        </div>

                        {}
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
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-mono text-gray-500">Order: {section.order_index}</span>
                                    {isSaving && draggedIndex === null && (
                                        <span className="text-[10px] text-blue-500 animate-pulse">Saving...</span>
                                    )}
                                </div>
                            </div>

                            {section.content && (
                                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{section.content}</p>
                            )}

                            {section.media_url && (
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs shrink-0">
                                        {section.media_type === 'video' ? '🎥 Video' : '🖼️ Image'}
                                    </span>
                                    <span className="truncate max-w-md">{section.media_url}</span>
                                </div>
                            )}
                        </div>

                        {}
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

            {isSaving && (
                <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-300">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span className="text-sm font-medium">Updating section order...</span>
                </div>
            )}
        </div>
    );
}
