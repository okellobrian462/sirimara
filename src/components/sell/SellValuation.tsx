import { useSiteConfig } from '@/context/SiteConfigContext';

export default function SellValuation() {
    const config = useSiteConfig();
    const siteName = config.company_name || 'Sirimara';
    return (
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://res.cloudinary.com/dk92v0fkk/image/upload/v1720625904/staging/sqpw1fppqlcf6cokh69b.webp"
                    alt="Luxury Interior"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 text-center text-white p-6 max-w-4xl">
                <h2 className="text-3xl md:text-5xl font-sans font-light tracking-[0.1em] uppercase mb-8">
                    What is your home worth?
                </h2>
                <p className="text-lg md:text-xl font-light mb-12 opacity-90">
                    Get an initial in-depth market analysis of your home to start a conversation.
                </p>
                <a
                    href="https://homevaluation.sirimara.com/Sirimara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-12 py-4 bg-white text-[#181728] rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-opacity-90 transition-opacity"
                >
                    Get Started
                </a>
            </div>
        </section>
    );
}
