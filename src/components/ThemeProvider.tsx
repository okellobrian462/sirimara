'use client';

import { useEffect } from 'react';

interface ThemeProviderProps {
    colors: {
        primary: string;
        primary_hover: string;
        accent: string;
    };
}

export default function ThemeProvider({ colors }: ThemeProviderProps) {
    useEffect(() => {
        
        if (typeof document !== 'undefined') {
            document.documentElement.style.setProperty('--brand-primary', colors.primary);
            document.documentElement.style.setProperty('--brand-primary-hover', colors.primary_hover);
            document.documentElement.style.setProperty('--brand-accent', colors.accent);
        }
    }, [colors]);

    return null;
}
