'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon, Video, File as FileIcon } from 'lucide-react';
import { uploadFile, StorageBucket } from '@/lib/supabase/storage-utils';

interface MediaUploadProps {
    bucket: StorageBucket;
    onUpload: (url: string) => void;
    label?: string;
    description?: string;
    className?: string;
    currentImage?: string; // Kept for backward compat, but we might want currentMediaUrl
    acceptedFileTypes?: string; // e.g. "image/*,video/*"
    maxSizeMB?: number;
    videoBucket?: StorageBucket;
}

export default function MediaUpload({
    bucket,
    onUpload,
    label = 'Upload Media',
    description = 'Click or drag to upload (Max 50MB)',
    className = '',
    currentImage,
    acceptedFileTypes = 'image/*,video/*',
    maxSizeMB = 50,
    videoBucket
}: MediaUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        await validateAndUpload(file);
    };

    const validateAndUpload = async (file: File) => {
        // Validation
        const fileType = file.type;
        const acceptedTypes = acceptedFileTypes.split(',').map(t => t.trim());

        const isAllowed = acceptedTypes.some(type => {
            if (type.endsWith('/*')) {
                const baseType = type.split('/')[0];
                return fileType.startsWith(baseType + '/');
            }
            return fileType === type;
        });

        if (!isAllowed) {
            setError(`File type ${fileType} is not allowed. Accepted: ${acceptedFileTypes}`);
            return;
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`File size must be less than ${maxSizeMB}MB`);
            return;
        }

        await startUpload(file);
    };

    const startUpload = async (file: File) => {
        setUploading(true);
        setError(null);

        try {
            const isVideoFile = file.type.startsWith('video/');
            const targetBucket = (isVideoFile && videoBucket) ? videoBucket : bucket;
            const url = await uploadFile(targetBucket, file);
            onUpload(url);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (err: unknown) {
            console.error('Upload error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to upload media';
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
            await validateAndUpload(file);
        }
    };

    const isVideo = (url?: string) => {
        if (!url) return false;
        return url.toLowerCase().match(/\.(mp4|mov|webm)$/) || url.includes('video'); // Heuristic
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
                    ${uploading ? 'bg-gray-50 border-gray-300' : 'bg-white border-gray-200 hover:border-purple-400 hover:bg-purple-50/30'}
                    ${error ? 'border-red-300 bg-red-50/30' : ''}
                `}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={acceptedFileTypes}
                    className="hidden"
                    disabled={uploading}
                />

                {uploading ? (
                    <div className="space-y-3">
                        <Loader2 className="w-10 h-10 text-purple-600 animate-spin mx-auto" />
                        <p className="text-sm font-medium text-gray-700">Uploading...</p>
                    </div>
                ) : currentImage ? (
                    <div className="relative w-full h-full min-h-[200px] flex flex-col items-center justify-center">
                        {isVideo(currentImage) ? (
                            <div className="flex flex-col items-center">
                                <Video className="w-16 h-16 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500">Video Uploaded</span>
                            </div>
                        ) : (
                            <img
                                src={currentImage}
                                alt="Current"
                                className="max-h-48 w-auto object-contain mb-4 rounded-lg"
                            />
                        )}
                        <p className="text-xs text-gray-500 mt-2">Click to change</p>
                    </div>
                ) : (
                    <>
                        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6 text-purple-600" />
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
