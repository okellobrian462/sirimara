import { fetchActiveAgents } from '@/lib/content/fetchAgents';
import type { PageSection } from '@/lib/content/fetchPageSections';
import Link from 'next/link';

interface AgentsGridSectionProps {
    section: PageSection;
}

export default async function AgentsGridSection({ section }: AgentsGridSectionProps) {
    const agents = await fetchActiveAgents();

    return (
        <section className="bg-white py-20 px-6">
            <div className="container mx-auto max-w-7xl">
                {section.title && (
                    <div className="text-center mb-16">
                        {/* Optional icon similar to newsletter page if desired, for now just title */}
                        <h2 className="text-3xl md:text-5xl font-serif tracking-widest mb-4 uppercase text-[#181728]">
                            {section.title}
                        </h2>
                        {section.subtitle && (
                            <p className="text-gray-500 font-light text-lg tracking-wide">
                                {section.subtitle}
                            </p>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {agents.map((agent) => (
                        <Link
                            key={agent.id}
                            href={`/agents/${agent.id}`}
                            className="group block"
                        >
                            <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-gray-100">
                                {agent.photo_url ? (
                                    <img
                                        src={agent.photo_url}
                                        alt={`${agent.first_name} ${agent.last_name}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                                        No Photo
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                            </div>

                            <div className="text-center">
                                {agent.title && (
                                    <p className="text-xs font-medium tracking-[0.2em] text-gray-400 uppercase mb-2">
                                        {agent.title}
                                    </p>
                                )}
                                <h3 className="text-xl font-serif text-[#181728] uppercase group-hover:opacity-70 transition-opacity">
                                    {agent.first_name} {agent.last_name}
                                </h3>
                            </div>
                        </Link>
                    ))}

                    {agents.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500 font-light">
                            No agents found.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
