'use client';

import { createNewsletter, updateNewsletter, Newsletter } from '@/app/actions/newsletters';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSiteConfig } from '@/context/SiteConfigContext';


// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

interface NewsletterFormData {
    title: string;
    slug: string;
    category: string;
    cover_image_url: string;
    description: string;
    is_featured: boolean;
}

interface Props {
    newsletter?: Newsletter | null;
}

export default function NewsletterForm({ newsletter }: Props) {
    const config = useSiteConfig();
    const magazineName = config.magazine_name || 'Magazine';
    const router = useRouter();

    const [content, setContent] = useState(newsletter?.content || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            title: newsletter?.title || '',
            slug: newsletter?.slug || '',
            category: newsletter?.category || 'INSIDER',
            cover_image_url: newsletter?.cover_image_url || '',
            description: newsletter?.description || '',
            is_featured: newsletter?.is_featured || false,
        }
    });

    const title = watch('title');

    // Auto-generate slug from title if creating new
    useEffect(() => {
        if (!newsletter && title) {
            const generatedSlug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            setValue('slug', generatedSlug);
        }
    }, [title, newsletter, setValue]);

    const onSubmit = async (data: NewsletterFormData) => {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('slug', data.slug);
        formData.append('category', data.category);
        formData.append('cover_image_url', data.cover_image_url);
        formData.append('description', data.description);
        if (data.is_featured) formData.append('is_featured', 'on');
        formData.append('content', content);

        try {
            if (newsletter) {
                await updateNewsletter(newsletter.id, formData);
            } else {
                await createNewsletter(formData);
            }
            // Redirect happens in server action
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
            setIsSubmitting(false);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Link href="/admin/newsletters" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Newsletters
            </Link>

            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                <h1 className="text-2xl font-light mb-8 pb-4 border-b border-gray-100">
                    {newsletter ? 'Edit Newsletter' : 'New Newsletter'}
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Title</label>
                            <input
                                {...register('title', { required: 'Title is required' })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none transition-all"
                                placeholder={`e.g. ${magazineName} Spring 2025`}
                            />

                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Slug (URL)</label>
                            <input
                                {...register('slug', { required: 'Slug is required' })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none transition-all bg-gray-50 font-mono text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Category</label>
                            <select
                                {...register('category')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none transition-all bg-white"
                            >
                                <option value="INSIDER">Insider</option>
                                <option value="MAGAZINE">Magazine</option>
                                <option value="NEIGHBORHOOD">Neighborhood</option>
                                <option value="MARKET REPORT">Market Report</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Cover Image URL</label>
                            <input
                                {...register('cover_image_url')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none transition-all"
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Short Description</label>
                        <textarea
                            {...register('description')}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none transition-all"
                            placeholder="Brief summary for the gallery card..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Content</label>
                        <div className="prose-editor">
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                modules={modules}
                                className="h-64 mb-12"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4">
                        <input
                            type="checkbox"
                            id="is_featured"
                            {...register('is_featured')}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                        />
                        <label htmlFor="is_featured" className="text-sm text-gray-700 select-none">Mark as Featured</label>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center justify-center px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-opacity-90 transition-all disabled:opacity-50 min-w-[150px]"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                newsletter ? 'Update Newsletter' : 'Create Newsletter'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
