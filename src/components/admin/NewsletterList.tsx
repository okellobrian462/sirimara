'use client';

import { Newsletter, deleteNewsletter } from '@/app/actions/newsletters';
import { Pencil, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
    initialNewsletters: Newsletter[];
}

export default function NewsletterList({ initialNewsletters }: Props) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this newsletter?')) return;

        setIsDeleting(id);
        const result = await deleteNewsletter(id);

        if (result.success) {
            router.refresh();
        } else {
            alert('Error deleting newsletter');
        }
        setIsDeleting(null);
    };

    if (initialNewsletters.length === 0) {
        return (
            <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">No newsletters found. Add one to get started.</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 font-medium text-gray-500 uppercase text-xs tracking-wider">Cover</th>
                        <th className="px-6 py-4 font-medium text-gray-500 uppercase text-xs tracking-wider">Title / Slug</th>
                        <th className="px-6 py-4 font-medium text-gray-500 uppercase text-xs tracking-wider">Category</th>
                        <th className="px-6 py-4 font-medium text-gray-500 uppercase text-xs tracking-wider">Created</th>
                        <th className="px-6 py-4 font-medium text-gray-500 uppercase text-xs tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {initialNewsletters.map((newsletter) => (
                        <tr key={newsletter.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 w-24">
                                <div className="relative w-12 h-16 bg-gray-100 rounded overflow-hidden">
                                    {newsletter.cover_image_url && (
                                        <Image
                                            src={newsletter.cover_image_url}
                                            alt={newsletter.title}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <p className="font-medium text-gray-900">{newsletter.title}</p>
                                <p className="text-gray-500 text-sm font-mono">{newsletter.slug}</p>
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {newsletter.category}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500 text-sm">
                                {new Date(newsletter.created_at || new Date()).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-right space-x-2">
                                <Link
                                    href={`/newsletters/${newsletter.slug}`}
                                    target="_blank"
                                    className="inline-flex p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                    title="View Page"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </Link>
                                <Link
                                    href={`/admin/newsletters/${newsletter.id}`}
                                    className="inline-flex p-2 text-blue-400 hover:text-blue-600 transition-colors"
                                    title="Edit"
                                >
                                    <Pencil className="w-4 h-4" />
                                </Link>
                                <button
                                    onClick={() => handleDelete(newsletter.id)}
                                    disabled={isDeleting === newsletter.id}
                                    className="inline-flex p-2 text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
