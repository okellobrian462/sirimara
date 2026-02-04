import NewsletterForm from '@/components/admin/NewsletterForm';
import { getNewsletter } from '@/app/actions/newsletters';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditNewsletterPage({ params }: Props) {
    const { id } = await params;
    const newsletter = await getNewsletter(id);

    if (!newsletter) {
        notFound();
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <NewsletterForm newsletter={newsletter} />
        </div>
    );
}
