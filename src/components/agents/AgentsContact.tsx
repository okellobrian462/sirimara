'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AgentsContact() {
    return (
        <section className="bg-[#181728] py-20 md:py-32 px-6 text-white">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl md:text-5xl font-sans font-light tracking-[0.1em] uppercase mb-12 text-center">
                    MAKE YOUR NEXT MOVE
                </h2>

                <div className="flex justify-center gap-12 mb-16 text-sm tracking-[0.2em] font-bold uppercase">
                    <a href="tel:18003554626" className="hover:opacity-70 transition-opacity">
                        800.ELLIMAN
                    </a>
                    <a href="mailto:info@elliman.com" className="hover:opacity-70 transition-opacity">
                        info@elliman.com
                    </a>
                </div>

                <form className="space-y-8">
                    {/* Name Row */}
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
                                placeholder="Last Name"
                                className="w-full bg-transparent border-b border-gray-600 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                    </div>

                    {/* Email/Phone Row */}
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

                    {/* Message */}
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Message (optional)"
                            className="w-full bg-transparent border-b border-gray-600 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
                        />
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-start gap-4 pt-4">
                        <input
                            type="checkbox"
                            id="sms-consent"
                            className="mt-1 w-4 h-4 rounded border-gray-600 bg-transparent"
                        />
                        <label htmlFor="sms-consent" className="text-xs text-gray-400 leading-relaxed">
                            By checking this box, you consent to receive sms/text messages from Douglas Elliman Real Estate. Reply STOP to opt-out anytime. <Link href="/privacy-policy" className="underline hover:text-white">Privacy Policy</Link>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center pt-8">
                        <button
                            type="submit"
                            className="px-12 py-4 bg-white text-[#181728] rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-100 transition-colors"
                        >
                            Connect Now
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
