'use client';

import React, { useEffect, useState } from 'react';

interface ControlBulletsProps {
    sections: string[]; 
}

export default function ControlBullets({ sections }: ControlBulletsProps) {
    const [activeSection, setActiveSection] = useState<string>(sections[0]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.5, 
            }
        );

        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
            {sections.map((id) => (
                <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/50 
                        ${activeSection === id
                            ? 'bg-white scale-125'
                            : 'bg-transparent hover:bg-white/30'
                        }
                    `}
                    aria-label={`Scroll to section ${id}`}
                />
            ))}
        </div>
    );
}
