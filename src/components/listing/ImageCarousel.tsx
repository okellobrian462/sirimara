'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
    images: string[];
    videos?: string[];
    address: string;
}

type MediaItem = {
    type: 'image' | 'video';
    url: string;
};

export default function ImageCarousel({ images, videos = [], address }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const mediaItems: MediaItem[] = [
        ...images.map((url) => ({ type: 'image' as const, url })),
        ...videos.map((url) => ({ type: 'video' as const, url })),
    ];
    const displayMedia = mediaItems.length > 0
        ? mediaItems
        : [{ type: 'image' as const, url: 'https://images.unsplash.com/photo-1600596542815-27b88eae2b30?auto=format&fit=crop&w=1200&q=80' }];
    const currentMedia = displayMedia[currentIndex];

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? displayMedia.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === displayMedia.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <section className="relative w-full h-[60vh] md:h-[85vh] group overflow-hidden bg-gray-100">
            {currentMedia.type === 'video' ? (
                <video
                    src={currentMedia.url}
                    className="w-full h-full object-cover bg-black"
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={`${address} - Video ${currentIndex + 1}`}
                />
            ) : (
                <img
                    src={currentMedia.url}
                    alt={`${address} - Image ${currentIndex + 1}`}
                    className="w-full h-full object-cover"
                />
            )}

            {}
            {displayMedia.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-6 h-6 text-brand-dark" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-6 h-6 text-brand-dark" />
                    </button>

                    {}
                    <div className="absolute top-6 right-6 px-4 py-2 bg-black/60 text-white text-sm rounded-full">
                        {currentIndex + 1} / {displayMedia.length}
                    </div>
                </>
            )}

        </section>
    );
}
