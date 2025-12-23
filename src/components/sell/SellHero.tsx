'use client';

export default function SellHero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://res.cloudinary.com/dk92v0fkk/image/upload/v1727313545/staging/if0tunyrf2dsgrf6eeec.webp"
                    alt="Luxury Property with Pool"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center text-white max-w-5xl">
                <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-8 block opacity-90">
                    SELL WITH US
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-sans font-light tracking-[0.05em] uppercase leading-[1.2] mb-8">
                    WE LEAD IN THE MOST HIGHLY <br className="hidden md:block" /> COVETED LUXURY MARKETS
                </h1>
                <p className="text-lg md:text-xl font-light max-w-2xl mx-auto opacity-90">
                    Our agents are local experts, record breakers, and trusted advocates for you.
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-white z-20">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase block mb-4">
                    SCROLL TO DISCOVER
                </span>
                <div className="w-[1px] h-16 bg-white mx-auto animate-pulse" />
            </div>
        </section>
    );
}
