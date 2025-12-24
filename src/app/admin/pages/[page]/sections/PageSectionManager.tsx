'use client';

import { useState } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import SectionList from './SectionList';
import SectionForm from './SectionForm';
import { PageSection } from '@/app/admin/actions/pageSections';

interface ComponentTemplate {
    id: string;
    name: string;
    component_type: string;
    description: string | null;
    default_config: Record<string, unknown>;
}

interface PageSectionManagerProps {
    page: string;
    initialSections: PageSection[];
    templates: ComponentTemplate[];
}

export default function PageSectionManager({ page, initialSections, templates }: PageSectionManagerProps) {
    const [sections, setSections] = useState<PageSection[]>(initialSections);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingSection, setEditingSection] = useState<PageSection | null>(null);

    const handleEdit = (section: PageSection) => {
        setEditingSection(section);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditingSection(null);
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setEditingSection(null);
    };

    const handleSectionUpdate = (updatedSections: PageSection[]) => {
        setSections(updatedSections);
    };

    const pageName = page.charAt(0).toUpperCase() + page.slice(1).replace(/-/g, ' ');

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <Link
                        href="/admin/pages"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Pages
                    </Link>
                    <h1 className="text-3xl font-light tracking-wide mb-2">{pageName} Page</h1>
                    <p className="text-gray-600">Manage sections for /{page}</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Section
                </button>
            </div>

            {/* Section List */}
            <SectionList
                page={page}
                sections={sections}
                onEdit={handleEdit}
                onUpdate={handleSectionUpdate}
            />

            {/* Section Form Modal */}
            {isFormOpen && (
                <SectionForm
                    page={page}
                    section={editingSection}
                    templates={templates}
                    onClose={handleFormClose}
                    onUpdate={handleSectionUpdate}
                    currentSections={sections}
                />
            )}
        </div>
    );
}
