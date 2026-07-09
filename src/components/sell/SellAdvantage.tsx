'use client';

export default function SellAdvantage() {
    return (
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
            {}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://res.cloudinary.com/dk92v0fkk/image/upload/v1732501450/staging-test/vrvgksmitdbeff170j1y.jpg"
                    alt="Real Estate Team"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center text-white max-w-4xl">
                <h2 className="text-3xl md:text-5xl font-sans font-light tracking-[0.1em] uppercase mb-8">
                    OUR AGENT ADVANTAGE
                </h2>
                <p className="text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto opacity-90">
                    Our agents have the knowledge, experience, and professional network to price, promote and put your property in front of the most highly qualified buyers.
                </p>
                <button className="px-12 py-4 border border-white rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-brand-dark transition-all duration-300">
                    FIND AN AGENT
                </button>
            </div>
        </section>
    );
}
