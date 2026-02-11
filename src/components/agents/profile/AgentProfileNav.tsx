'use client';

export default function AgentProfileNav() {
    return (
        <div className="sticky top-[80px] z-40 bg-white border-b border-gray-100 py-4 px-6 shadow-sm">
            <div className="container mx-auto flex items-center justify-center">
                <nav className="flex items-center gap-8">
                    <button className="text-xs font-bold tracking-[0.2em] uppercase text-[#181728] hover:opacity-70 transition-opacity">
                        About
                    </button>
                    {/* Add more nav items here if needed like LISTEN, LISTINGS etc */}
                </nav>
            </div>
        </div>
    );
}
