'use client';

import { Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { submitForm } from '@/app/actions/contact';
import { useSiteConfig } from '@/context/SiteConfigContext';


export default function ValuationForm() {
    const config = useSiteConfig();
    const siteName = config.company_name || 'Sirimara';

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const formData = new FormData(e.currentTarget);
        const data = {
            address: formData.get('address'),
            unit: formData.get('unit'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            details: formData.get('details'),
            consent: formData.get('consent') === 'on'
        };

        const result = await submitForm('valuation', data);

        setIsSubmitting(false);
        if (result.success) {
            setSubmitStatus('success');
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setSubmitStatus('error');
        }
    };

    if (submitStatus === 'success') {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-serif text-[#181728] mb-4">Request Received</h4>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Thank you for your interest. One of our experts will review your property details and contact you shortly with a comprehensive market analysis.
                </p>
                <Link href="/" className="inline-block px-8 py-3 bg-[#100B28] text-white uppercase text-xs tracking-widest rounded-full hover:bg-opacity-90 transition-all">
                    Return Home
                </Link>
            </div>
        );
    }

    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
                <h4 className="text-xl font-serif text-[#181728] mb-6">Property Details</h4>
                <div className="space-y-6">
                    <div className="border-b border-gray-300 py-2">
                        <input
                            name="address"
                            type="text"
                            placeholder="Property Address"
                            className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-[#181728] p-0 outline-none"
                            required
                        />
                    </div>
                    <div className="border-b border-gray-300 py-2">
                        <input
                            name="unit"
                            type="text"
                            placeholder="Unit / Apt (Optional)"
                            className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-[#181728] p-0 outline-none"
                        />
                    </div>
                </div>
            </div>

            <div>
                <h4 className="text-xl font-serif text-[#181728] mb-6">Contact Information</h4>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border-b border-gray-300 py-2">
                            <input
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-[#181728] p-0 outline-none"
                                required
                            />
                        </div>
                        <div className="border-b border-gray-300 py-2">
                            <input
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-[#181728] p-0 outline-none"
                                required
                            />
                        </div>
                    </div>
                    <div className="border-b border-gray-300 py-2">
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-[#181728] p-0 outline-none"
                            required
                        />
                    </div>
                    <div className="border-b border-gray-300 py-2">
                        <input
                            name="phone"
                            type="tel"
                            placeholder="Phone"
                            className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-[#181728] p-0 outline-none"
                        />
                    </div>
                    <div className="border-b border-gray-300 py-2">
                        <textarea
                            name="details"
                            placeholder="Additional Details (Optional)"
                            rows={3}
                            className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-[#181728] p-0 outline-none resize-none"
                        />
                    </div>
                </div>
            </div>

            <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative flex items-center justify-center shrink-0 mt-1">
                    <input name="consent" type="checkbox" className="peer w-5 h-5 border border-gray-300 rounded-sm checked:bg-[#181728] checked:border-[#181728] appearance-none transition-colors" defaultChecked />
                    <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                    By checking this box, you consent to receive sms/text messages from {siteName}. Reply STOP to opt-out anytime. <Link href="/privacy-policy" className="underline hover:text-[#181728]">Privacy Policy</Link>
                </p>

            </label>

            <button
                disabled={isSubmitting}
                className="w-full py-4 bg-[#100B28] text-white hover:bg-[#100B28]/90 transition-colors uppercase text-sm tracking-widest rounded-full flex items-center justify-center gap-2 disabled:opacity-70"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                    </>
                ) : 'Submit Request'}
            </button>
            {submitStatus === 'error' && (
                <p className="text-red-500 text-xs text-center">Something went wrong. Please try again.</p>
            )}
        </form>
    );
}
