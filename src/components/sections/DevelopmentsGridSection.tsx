import DevelopmentsGrid from '@/components/new-development/DevelopmentsGrid';
import type { PageSection } from '@/lib/content/fetchPageSections';

interface DevelopmentsGridSectionProps {
    section: PageSection;
}

export default function DevelopmentsGridSection({ section }: DevelopmentsGridSectionProps) {
    // In the future, we can pass 'section.layout_config' to configure the grid
    return (
        <DevelopmentsGrid />
    );
}
