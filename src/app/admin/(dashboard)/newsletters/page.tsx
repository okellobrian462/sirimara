import { fetchAllNewsletters } from '@/app/actions/newsletters';
import NewsletterList from '@/components/admin/NewsletterList';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default async function AdminNewslettersPage() {
    const newsletters = await fetchAllNewsletters();

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-light tracking-wide mb-2">Newsletters</h1>
                    <p className="text-gray-600">Manage your newsletter publications</p>
                </div>
                <Link
                    href="/admin/newsletters/new"
                    className="flex items-center gap-2 px-4 py-2 bg-[#181728] text-white rounded-lg hover:bg-opacity-90 transition-all text-sm uppercase tracking-wider"
                >
                    <Plus className="w-4 h-4" />
                    Add Newsletter
                </Link>
            </div>

            <NewsletterList initialNewsletters={newsletters} />
        </div>
    );
}
