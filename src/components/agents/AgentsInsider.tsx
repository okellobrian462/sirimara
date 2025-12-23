'use client';

export default function AgentsInsider() {
    return (
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://res.cloudinary.com/dk92v0fkk/image/upload/v1732739597/staging-test/bphx0i6ibnimc8pbhyek.webp"
                    alt="Elliman Insider"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center text-white max-w-4xl">
                <h2 className="text-4xl md:text-6xl font-sans font-light tracking-[0.1em] uppercase mb-8">
                    ELLIMAN INSIDER
                </h2>
                <p className="text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto">
                    Learn more about the passions that inspire and motivate our agents to deliver their best in everything we do.
                </p>
            </div>
        </section>
    );
}
