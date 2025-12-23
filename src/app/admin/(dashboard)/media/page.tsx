'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Upload, Trash2, Copy, Loader2, Image as ImageIcon, Video } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface MediaItem {
    id: string;
    filename: string;
    cloudinary_url: string;
    cloudinary_id: string;
    media_type: 'image' | 'video';
    file_size: number | null;
    dimensions: { width: number; height: number } | null;
    alt_text: string | null;
    tags: string[];
    uploaded_at: string;
}

export default function MediaLibraryPage() {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
    const [message, setMessage] = useState('');
    const [showUpload, setShowUpload] = useState(false);



    const fetchMedia = useCallback(async () => {
        const supabase = createClient();
        let query = supabase.from('media_library').select('*').order('uploaded_at', { ascending: false });

        if (filter !== 'all') {
            query = query.eq('media_type', filter);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching media:', error);
        } else {
            setMedia(data || []);
        }
        setLoading(false);
    }, [filter]);

    useEffect(() => {
        fetchMedia();
    }, [fetchMedia]);

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this media item?')) return;

        const supabase = createClient();
        const { error } = await supabase.from('media_library').delete().eq('id', id);

        if (error) {
            setMessage('Error deleting media');
            console.error(error);
        } else {
            setMessage('Media deleted successfully!');
            fetchMedia();
            setTimeout(() => setMessage(''), 3000);
        }
    }

    function copyUrl(url: string) {
        navigator.clipboard.writeText(url);
        setMessage('URL copied to clipboard!');
        setTimeout(() => setMessage(''), 2000);
    }

    async function handleUploadComplete(url: string) {
        // Extract filename from URL
        const filename = url.split('/').pop() || 'uploaded_file';
        const mediaType = url.includes('.mp4') || url.includes('.mov') ? 'video' : 'image';

        const supabase = createClient();
        const { error } = await supabase.from('media_library').insert({
            filename,
            cloudinary_url: url,
            cloudinary_id: filename,
            media_type: mediaType,
        });

        if (error) {
            console.error('Error saving media:', error);
        } else {
            setShowUpload(false);
            fetchMedia();
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-light text-gray-900">Media Library</h1>
                        <p className="text-gray-500 mt-2">Manage images and videos</p>
                    </div>
                    <button
                        onClick={() => setShowUpload(!showUpload)}
                        className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
                    >
                        <Upload className="w-4 h-4" />
                        Upload Media
                    </button>
                </div>

                {message && (
                    <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
                        }`}>
                        {message}
                    </div>
                )}

                {showUpload && (
                    <div className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold mb-4">Upload New Media</h2>
                        <ImageUpload
                            bucket="property-images"
                            onUpload={handleUploadComplete}
                            currentImage=""
                        />
                    </div>
                )}

                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('image')}
                        className={`px-4 py-2 rounded-lg ${filter === 'image' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Images
                    </button>
                    <button
                        onClick={() => setFilter('video')}
                        className={`px-4 py-2 rounded-lg ${filter === 'video' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Videos
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {media.map(item => (
                        <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden group">
                            <div className="aspect-video bg-gray-100 relative">
                                {item.media_type === 'image' ? (
                                    <img
                                        src={item.cloudinary_url}
                                        alt={item.alt_text || item.filename}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Video className="w-12 h-12 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <p className="text-sm font-medium text-gray-900 truncate mb-2">{item.filename}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                    {item.media_type === 'image' ? <ImageIcon className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                                    <span>{item.media_type}</span>
                                    {item.file_size && <span>• {(item.file_size / 1024).toFixed(0)} KB</span>}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => copyUrl(item.cloudinary_url)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-xs"
                                    >
                                        <Copy className="w-3 h-3" />
                                        Copy URL
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {media.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No media items found. Upload some to get started!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
