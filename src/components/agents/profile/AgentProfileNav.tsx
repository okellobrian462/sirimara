'use client';

export default function AgentProfileNav() {
    return (
        <div className="sticky top-[80px] z-40 bg-white border-b border-gray-100 py-4 px-6 shadow-sm">
            <div className="container mx-auto flex items-center justify-between">
                <div className="hidden md:block">
                    {/* Placeholder for left side content if needed later */}
                </div>

                <nav className="flex items-center gap-8 mx-auto md:mx-0">
                    <button className="text-xs font-bold tracking-[0.2em] uppercase text-[#181728] hover:opacity-70 transition-opacity">
                        About
                    </button>
                    {/* Add more nav items here if needed like LISTEN, LISTINGS etc */}
                </nav>

                <div className="hidden md:block">
                    <button className="bg-[#181728] text-white px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-opacity-90 transition-opacity">
                        Connect
                    </button>
                </div>
            </div>
        </div>
    );
}
