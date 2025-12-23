'use client';

const STORIES = [
    {
        title: "Stephanie Bo Li Represents Buyer in Record-Setting Sale in Connecticut",
        image: "https://res.cloudinary.com/dk92v0fkk/image/upload/v1738661172/production/htebpzevs038je1q7upw.jpg",
        category: "INSIDER"
    },
    {
        title: "Elliman’s Patricia Vance Helps Buyer Snag Aman New York Penthouse in Record Deal",
        image: "https://res.cloudinary.com/dk92v0fkk/image/upload/v1738658928/production/dn5vu5ygsufsrvju51nb.jpg",
        category: "INSIDER"
    },
    {
        title: "Four-Property Compound on Miami’s La Gorce Island Sells for Record-Breaking $122M",
        image: "https://res.cloudinary.com/dk92v0fkk/image/upload/v1739293162/production/cc2ayll3ggr8ntqi0kei.jpg",
        category: "INSIDER"
    }
];

export default function SellStories() {
    return (
        <section className="bg-white py-24 md:py-32 px-6">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-5xl font-sans font-light tracking-[0.1em] uppercase mb-20 text-center">
                    OUR STORIES ARE YOUR SUCCESS
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {STORIES.map((story, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-6">
                                <img
                                    src={story.image}
                                    alt={story.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="flex items-center gap-2 mb-4">
                                        <img
                                            src="https://www.elliman.com/images/ellimanInsiderLogo.svg"
                                            alt="Elliman Insider"
                                            className="h-4 brightness-100 invert"
                                        />
                                    </div>
                                    <h3 className="text-white text-lg md:text-xl font-sans font-light leading-tight">
                                        {story.title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
