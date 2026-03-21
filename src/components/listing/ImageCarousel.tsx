'use client';

import { useState } from 'react';
import { Camera, Map as MapIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
    images: string[];
    address: string;
}

export default function ImageCarousel({ images, address }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    // If no images, show placeholder
    const displayImages = images.length > 0 ? images : ['https://images.unsplash.com/photo-1600596542815-27b88eae2b30?auto=format&fit=crop&w=1200&q=80'];

    return (
        <section className="relative w-full h-[60vh] md:h-[85vh] group overflow-hidden bg-gray-100">
            <img
                src={displayImages[currentIndex]}
                alt={`${address} - Image ${currentIndex + 1}`}
                className="w-full h-full object-cover"
            />

            {/* Image Nav Arrows - Only show if there are multiple images */}
            {displayImages.length > 1 && (
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

                    {/* Image Counter */}
                    <div className="absolute top-6 right-6 px-4 py-2 bg-black/60 text-white text-sm rounded-full">
                        {currentIndex + 1} / {displayImages.length}
                    </div>
                </>
            )}

        </section>
    );
}
