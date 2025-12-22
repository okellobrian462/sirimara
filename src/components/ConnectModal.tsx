'use client';

import { X, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 500); // Wait for animation
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drone/Drawer */}
            <div
                className={`relative w-full md:w-[500px] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                {/* Header */}
                <div className="relative flex items-center justify-center p-6 border-b border-gray-100">
                    <h2 className="text-sm tracking-[0.2em] uppercase font-medium text-[#181728]">Connect</h2>
                    <button
                        onClick={onClose}
                        className="absolute right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-[#181728]" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    {/* Agent Info */}
                    <div className="flex items-start gap-6 mb-12">
                        <div className="w-20 h-20 rounded-full border border-gray-200 p-2 flex items-center justify-center shrink-0">
                            <span className="text-3xl font-serif text-gray-300">DE</span>
                            {/* Placeholder for logo if image fails/missing */}
                        </div>
                        <div>
                            <h3 className="text-xl font-serif text-[#181728] mb-2">Douglas Elliman</h3>
                            <div className="space-y-1">
                                <a href="tel:8003554626" className="flex items-center gap-2 text-xs tracking-widest uppercase hover:opacity-70 transition-opacity text-gray-600">
                                    <span className="w-4"><i className="fas fa-phone"></i></span>
                                    800.ELLIMAN
                                </a>
                                <a href="mailto:info@elliman.com" className="flex items-center gap-2 text-xs tracking-widest uppercase hover:opacity-70 transition-opacity text-gray-600">
                                    <span className="w-4"><i className="fas fa-envelope"></i></span>
                                    INFO@ELLIMAN.COM
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <h4 className="text-2xl font-serif text-[#181728] mb-8">Send a message</h4>

                            <div className="space-y-6">
                                <div className="border-b border-gray-300 py-2">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-[#181728] p-0"
                                    />
                                </div>
                                <div className="border-b border-gray-300 py-2">
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-[#181728] p-0"
                                    />
                                </div>
                                <div className="border-b border-gray-300 py-2">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-[#181728] p-0"
                                    />
                                </div>
                                <div className="border-b border-gray-300 py-2">
                                    <input
                                        type="tel"
                                        placeholder="Phone (optional)"
                                        className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-[#181728] p-0"
                                    />
                                </div>
                                <div className="border-b border-gray-300 py-2">
                                    <input
                                        type="text"
                                        placeholder="Message (optional)"
                                        className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-[#181728] p-0"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Checkbox */}
                        <label className="flex items-start gap-4 cursor-pointer group">
                            <div className="relative flex items-center justify-center shrink-0">
                                <input type="checkbox" className="peer w-5 h-5 border border-gray-300 rounded-sm checked:bg-[#181728] checked:border-[#181728] appearance-none transition-colors" defaultChecked />
                                <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                By checking this box, you consent to receive sms/text messages from Douglas Elliman Real Estate. Reply STOP to opt-out anytime. <a href="#" className="underline hover:text-[#181728]">Privacy Policy</a>
                            </p>
                        </label>

                        {/* Submit */}
                        <button className="w-full py-4 bg-[#100B28] text-white hover:bg-[#100B28]/90 transition-colors uppercase text-sm tracking-widest rounded-full">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
