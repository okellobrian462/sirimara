'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { Play } from 'lucide-react';

export default function About() {
    return (
        <div className="min-h-screen bg-[#181728]">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[80vh] md:h-screen flex items-center justify-center overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="https://res.cloudinary.com/dk92v0fkk/video/upload/v1719863494/staging/wn5vuskal80l65an2app.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 text-center text-white px-6">
                    <p className="text-sm tracking-[0.2em] uppercase mb-8 font-medium">About Us</p>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] mb-12 uppercase max-w-4xl mx-auto leading-tight font-light">
                        We Are The Ultimate Destination<br />For Luxury Real Estate
                    </h1>
                    <div className="w-px h-12 bg-white mx-auto mb-8" />
                    <p className="text-xs tracking-[0.2em] uppercase">Scroll to Discover</p>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 md:py-32 bg-[#181728]">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center mb-20">
                        <p className="text-xl md:text-3xl font-light leading-relaxed text-white border-b pb-12 border-white/20">
                            Our legacy is built on a proven track record of exceptional service and unmatched global reach.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div>
                            <h3 className="text-5xl md:text-7xl font-light mb-4 text-white">$36.4B</h3>
                            <p className="text-sm tracking-widest uppercase text-white/60">In Sales</p>
                        </div>
                        <div>
                            <h3 className="text-5xl md:text-7xl font-light mb-4 text-white">$87B</h3>
                            <p className="text-sm tracking-widest uppercase text-white/60">In New Development</p>
                        </div>
                        <div>
                            <h3 className="text-5xl md:text-7xl font-light mb-4 text-white">6.6K</h3>
                            <p className="text-sm tracking-widest uppercase text-white/60">Agents in Key Luxury Markets</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Intro Section */}
            <section className="py-20 px-6 bg-[#181728]">
                <div className="container mx-auto max-w-5xl text-center">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-wide mb-8 uppercase font-light text-white">
                        We Are Guided by a Legacy of Thought Leaders
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed">
                        Their voices mentor and support the next generation of trailblazers and culture makers.
                    </p>
                    <a href="/leadership" className="inline-block px-8 py-4 border border-white rounded-full text-xs tracking-widest uppercase text-white hover:bg-white hover:text-[#181728] transition-colors">
                        Meet Our Leadership
                    </a>
                </div>
            </section>

            {/* Leadership Image Section */}
            <section className="relative w-full aspect-[4/3] md:aspect-[16/9]">
                <img
                    src="https://res.cloudinary.com/dk92v0fkk/image/upload/v1740173304/production/z1bfssrmigigijef52uj.jpg"
                    alt="Michael S. Liebowitz"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 text-white bg-black/50 p-4 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none md:p-0">
                    <p className="text-xs tracking-widest uppercase">
                        Michael S. Liebowitz, President and Chief Executive Officer, Douglas Elliman Inc.
                    </p>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-24 px-6 bg-[#181728] text-white text-center">
                <div className="container mx-auto max-w-4xl">
                    <div className="mb-12 relative">
                        <span className="text-6xl text-white/20 absolute -top-8 left-0 font-serif">“</span>
                        <h3 className="text-2xl md:text-3xl font-serif italic leading-relaxed px-8">
                            We are number one in the luxury markets we serve because we understand the high-net-worth mindset and we are where our clients want to be.
                        </h3>
                        <span className="text-6xl text-white/20 absolute -bottom-12 right-0 font-serif">”</span>
                    </div>
                    <div>
                        <p className="text-lg tracking-widest uppercase mb-2">Michael S. Liebowitz</p>
                        <p className="text-xs text-white/60 uppercase tracking-wider">President and Chief Executive Officer, Douglas Elliman Inc.</p>
                    </div>
                </div>
            </section>

            {/* Recruitment Banner */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <img
                    src="https://res.cloudinary.com/dk92v0fkk/image/upload/v1744044938/production/vcmrnoboeb2zlhcsj4b4.jpg"
                    alt="Agents"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-light tracking-widest mb-6 uppercase">
                        We Invest in Agents Who Challenge The Status Quo
                    </h2>
                    <p className="text-xl mb-12">And we make sure our world knows it.</p>
                    <a href="/recruitment" className="inline-block px-8 py-4 border-2 border-white rounded-full text-sm tracking-widest hover:bg-white hover:text-gray-900 transition-colors uppercase">
                        Join Us
                    </a>
                </div>
            </section>

            {/* Featured Cities / Market Makers Banner */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="https://res.cloudinary.com/dk92v0fkk/video/upload/v1720562562/staging/ekzk69kr8vx6vkirtnph.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-light tracking-widest mb-6 uppercase">
                        We Are Market Makers
                    </h2>
                    <p className="text-xl mb-12">We focus our expertise on the places that inspire and shape the future.</p>
                    <a href="/featured-cities" className="inline-block px-8 py-4 border-2 border-white rounded-full text-sm tracking-widest hover:bg-white hover:text-gray-900 transition-colors uppercase">
                        Explore Our Featured Cities
                    </a>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-32 px-6 bg-[#181728] text-center">
                <div className="container mx-auto">
                    <h2 className="text-5xl md:text-7xl font-light tracking-widest mb-6 uppercase text-white">
                        Ready to Connect?
                    </h2>
                    <p className="text-xl text-gray-300 mb-12">Let our exceptional team guide you.</p>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <a href="tel:1-800-ELLIMAN" className="px-10 py-4 border border-white rounded-full text-sm tracking-widest uppercase text-white hover:bg-white hover:text-[#181728] transition-colors">
                            Call 1.800.ELLIMAN
                        </a>
                        <a href="mailto:info@elliman.com" className="px-10 py-4 border border-white rounded-full text-sm tracking-widest uppercase text-white hover:bg-white hover:text-[#181728] transition-colors">
                            info@elliman.com
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
            <CookieConsent />
        </div>
    );
}
