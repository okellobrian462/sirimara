'use client';

import { X, Check, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getContactConfig } from '@/app/actions/config';
import { submitForm } from '@/app/actions/contact';
import { useSiteConfig } from '@/context/SiteConfigContext';

interface ConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
    const config = useSiteConfig();
    const siteName = config.company_name || 'Sirimara';

    const [isVisible, setIsVisible] = useState(false);
    const [contactConfig, setContactConfig] = useState({ phone: '1-800-SIRIMARA', email: 'INFO@SIRIMARA.COM' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';

            getContactConfig().then(data => {
                setContactConfig({
                    phone: data.phone || '1-800-SIRIMARA',
                    email: (data.email || 'INFO@SIRIMARA.COM').toUpperCase()
                });
            });

        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);
                setSubmitStatus('idle');
            }, 500);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
            consent: formData.get('consent') === 'on'
        };

        const result = await submitForm('contact', data);

        setIsSubmitting(false);
        if (result.success) {
            setSubmitStatus('success');


        } else {
            setSubmitStatus('error');
        }
    };

    if (!isVisible && !isOpen) return null;

    return (
        <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            { }
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            { }
            <div
                className={`relative w-full md:w-[500px] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                { }
                <div className="relative flex items-center justify-center p-6 border-b border-gray-100">
                    <h2 className="text-sm tracking-[0.2em] uppercase font-medium text-brand-dark">Contact Us</h2>
                    <button
                        onClick={onClose}
                        className="absolute right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-brand-dark" />
                    </button>
                </div>

                { }
                <div className="flex-1 overflow-y-auto p-8">
                    { }
                    <div className="flex items-start gap-6 mb-12">
                        <div className="w-20 h-20 rounded-full border border-gray-200 p-2 flex items-center justify-center shrink-0">
                            <span className="text-3xl font-serif text-gray-300">SM</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-serif text-brand-dark mb-2">{siteName}</h3>
                            <div className="space-y-1">
                                <a href={`tel:${contactConfig.phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-2 text-xs tracking-widest uppercase hover:opacity-70 transition-opacity text-gray-600">
                                    <span className="w-4"><i className="fas fa-phone"></i></span>
                                    {contactConfig.phone}
                                </a>
                                <a href={`mailto:${contactConfig.email.toLowerCase()}`} className="flex items-center gap-2 text-xs tracking-widest uppercase hover:opacity-70 transition-opacity text-gray-600">
                                    <span className="w-4"><i className="fas fa-envelope"></i></span>
                                    {contactConfig.email}
                                </a>
                            </div>
                        </div>

                    </div>

                    { }
                    {submitStatus === 'success' ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-8 h-8" />
                            </div>
                            <h4 className="text-2xl font-serif text-brand-dark mb-4">Message Sent</h4>
                            <p className="text-gray-500 mb-8">Thank you for contacting us. We will get back to you shortly.</p>
                            <button onClick={onClose} className="px-8 py-3 bg-[#100B28] text-white uppercase text-xs tracking-widest rounded-full hover:bg-opacity-90 transition-all">
                                Close
                            </button>
                        </div>
                    ) : (
                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div>
                                <h4 className="text-2xl font-serif text-brand-dark mb-8">Send a message</h4>

                                <div className="space-y-6">
                                    <div className="border-b border-gray-300 py-2">
                                        <input
                                            name="firstName"
                                            type="text"
                                            placeholder="First Name"
                                            className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-brand-dark p-0"
                                            required
                                        />
                                    </div>
                                    <div className="border-b border-gray-300 py-2">
                                        <input
                                            name="lastName"
                                            type="text"
                                            placeholder="Last Name (optional)"
                                            className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-brand-dark p-0"
                                            required
                                        />
                                    </div>
                                    <div className="border-b border-gray-300 py-2">
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="Email"
                                            className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-brand-dark p-0"
                                            required
                                        />
                                    </div>
                                    <div className="border-b border-gray-300 py-2">
                                        <input
                                            name="phone"
                                            type="tel"
                                            placeholder="Phone (optional)"
                                            className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-brand-dark p-0"
                                        />
                                    </div>
                                    <div className="border-b border-gray-300 py-2">
                                        <input
                                            name="message"
                                            type="text"
                                            placeholder="Message (mandatory)"
                                            className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-brand-dark p-0"
                                        />
                                    </div>
                                </div>
                            </div>

                            { }
                            <label className="flex items-start gap-4 cursor-pointer group">
                                <div className="relative flex items-center justify-center shrink-0">
                                    <input name="consent" type="checkbox" className="peer w-5 h-5 border border-gray-300 rounded-sm checked:bg-brand-dark checked:border-brand-dark appearance-none transition-colors" defaultChecked />
                                    <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    By checking this box, you consent to receive sms/text messages from {siteName}. <Link href="/privacy-policy" className="underline hover:text-brand-dark">Privacy Policy</Link>
                                </p>

                            </label>

                            { }
                            <button
                                disabled={isSubmitting}
                                className="w-full py-4 bg-[#100B28] text-white hover:bg-[#100B28]/90 transition-colors uppercase text-sm tracking-widest rounded-full flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : 'Submit'}
                            </button>
                            {submitStatus === 'error' && (
                                <p className="text-red-500 text-xs text-center">Something went wrong. Please try again.</p>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
