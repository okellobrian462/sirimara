import { Phone, MapPin, Mail } from 'lucide-react';

interface AgentProfileHeroProps {
    agent: {
        name: string;
        title: string;
        license: string;
        phone: string;
        address: string;
        email: string;
        image: string;
    };
}

export default function AgentProfileHero({ agent }: AgentProfileHeroProps) {
    return (
        <section className="flex flex-col md:flex-row h-auto md:h-[600px] w-full">
            {}
            <div className="w-full md:w-1/2 h-[400px] md:h-full relative bg-gray-200">
                <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover object-top"
                />
            </div>

            {}
            <div className="w-full md:w-1/2 bg-[#2C2F3B] text-white p-10 md:p-20 flex flex-col justify-center">
                <h1 className="text-3xl md:text-5xl font-sans font-light tracking-[0.1em] uppercase mb-4">
                    {agent.name}
                </h1>
                <p className="text-sm tracking-[0.2em] font-bold uppercase mb-12">
                    {agent.title}
                </p>

                <p className="text-sm font-light mb-8 opacity-80">
                    {agent.license}
                </p>

                <div className="space-y-4 text-xs font-bold tracking-[0.15em] uppercase">
                    <p className="flex items-center gap-4">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${agent.phone}`} className="hover:opacity-70 transition-opacity">
                            {agent.phone}
                        </a>
                    </p>
                    <p className="flex items-center gap-4">
                        <MapPin className="w-4 h-4" />
                        <span>{agent.address}</span>
                    </p>
                    <p className="flex items-center gap-4">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${agent.email}`} className="hover:opacity-70 transition-opacity">
                            {agent.email}
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
