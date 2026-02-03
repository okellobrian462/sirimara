'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavigationItem {
    id: string;
    label: string;
    url: string;
    opens_in_new_tab: boolean;
}

interface FooterMarketsProps {
    markets: NavigationItem[];
    title?: string;
}

export default function FooterMarkets({ markets, title = "OUR MARKETS" }: FooterMarketsProps) {
    const [marketsExpanded, setMarketsExpanded] = useState(false);

    if (markets.length === 0) return null;

    return (
        <div className="border-t border-white/20 py-8 mb-8">
            <button
                onClick={() => setMarketsExpanded(!marketsExpanded)}
                className="flex items-center gap-3 text-sm tracking-widest uppercase hover:opacity-80 transition-opacity"
            >
                <span className="text-2xl">{marketsExpanded ? '−' : '+'}</span>
                {title}
            </button>
            {marketsExpanded && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
                    {markets.map((market) => (
                        market.url.startsWith('http') ? (
                            <a
                                key={market.id}
                                href={market.url}
                                target={market.opens_in_new_tab ? '_blank' : undefined}
                                rel={market.opens_in_new_tab ? 'noopener noreferrer' : undefined}
                                className="hover:opacity-80 transition-opacity uppercase tracking-wider"
                            >
                                {market.label}
                            </a>
                        ) : (
                            <Link
                                key={market.id}
                                href={market.url}
                                className="hover:opacity-80 transition-opacity uppercase tracking-wider"
                            >
                                {market.label}
                            </Link>
                        )
                    ))}
                </div>
            )}
        </div>
    );
}

