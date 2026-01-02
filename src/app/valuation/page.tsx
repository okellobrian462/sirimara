import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Check } from 'lucide-react';

export const metadata = {
    title: 'Request a Home Valuation | Douglas Elliman',
    description: 'Get a complimentary market analysis of your property from Douglas Elliman experts.',
}

export default function ValuationPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            <div className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-2xl">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-5xl font-light tracking-widest mb-4 uppercase font-serif">
                            Request a Valuation
                        </h1>
                        <p className="text-gray-500 font-light">
                            Discover what your property is worth with a complimentary market analysis from our experts.
                        </p>
                    </div>

                    <form className="space-y-8">
                        <div>
                            <h4 className="text-xl font-serif text-[#181728] mb-6">Property Details</h4>
                            <div className="space-y-6">
                                <div className="border-b border-gray-300 py-2">
                                    <input
                                        type="text"
                                        placeholder="Property Address"
                                        className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-[#181728] p-0 outline-none"
                                        required
                                    />
                                </div>
                                <div className="border-b border-gray-300 py-2">
                                    <input
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
                                            type="text"
                                            placeholder="First Name"
                                            className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-[#181728] p-0 outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="border-b border-gray-300 py-2">
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-[#181728] p-0 outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="border-b border-gray-300 py-2">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-[#181728] p-0 outline-none"
                                        required
                                    />
                                </div>
                                <div className="border-b border-gray-300 py-2">
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-[#181728] p-0 outline-none"
                                    />
                                </div>
                                <div className="border-b border-gray-300 py-2">
                                    <textarea
                                        placeholder="Additional Details (Optional)"
                                        rows={3}
                                        className="w-full border-none focus:ring-0 text-sm placeholder:text-gray-400 text-[#181728] p-0 outline-none resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <label className="flex items-start gap-4 cursor-pointer group">
                            <div className="relative flex items-center justify-center shrink-0 mt-1">
                                <input type="checkbox" className="peer w-5 h-5 border border-gray-300 rounded-sm checked:bg-[#181728] checked:border-[#181728] appearance-none transition-colors" defaultChecked />
                                <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                By checking this box, you consent to receive sms/text messages from Douglas Elliman Real Estate. Reply STOP to opt-out anytime. <a href="#" className="underline hover:text-[#181728]">Privacy Policy</a>
                            </p>
                        </label>

                        <button className="w-full py-4 bg-[#100B28] text-white hover:bg-[#100B28]/90 transition-colors uppercase text-sm tracking-widest rounded-full">
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </main>
    );
}
