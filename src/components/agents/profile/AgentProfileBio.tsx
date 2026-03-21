'use client';

interface AgentProfileBioProps {
    name: string;
    bio: string;
}

export default function AgentProfileBio({ name, bio }: AgentProfileBioProps) {
    return (
        <section className="bg-[#FAF9F5] py-20 px-6">
            <div className="container mx-auto max-w-4xl text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-sans font-light tracking-[0.1em] uppercase mb-12 text-brand-dark">
                    About {name.split(' ')[0]}
                </h2>

                <div className="prose prose-lg max-w-none text-gray-500 font-light leading-relaxed whitespace-pre-line">
                    {bio}
                </div>
            </div>
        </section>
    );
}
