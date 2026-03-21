'use client';
import Link from 'next/link';
import { useSiteConfig } from '@/context/SiteConfigContext';

interface AgentProfileContactProps {
    name: string;
}

export default function AgentProfileContact({ name }: AgentProfileContactProps) {
    const config = useSiteConfig();
    const siteName = config.company_name || 'Sirimara';

    const platformName = config.platform_name || 'Sirimara';

    return (
        <section className="bg-[#FAF9F5] py-20 md:py-32 px-6">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-sans font-light tracking-[0.1em] uppercase mb-16 text-center text-brand-dark">
                    Start a Conversation with {name.split(' ')[0]}
                </h2>

                <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-full bg-transparent border-b border-gray-300 py-4 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-dark transition-colors"
                            />
                        </div>
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-full bg-transparent border-b border-gray-300 py-4 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-dark transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-transparent border-b border-gray-300 py-4 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-dark transition-colors"
                            />
                        </div>
                        <div className="relative group">
                            <input
                                type="tel"
                                placeholder="Phone (optional)"
                                className="w-full bg-transparent border-b border-gray-300 py-4 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-dark transition-colors"
                            />
                        </div>
                    </div>

                    <div className="relative group">
                        <textarea
                            placeholder="Message (optional)"
                            className="w-full bg-transparent border-b border-gray-300 py-4 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-dark transition-colors resize-none h-32"
                        ></textarea>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <input
                                type="checkbox"
                                id="marketing-consent"
                                className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-dark"
                            />
                            <label htmlFor="marketing-consent" className="text-xs text-gray-500 leading-relaxed">
                                Join {name.split(' ')[0]} on {platformName} – your personalized, AI-powered platform that unlocks the full potential of property search and collaboration.
                            </label>
                        </div>
                        <div className="flex items-start gap-4">
                            <input
                                type="checkbox"
                                id="sms-consent"
                                className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-dark"
                            />
                            <label htmlFor="sms-consent" className="text-xs text-gray-500 leading-relaxed">
                                By checking this box, you consent to receive sms/text messages from {siteName}. Reply STOP to opt-out anytime. <Link href="/privacy-policy" className="underline hover:text-brand-dark">Privacy Policy</Link>
                            </label>
                        </div>
                    </div>

                    <div className="text-center pt-8">
                        <button
                            type="submit"
                            className="px-12 py-4 bg-brand-dark text-white rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-opacity-90 transition-opacity"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
