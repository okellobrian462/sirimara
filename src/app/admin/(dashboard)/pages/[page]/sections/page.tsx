import { Metadata } from 'next';
import PageSectionManager from './PageSectionManager';
import { getPageSections, getComponentTemplates } from '@/app/admin/actions/pageSections';

export const metadata: Metadata = {
    title: 'Section Manager | Admin',
};

interface PageParams {
    params: Promise<{
        page: string;
    }>;
}

export default async function PageSectionsPage(props: PageParams) {
    const params = await props.params;
    const { page } = params;

    const [sectionsResult, templatesResult] = await Promise.all([
        getPageSections(page),
        getComponentTemplates()
    ]);

    return (
        <PageSectionManager
            page={page}
            initialSections={sectionsResult.data || []}
            templates={templatesResult.data || []}
        />
    );
}
