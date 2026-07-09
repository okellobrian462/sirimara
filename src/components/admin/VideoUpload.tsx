'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Video, AlertCircle } from 'lucide-react';
import { uploadFile, StorageBucket } from '@/lib/supabase/storage-utils';

interface VideoUploadProps {
    bucket?: StorageBucket;
    onUpload: (url: string) => void;
    label?: string;
    description?: string;
    className?: string;
    currentVideo?: string;
    maxSizeMB?: number;
}

export default function VideoUpload({
    bucket = 'videos',
    onUpload,
    label = 'Upload Video',
    description = 'Click or drag to upload (Max 500MB, MP4/WebM/MOV)',
    className = '',
    currentVideo,
    maxSizeMB = 500
}: VideoUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!allowedVideoTypes.includes(file.type)) {
            setError('Please select a valid video file (MP4, WebM, or MOV)');
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
        setUploadProgress(0);

        try {
            // Simulate progress
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => Math.min(prev + Math.random() * 30, 90));
            }, 500);

            const url = await uploadFile(bucket, file);
            clearInterval(progressInterval);
            setUploadProgress(100);
            
            onUpload(url);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (err: unknown) {
            console.error('Upload error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to upload video';
            setError(errorMessage);
        } finally {
            setUploading(false);
            setUploadProgress(0);
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
            if (!allowedVideoTypes.includes(file.type)) {
                setError('Please select a valid video file (MP4, WebM, or MOV)');
                return;
            }
            if (file.size > maxSizeMB * 1024 * 1024) {
                setError(`File size must be less than ${maxSizeMB}MB`);
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
                    min-h-[240px]
                    ${uploading ? 'bg-gray-50 border-gray-300' : 'bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50/30'}
                    ${error ? 'border-red-300 bg-red-50/30' : ''}
                `}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="video/mp4,video/webm,video/quicktime"
                    className="hidden"
                    disabled={uploading}
                />

                {uploading ? (
                    <div className="space-y-3 w-full">
                        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
                        <p className="text-sm font-medium text-gray-700">Uploading video...</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                        <p className="text-xs text-gray-500">{Math.round(uploadProgress)}%</p>
                    </div>
                ) : currentVideo ? (
                    <div className="relative w-full h-full min-h-[240px] flex flex-col items-center justify-center">
                        <Video className="w-16 h-16 text-gray-400 mb-3" />
                        <span className="text-sm text-gray-600 font-medium mb-1">Video Uploaded</span>
                        <p className="text-xs text-gray-500 truncate max-w-xs">{currentVideo.split('/').pop()}</p>
                        <p className="text-xs text-gray-500 mt-2">Click to change video</p>
                    </div>
                ) : (
                    <>
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6 text-blue-600" />
                        </div>
                        <h4 className="text-sm font-semibold text-gray-900">{label}</h4>
                        <p className="text-xs text-gray-500 mt-2">{description}</p>
                    </>
                )}

                {error && (
                    <div className="absolute top-4 right-4 left-4 flex items-start gap-2 bg-red-100 border border-red-300 rounded-lg p-3">
                        <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-red-700">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
