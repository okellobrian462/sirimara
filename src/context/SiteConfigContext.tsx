'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import type { SiteConfig } from '@/lib/content/fetchSiteConfig';

const SiteConfigContext = createContext<SiteConfig | null>(null);

export function SiteConfigProvider({
    config,
    children
}: {
    config: SiteConfig;
    children: ReactNode
}) {
    return (
        <SiteConfigContext.Provider value={config}>
            {children}
        </SiteConfigContext.Provider>
    );
}

export function useSiteConfig() {
    const context = useContext(SiteConfigContext);
    if (!context) {
        // Return an empty object or a default value instead of throwing
        // to avoid crashing components if the provider is missing
        return {} as SiteConfig;
    }
    return context;
}
