'use client';

import React, { useRef, useState, useEffect, ReactNode } from 'react';
import FullBleedStory from '@/components/world-of-sirimara/FullBleedStory';
import GroupedBanner from '@/components/world-of-sirimara/GroupedBanner';
import ControlBullets from '@/components/world-of-sirimara/ControlBullets';
import MarketModules from '@/components/world-of-sirimara/MarketModules';

const SECTIONS = [
    'hero',
    'equine',
    'impact',
    'freedom',
    'aspen',
    'modules',
    'footer'
];

interface WorldOfSirimaraClientProps {
    header: ReactNode;
    footer: ReactNode;
}

export default function WorldOfSirimaraClient({ header, footer }: WorldOfSirimaraClientProps) {
    const mainRef = useRef<HTMLElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (mainRef.current) {
                setIsScrolled(mainRef.current.scrollTop > 50);
            }
        };

        const mainElement = mainRef.current;
        if (mainElement) {
            mainElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (mainElement) {
                mainElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <main ref={mainRef} className="relative h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
            <div className="fixed top-0 left-0 w-full z-50">
                {header}
            </div>
            <ControlBullets sections={SECTIONS} />

            {}
            <div id="hero">
                <FullBleedStory
                    title="sirimara"
                    label="The world of "
                    subtitle="Get immersed in the places, people, and lifestyles that inspire our world."
                    variant="hero"
                    videoUrl="https://res.cloudinary.com/dk92v0fkk/video/upload/v1720626100/staging/lr2gqm9cktkmncz9xs5r.mp4"
                />
            </div>

            {}
            <div id="equine">
                <FullBleedStory
                    title="LIVING THE EQUINE LIFE"
                    label="At Home with Horses"
                    ctaText="WHERE TO ROAM"
                    ctaLink="/world-of-sirimara/living-the-equine-life"
                    videoUrl="https://res.cloudinary.com/dk92v0fkk/video/upload/v1730914999/staging-test/dgx2uoymxfoj06t9eq3n.mp4"
                />
            </div>

            {}
            <div id="impact">
                <GroupedBanner
                    items={[
                        {
                            label: "Making An Impact",
                            title: "THE RIDE FOR LOVE",
                            ctaText: "WHY WE RIDE",
                            ctaLink: "/world-of-sirimara/the-ride-for-love",
                            imageUrl: "https://res.cloudinary.com/dk92v0fkk/image/upload/v1730937945/staging-test/svju8ywnjrwgvzm7qcf7.webp"
                        },
                        {
                            label: "An Eye for Detail",
                            title: "THE DRIVING FORCE",
                            ctaText: "GET INSPIRED",
                            ctaLink: "/world-of-sirimara/the-driving-force",
                            imageUrl: "https://res.cloudinary.com/dk92v0fkk/image/upload/v1730941028/staging-test/zomzhqs6iw3iilkbizvd.webp"
                        }
                    ]}
                />
            </div>

            {}
            <div id="freedom">
                <FullBleedStory
                    title="FINDING FREEDOM"
                    label="Life At Sea"
                    ctaText="SET YOUR COURSE"
                    ctaLink="/world-of-sirimara/finding-freedom"
                    videoUrl="https://res.cloudinary.com/dk92v0fkk/video/upload/v1730922184/staging-test/r5mwvpfrszic6p564rzj.mp4"
                />
            </div>

            {}
            <div id="aspen">
                <FullBleedStory
                    title="THE CALL OF ASPEN"
                    label="Making Moves "
                    ctaText="hit the slopes"
                    ctaLink="/world-of-sirimara/the-call-of-aspen"
                    imageUrl="https://res.cloudinary.com/dk92v0fkk/image/upload/v1730944030/staging-test/tmwrauyo2pma3fhnocdg.webp"
                />
            </div>

            {}
            <div id="modules">
                <MarketModules />
            </div>

            {}
            <div id="footer" className="snap-start">
                {footer}
            </div>
        </main>
    );
}
