'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function CookieConsent() {
    const [showCookieConsent, setShowCookieConsent] = useState(true);

    if (!showCookieConsent) return null;

    return (
        <div className="fixed bottom-8 right-8 bg-white p-8 shadow-2xl max-w-md z-50 rounded-sm">
            <button
                onClick={() => setShowCookieConsent(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
                <X className="w-5 h-5" />
            </button>
            <p className="text-sm text-gray-700 mb-4 pr-6">
                This website utilizes technologies such as cookies to enable essential site functionality,
                as well as for analytics, personalization, and targeted advertising.
            </p>
            <a href="#" className="text-sm font-medium underline mb-6 block">
                Privacy Policy
            </a>
            <div className="space-y-3">
                <button
                    onClick={() => setShowCookieConsent(false)}
                    className="w-full py-3 border-2 border-gray-900 rounded-full text-sm tracking-wider uppercase hover:bg-gray-900 hover:text-white transition-colors"
                >
                    Accept
                </button>
                <button
                    onClick={() => setShowCookieConsent(false)}
                    className="w-full py-3 border-2 border-gray-900 rounded-full text-sm tracking-wider uppercase hover:bg-gray-900 hover:text-white transition-colors"
                >
                    Deny Non-Essential
                </button>
                <button
                    onClick={() => setShowCookieConsent(false)}
                    className="w-full py-3 border-2 border-gray-900 rounded-full text-sm tracking-wider uppercase hover:bg-gray-900 hover:text-white transition-colors"
                >
                    Manage Preferences
                </button>
            </div>
        </div>
    );
}
