'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { uploadFile, StorageBucket } from '@/lib/supabase/storage-utils';

interface ImageUploadProps {
    bucket: StorageBucket;
    onUpload: (url: string) => void;
    label?: string;
    description?: string;
    className?: string;
    currentImage?: string;
}

export default function ImageUpload({
    bucket,
    onUpload,
    label = 'Upload Image',
    description = 'Click or drag to upload (Max 5MB)',
    className = '',
    currentImage
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB');
            return;
        }

        await startUpload(file);
    };

    const startUpload = async (file: File) => {
        setUploading(true);
        setError(null);

        try {
            const url = await uploadFile(bucket, file);
            onUpload(url);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (err: unknown) {
            console.error('Upload error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
            setError(errorMessage);
        } finally {
            setUploading(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please select an image file');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB');
                return;
            }
            await startUpload(file);
        }
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`
                    relative group cursor-pointer
                    border-2 border-dashed rounded-xl p-8
                    transition-all duration-200
                    flex flex-col items-center justify-center text-center
                    ${uploading ? 'bg-gray-50 border-gray-300' : 'bg-white border-gray-200 hover:border-orange-400 hover:bg-orange-50/30'}
                    ${error ? 'border-red-300 bg-red-50/30' : ''}
                `}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                />

                {uploading ? (
                    <div className="space-y-3">
                        <Loader2 className="w-10 h-10 text-orange-600 animate-spin mx-auto" />
                        <p className="text-sm font-medium text-gray-700">Uploading...</p>
                    </div>
                ) : currentImage ? (
                    <div className="relative w-full h-full min-h-[200px] flex flex-col items-center justify-center">
                        <img
                            src={currentImage}
                            alt="Current"
                            className="max-h-48 w-auto object-contain mb-4 rounded-lg"
                        />
                        <p className="text-xs text-gray-500">Click to change image</p>
                    </div>
                ) : (
                    <>
                        <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6 text-orange-600" />
                        </div>
                        <h4 className="text-sm font-semibold text-gray-900">{label}</h4>
                        <p className="text-xs text-gray-500 mt-1">{description}</p>
                    </>
                )}

                {error && (
                    <div className="absolute -bottom-6 left-0 right-0">
                        <p className="text-[10px] text-red-500 truncate">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
