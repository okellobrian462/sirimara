'use client';

import React, { useRef, useEffect } from 'react';

export default function HeroSection() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(e => console.log("Video autoplay failed", e));
        }
    }, []);

    return (
        <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-900 text-white">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
                    loop
                    muted
                    playsInline
                    autoPlay
                    src="https://res.cloudinary.com/dk92v0fkk/video/upload/v1759403146/production/wlhumthotyeszdoobmp2.mp4"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
                <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-4 opacity-90">
                    NEW DEVELOPMENT
                </p>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.05em] mb-4 uppercase">
                    WE ARE DEDM
                </h1>
                <p className="font-serif italic text-3xl md:text-5xl font-light opacity-90 animate-fade-in-up">
                    Creative ideators
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-80 animate-bounce">
                <span className="text-xs font-medium tracking-[0.2em] uppercase">SCROLL TO DISCOVER</span>
                <div className="w-[1px] h-12 bg-white/50" />
            </div>
        </section>
    );
}
