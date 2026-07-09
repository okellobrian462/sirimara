'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CookieConsent() {
    const [showCookieConsent, setShowCookieConsent] = useState(false);

    useEffect(() => {
        
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setShowCookieConsent(true);
        }
    }, []);

    const handleConsent = (status: 'accepted' | 'essential' | 'dismissed') => {
        localStorage.setItem('cookie-consent', status);
        setShowCookieConsent(false);
    };

    if (!showCookieConsent) return null;

    return (
        <div className="fixed bottom-8 right-8 bg-white p-8 shadow-2xl max-w-md z-50 rounded-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
                onClick={() => handleConsent('dismissed')}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
            >
                <X className="w-5 h-5" />
            </button>
            <p className="text-sm text-gray-700 mb-4 pr-6 leading-relaxed">
                This website utilizes technologies such as cookies to enable essential site functionality,
                as well as for analytics, personalization, and targeted advertising.
            </p>
            <a href="#" className="text-sm font-medium underline mb-6 block hover:text-gray-600 transition-colors">
                Privacy Policy
            </a>
            <div className="space-y-3">
                <button
                    onClick={() => handleConsent('accepted')}
                    className="w-full py-3 border-2 border-gray-900 rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-gray-900 hover:text-white transition-all active:scale-[0.98]"
                >
                    Accept
                </button>
                <button
                    onClick={() => handleConsent('essential')}
                    className="w-full py-3 border-2 border-gray-900 rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-gray-900 hover:text-white transition-all active:scale-[0.98]"
                >
                    Deny Non-Essential
                </button>
                <button
                    onClick={() => handleConsent('essential')} 
                    className="w-full py-3 border-2 border-gray-900 rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-gray-900 hover:text-white transition-all active:scale-[0.98]"
                >
                    Manage Preferences
                </button>
            </div>
        </div>
    );
}
