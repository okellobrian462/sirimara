import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
    HeroSection,
    SubNav,
    StatsSection,
    DevelopmentsGrid,
    ServicesSection
} from '@/components/new-development';

export const metadata = {
    title: 'New Development | Douglas Elliman',
    description: 'Discover the world’s most inspired new developments with Douglas Elliman.'
};

export default function NewDevelopmentPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header theme="light" />

            <main>
                <HeroSection />
                <SubNav />
                <StatsSection />
                <DevelopmentsGrid />
                <ServicesSection />

                {/* Branding Section (Logo wall - placeholder implementation) */}
                <section className="bg-[#F8F8F8] py-24 border-t border-gray-100">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-2xl md:text-4xl font-light tracking-tight text-[#181728] mb-12 uppercase italic">
                            we are the choice of world-renowned brands
                        </h2>
                        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                            {/* Content would go here, using provided logo wall image if available */}
                            <img src="http://res.cloudinary.com/daeyhsq50/image/upload/v1710268136/notmplnhap56ym7pmg3r.png" alt="Brand Portfolio" className="max-w-4xl w-full" />
                        </div>
                    </div>
                </section>

                {/* Connection Section */}
                <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
                    <img
                        src="https://res.cloudinary.com/dk92v0fkk/image/upload/v1738276626/production/etdoehyo0ymrtjxgxwho.jpg"
                        alt="Contact Us"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 text-center px-6">
                        <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8 uppercase">
                            START A CONVERSATION
                        </h2>
                        <p className="text-lg md:text-xl font-light mb-12 opacity-90 max-w-xl mx-auto">
                            Let our expert team guide you through the future of luxury living.
                        </p>
                        <div className="flex flex-col md:flex-row justify-center gap-6">
                            <a
                                href="mailto:dedm@elliman.com"
                                className="bg-white text-[#181728] text-xs font-bold tracking-[0.2em] py-5 px-10 rounded-full hover:bg-gray-100 transition-colors uppercase"
                            >
                                CONTACT US
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
