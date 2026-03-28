'use client';

import { useState } from 'react';

interface Feature {
    id: string;
    name: string;
}

interface ExpandableFeaturesListProps {
    features: Feature[];
    initialLimit?: number;
}

export default function ExpandableFeaturesList({ features, initialLimit = 6 }: ExpandableFeaturesListProps) {
    const [expanded, setExpanded] = useState(false);

    if (!features || features.length === 0) {
        return <p className="text-gray-500 text-[15px]">No specific amenities listed.</p>;
    }

    const hasMore = features.length > initialLimit;
    const displayFeatures = expanded ? features : features.slice(0, initialLimit);

    return (
        <div className="space-y-4 text-[#333333] tracking-[0.02em] text-[15px]">
            {displayFeatures.map(feature => (
                <p key={feature.id}>{feature.name}</p>
            ))}
            
            {hasMore && (
                <button 
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-2 pt-2 text-[13px] font-medium tracking-[0.1em] text-brand-dark uppercase hover:opacity-70 transition-opacity"
                >
                    <span className="text-[16px] font-light leading-none">{expanded ? '-' : '+'}</span>
                    {expanded ? 'SEE LESS' : 'SEE MORE'}
                </button>
            )}
        </div>
    );
}
