'use client';

export default function AgentProfileNav() {
    const defaultClasses = "text-xs font-bold tracking-[0.2em] uppercase text-brand-dark hover:opacity-70 transition-opacity";
    
    return (
        <div className="sticky top-[80px] z-40 bg-white border-b border-gray-100 py-4 px-6 shadow-sm">
            <div className="container mx-auto flex items-center justify-center">
                <nav className="flex items-center gap-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <a href="#experience" className={defaultClasses}>Experience</a>
                    <a href="#capabilities" className={defaultClasses}>Capabilities</a>
                    <a href="#credentials" className={defaultClasses}>Credentials</a>
                </nav>
            </div>
        </div>
    );
}
