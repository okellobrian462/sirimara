'use client';

export default function AgentProfileValuation() {
    return (
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://res.cloudinary.com/dk92v0fkk/image/upload/v1720625904/staging/sqpw1fppqlcf6cokh69b.webp"
                    alt="Luxury Interior"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 text-center text-white p-6">
                <h2 className="text-3xl md:text-5xl font-sans font-light tracking-[0.1em] uppercase mb-12">
                    What is your home worth?
                </h2>
                <p className="text-lg font-light mb-12 max-w-2xl mx-auto">
                    Get an initial in-depth market analysis of your home to start a conversation.
                </p>
                <button className="px-12 py-4 border border-white rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-[#181728] transition-colors">
                    Get Started
                </button>
            </div>
        </section>
    );
}
