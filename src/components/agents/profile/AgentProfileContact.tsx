'use client';
import Link from 'next/link';
import { Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { submitForm } from '@/app/actions/contact';
import { useSiteConfig } from '@/context/SiteConfigContext';

interface AgentProfileContactProps {
    name: string;
}

export default function AgentProfileContact({ name }: AgentProfileContactProps) {
    const config = useSiteConfig();
    const siteName = config.company_name || 'Sirimara';
    const platformName = config.platform_name || 'Sirimara';
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const formData = new FormData(e.currentTarget);
        const result = await submitForm('contact', {
            source: 'agent_profile',
            agentName: name,
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
            marketingConsent: formData.get('marketingConsent') === 'on',
            consent: formData.get('smsConsent') === 'on'
        });

        setIsSubmitting(false);

        if (result.success) {
            setSubmitStatus('success');
            e.currentTarget.reset();
        } else {
            setSubmitStatus('error');
        }
    };

    return (
        <section className="bg-[#FAF9F5] py-20 md:py-32 px-6">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-sans font-light tracking-[0.1em] uppercase mb-16 text-center text-brand-dark">
                    Start a Conversation with {name.split(' ')[0]}
                </h2>

                {submitStatus === 'success' && (
                    <div className="mb-8 rounded-md border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700 flex items-center justify-center gap-2">
                        <Check className="h-4 w-4" />
                        Thank you. Your message has been sent.
                    </div>
                )}

                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative group">
                            <input
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                className="w-full bg-transparent border-b border-gray-300 py-4 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-dark transition-colors"
                                required
                            />
                        </div>
                        <div className="relative group">
                            <input
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                className="w-full bg-transparent border-b border-gray-300 py-4 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-dark transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative group">
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                className="w-full bg-transparent border-b border-gray-300 py-4 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-dark transition-colors"
                                required
                            />
                        </div>
                        <div className="relative group">
                            <input
                                name="phone"
                                type="tel"
                                placeholder="Phone (optional)"
                                className="w-full bg-transparent border-b border-gray-300 py-4 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-dark transition-colors"
                            />
                        </div>
                    </div>

                    <div className="relative group">
                        <textarea
                            name="message"
                            placeholder="Message (optional)"
                            className="w-full bg-transparent border-b border-gray-300 py-4 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-dark transition-colors resize-none h-32"
                        ></textarea>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <input
                                name="marketingConsent"
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
                                name="smsConsent"
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
                            disabled={isSubmitting}
                            className="px-12 py-4 bg-brand-dark text-white rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-opacity-90 transition-opacity disabled:opacity-70 inline-flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : 'Submit'}
                        </button>
                        {submitStatus === 'error' && (
                            <p className="mt-4 text-sm text-red-600">Something went wrong. Please try again.</p>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
}
