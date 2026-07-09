import DevelopmentsGrid from '@/components/new-development/DevelopmentsGrid';
import type { PageSection } from '@/lib/content/fetchPageSections';

interface DevelopmentsGridSectionProps {
    section: PageSection;
}

export default function DevelopmentsGridSection({ section }: DevelopmentsGridSectionProps) {
    
    return (
        <DevelopmentsGrid />
    );
}
