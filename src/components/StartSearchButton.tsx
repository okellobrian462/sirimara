'use client';

import { useSearch } from '@/context/SearchContext';
import { ChevronDown } from 'lucide-react';

interface StartSearchButtonProps {
    text: string;
}

export default function StartSearchButton({ text }: StartSearchButtonProps) {
    const { setIsSearchOpen } = useSearch();

    return (
        <button
            onClick={() => setIsSearchOpen(true)}
            className="mx-auto px-8 py-4 border-2 border-white rounded-full text-base hover:bg-white hover:text-gray-900 transition-colors uppercase flex items-center justify-center gap-3"
        >
            {text}
            <ChevronDown className="w-4 h-4" />
        </button>
    );
}
