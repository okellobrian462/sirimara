'use client';

interface AgentProfileTabsContentProps {
    profileData?: {
        intro?: string;
        experience?: string;
        capabilities?: string[];
        admissions?: string[];
        academic_qualifications?: string[];
    };
    bio: string;
    name: string;
}

export default function AgentProfileTabsContent({ profileData, bio, name }: AgentProfileTabsContentProps) {
    
    const fallbackBio = (
        <section id="experience" className="bg-[#FAF9F5] py-20 px-6">
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

    if (!profileData || Object.keys(profileData).length === 0) {
        return fallbackBio;
    }

    const { intro, experience, capabilities, admissions, academic_qualifications } = profileData;

    return (
        <div className="bg-[#FAF9F5]">
            {}
            {(intro || bio) && (
                <section className="py-20 px-6 max-w-4xl mx-auto text-center">
                    <p className="text-xl md:text-2xl font-light text-gray-800 leading-relaxed font-serif italic">
                        "{intro || bio}"
                    </p>
                </section>
            )}

            {}
            {experience && (
                <section id="experience" className="py-20 px-6 border-t border-gray-200">
                    <div className="container mx-auto max-w-4xl">
                        <h2 className="text-sm font-bold tracking-[0.2em] text-brand-dark uppercase mb-8">
                            Experience
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-600 font-light leading-relaxed whitespace-pre-line">
                            {experience}
                        </div>
                    </div>
                </section>
            )}

            {}
            {capabilities && capabilities.length > 0 && (
                <section id="capabilities" className="py-20 px-6 border-t border-gray-200">
                    <div className="container mx-auto max-w-4xl">
                        <h2 className="text-sm font-bold tracking-[0.2em] text-brand-dark uppercase mb-8">
                            Capabilities
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12">
                            {capabilities.map((cap, i) => (
                                <div key={i} className="text-gray-800 font-medium text-lg border-b border-gray-200 pb-2">
                                    {cap}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {}
            {((admissions?.length ?? 0) > 0 || (academic_qualifications?.length ?? 0) > 0) && (
                <section id="credentials" className="py-20 px-6 border-t border-gray-200">
                    <div className="container mx-auto max-w-4xl">
                        <h2 className="text-sm font-bold tracking-[0.2em] text-brand-dark uppercase mb-12">
                            Credentials
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            {admissions && admissions.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-bold tracking-[0.15em] text-gray-500 uppercase mb-6">
                                        Admissions
                                    </h3>
                                    <ul className="space-y-4 text-gray-800 font-medium list-disc list-inside">
                                        {admissions.map((adm, i) => (
                                            <li key={i}>{adm}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {academic_qualifications && academic_qualifications.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-bold tracking-[0.15em] text-gray-500 uppercase mb-6">
                                        Academic Qualifications
                                    </h3>
                                    <ul className="space-y-4 text-gray-800 font-medium list-disc list-inside">
                                        {academic_qualifications.map((qual, i) => (
                                            <li key={i}>{qual}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
