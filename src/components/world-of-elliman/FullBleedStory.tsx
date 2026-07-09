'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { Play, Pause } from 'lucide-react';

interface FullBleedStoryProps {
    title: string;
    subtitle?: string;
    label?: string;
    ctaText?: string;
    ctaLink?: string;
    videoUrl?: string;
    imageUrl?: string;
    variant?: 'hero' | 'story' | 'banner';
    className?: string;
}

export default function FullBleedStory({
    title,
    subtitle,
    label,
    ctaText,
    ctaLink,
    videoUrl,
    imageUrl,
    variant = 'story',
    className = ''
}: FullBleedStoryProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Video autoplay failed:", error);
                setIsPlaying(false);
            });
        }
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const isHero = variant === 'hero';

    return (
        <section className={`relative w-full h-screen overflow-hidden bg-black snap-start ${className}`}>
            {}
            <div className="absolute inset-0 z-0">
                {videoUrl ? (
                    <div className="relative w-full h-full">
                        <video
                            ref={videoRef}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            loop
                            muted
                            playsInline
                            autoPlay
                            preload="auto"
                            src={videoUrl}
                        />
                        <button
                            onClick={togglePlay}
                            className="absolute bottom-8 right-8 z-20 p-2 text-white hover:opacity-70 transition-opacity"
                            aria-label={isPlaying ? "Pause Video" : "Play Video"}
                        >
                            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                        </button>
                    </div>
                ) : imageUrl ? (
                    <div className="relative w-full h-full">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="w-full h-full bg-gray-900" />
                )}
                {}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {}
            <div className={`relative z-10 w-full h-full flex flex-col p-8 md:p-16 text-white
                ${isHero ? 'items-center justify-center text-center' : 'justify-end items-start'}
            `}>
                <div className={`max-w-4xl opacity-100 transition-opacity duration-1000
                    ${isHero ? 'flex flex-col items-center' : ''}
                `}>
                    {label && (
                        <p className={`font-serif italic text-lg md:text-xl mb-2 tracking-wide font-light opacity-90
                            ${isHero ? 'text-2xl md:text-3xl mb-4' : ''}
                        `}>
                            {label}
                        </p>
                    )}

                    <h1 className={`uppercase font-light tracking-[0.1em] mb-4
                        ${isHero
                            ? 'text-6xl md:text-8xl lg:text-9xl tracking-[0.2em]'
                            : 'text-4xl md:text-5xl lg:text-6xl'
                        }
                    `}>
                        {title}
                    </h1>

                    {subtitle && (
                        <p className={`font-light text-base md:text-lg opacity-90 max-w-lg mb-8 leading-relaxed
                            ${isHero ? 'text-xl md:text-2xl max-w-2xl' : ''}
                        `}>
                            {subtitle}
                        </p>
                    )}

                </div>
            </div>

            {}
            {isHero && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-sm font-medium tracking-[0.2em] text-white animate-bounce whitespace-nowrap">
                    SCROLL TO DISCOVER
                </div>
            )}
        </section>
    );
}
