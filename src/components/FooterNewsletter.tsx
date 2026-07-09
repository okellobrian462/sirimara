'use client';

import { useState } from 'react';
import { subscribeToNewsletter } from '@/app/actions/subscribe';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

interface FooterNewsletterProps {
    title?: string;
}

export default function FooterNewsletter({ title = "Keep up to date with Sirimara Realty" }: FooterNewsletterProps) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setMessage(null);

        try {
            const result = await subscribeToNewsletter(formData);
            setMessage({
                text: result.message || result.error || 'Something went wrong',
                isError: !result.success
            });
            
            if (result.success) {
                
                const form = document.getElementById('footer-newsletter-form') as HTMLFormElement;
                if (form) form.reset();
            }
        } catch (error) {
            setMessage({ text: 'Failed to subscribe. Please try again.', isError: true });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-[#1A202C] p-8 md:p-10 h-full flex flex-col justify-center">
            <h3 className="text-white text-2xl md:text-3xl font-serif italic mb-8 max-w-[280px] leading-snug">
                {title}
            </h3>

            {message && message.text && !message.isError && (
                <div className="flex items-center gap-2 text-green-400 text-sm mb-6 bg-green-500/10 p-3 rounded">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{message.text}</span>
                </div>
            )}

            <form id="footer-newsletter-form" action={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                    className="bg-transparent border-b border-white/30 text-white placeholder:text-gray-400 focus:outline-none focus:border-brand-primary py-2 rounded-none transition-colors"
                    disabled={loading || (message?.text !== undefined && !message?.isError)}
                />

                {message?.isError && (
                    <p className="text-red-400 text-xs mt-1">{message.text}</p>
                )}

                <button
                    type="submit"
                    disabled={loading || (message?.text !== undefined && !message?.isError)}
                    className="flex items-center gap-2 text-brand-primary font-bold text-xs tracking-[0.2em] uppercase mt-4 hover:opacity-80 transition-opacity w-fit group disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            SIGNING UP...
                        </>
                    ) : message?.text && !message?.isError ? (
                        'SUBSCRIBED'
                    ) : (
                        <>
                            SIGN UP
                            <ArrowRight className="w-4 h-4 mt-[1px] group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
