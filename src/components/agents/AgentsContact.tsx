'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSiteConfig } from '@/context/SiteConfigContext';

export default function AgentsContact() {
    const config = useSiteConfig();
    const siteName = config.company_name || 'Sirimara';

    const contactPhone = config.phone || '800.ELLIMAN';
    const contactEmail = config.email || 'info@sirimara.com';

    return (
        <section className="bg-brand-dark py-20 md:py-32 px-6 text-white">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl md:text-5xl font-sans font-light tracking-[0.1em] uppercase mb-12 text-center">
                    MAKE YOUR NEXT MOVE
                </h2>

                <div className="flex justify-center gap-12 mb-16 text-sm tracking-[0.2em] font-bold uppercase">
                    <a href={`tel:${contactPhone.replace(/[^0-9]/g, '')}`} className="hover:opacity-70 transition-opacity">
                        {contactPhone}
                    </a>
                    <a href={`mailto:${contactEmail.toLowerCase()}`} className="hover:opacity-70 transition-opacity">
                        {contactEmail}
                    </a>
                </div>

                <form className="space-y-8">
                    { }
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-full bg-transparent border-b border-gray-600 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Last Name (optional)"
                                className="w-full bg-transparent border-b border-gray-600 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                    </div>

                    { }
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-transparent border-b border-gray-600 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                        <div className="relative group">
                            <input
                                type="tel"
                                placeholder="Phone (optional)"
                                className="w-full bg-transparent border-b border-gray-600 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                    </div>

                    { }
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Message (mandatory)"
                            className="w-full bg-transparent border-b border-gray-600 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
                        />
                    </div>

                    { }
                    <div className="flex items-start gap-4 pt-4">
                        <input
                            type="checkbox"
                            id="sms-consent"
                            className="mt-1 w-4 h-4 rounded border-gray-600 bg-transparent"
                        />
                        <label htmlFor="sms-consent" className="text-xs text-gray-400 leading-relaxed">
                            By checking this box, you consent to receive sms/text messages from {siteName}. <Link href="/privacy-policy" className="underline hover:text-white">Privacy Policy</Link>
                        </label>

                    </div>

                    { }
                    <div className="text-center pt-8">
                        <button
                            type="submit"
                            className="px-12 py-4 bg-white text-brand-dark rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-100 transition-colors"
                        >
                            Connect Now
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
