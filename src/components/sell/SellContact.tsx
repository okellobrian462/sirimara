'use client';
import Link from 'next/link';

export default function SellContact() {
    return (
        <section className="bg-[#181728] text-white py-24 md:py-32 px-6">
            <div className="container mx-auto max-w-4xl text-center">
                <h2 className="text-3xl md:text-5xl font-sans font-light tracking-[0.1em] uppercase mb-16">
                    SELL WITH US
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-20 text-sm font-bold tracking-[0.2em] uppercase">
                    <a href="tel:18003554686" className="hover:opacity-70 transition-opacity">
                        800.ELLIMAN
                    </a>
                    <span className="hidden md:block w-2 h-2 bg-white/20 rounded-full" />
                    <a href="mailto:info@elliman.com" className="hover:opacity-70 transition-opacity">
                        INFO@ELLIMAN.COM
                    </a>
                </div>

                <form className="space-y-8 max-w-3xl mx-auto text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-full bg-black/20 border-b border-white/20 py-4 px-0 outline-none focus:border-white transition-colors placeholder:text-gray-500 uppercase text-xs tracking-widest font-bold"
                            />
                        </div>
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-full bg-black/20 border-b border-white/20 py-4 px-0 outline-none focus:border-white transition-colors placeholder:text-gray-500 uppercase text-xs tracking-widest font-bold"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-black/20 border-b border-white/20 py-4 px-0 outline-none focus:border-white transition-colors placeholder:text-gray-500 uppercase text-xs tracking-widest font-bold"
                            />
                        </div>
                        <div className="relative group">
                            <input
                                type="tel"
                                placeholder="Phone (optional)"
                                className="w-full bg-black/20 border-b border-white/20 py-4 px-0 outline-none focus:border-white transition-colors placeholder:text-gray-500 uppercase text-xs tracking-widest font-bold"
                            />
                        </div>
                    </div>

                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Message (optional)"
                            className="w-full bg-black/20 border-b border-white/20 py-4 px-0 outline-none focus:border-white transition-colors placeholder:text-gray-500 uppercase text-xs tracking-widest font-bold"
                        />
                    </div>

                    <div className="pt-8">
                        <label className="flex items-start gap-4 cursor-pointer group">
                            <div className="relative mt-1">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                />
                                <div className="w-5 h-5 border border-white/20 peer-checked:bg-white peer-checked:border-white transition-all rounded-sm flex items-center justify-center">
                                    <div className="w-2 h-2 bg-[#181728] opacity-0 peer-checked:opacity-100" />
                                </div>
                            </div>
                            <span className="text-[10px] md:text-xs text-gray-400 leading-relaxed uppercase tracking-widest font-bold">
                                By checking this box, you consent to receive sms/text messages from Douglas Elliman Real Estate. Reply STOP to opt-out anytime.
                                <Link href="/privacy-policy" className="ml-2 text-white underline hover:opacity-70 transition-opacity">Privacy Policy</Link>
                            </span>
                        </label>
                    </div>

                    <div className="text-center pt-12">
                        <button className="px-16 py-4 bg-white text-[#181728] rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-opacity-90 transition-opacity">
                            Connect now
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
