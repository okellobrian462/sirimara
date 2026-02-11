'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Building2,
    Star,
    Users,
    Mail,
    Settings,
    ChevronLeft,
    ChevronRight,
    Image,
    // FileText, // Removed - unused
    BarChart3,
    Monitor,
    Sliders,
    Home, // Added for Properties icon
    // TrendingUp, // Removed - unused
    FileImage, // Added for Media Library icon
    Menu, // Added for Navigation icon
    Layers, // Added for Pages icon
    Palette, // Added for Theme icon
    BarChart2, // Added for Statistics icon
    Newspaper // Added for Newsletters icon
} from 'lucide-react';
import { useState } from 'react';
import { useSiteConfig } from '@/context/SiteConfigContext';


const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Pages', href: '/admin/pages', icon: Layers },
    { name: 'Newsletters', href: '/admin/newsletters', icon: Newspaper },
    { name: 'Properties', href: '/admin/properties', icon: Home },
    { name: 'Featured', href: '/admin/featured', icon: Star },
    { name: 'Agents', href: '/admin/agents', icon: Users },
    { name: 'Media Library', href: '/admin/media', icon: FileImage },
    { name: 'Navigation', href: '/admin/navigation', icon: Menu },
    { name: 'Theme', href: '/admin/theme', icon: Palette },
    { name: 'Site Config', href: '/admin/config', icon: Sliders },
    { name: 'Statistics', href: '/admin/statistics', icon: BarChart2 },
    { name: 'Subscribers', href: '/admin/subscribers', icon: Mail },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function Sidebar() {
    const config = useSiteConfig();
    const siteName = config.company_name || 'Sirimara';
    const pathname = usePathname();

    const [collapsed, setCollapsed] = useState(false);

    return (
        <div
            className={`${collapsed ? 'w-20' : 'w-64'
                } bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
                {!collapsed && (
                    <h1 className="text-xl font-light tracking-[0.2em] text-[#181728] uppercase">
                        {siteName}
                    </h1>
                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-colors"
                >
                    {collapsed ? (
                        <ChevronRight className="w-5 h-5" />
                    ) : (
                        <ChevronLeft className="w-5 h-5" />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== '/admin' && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all group ${isActive
                                ? 'bg-purple-50 text-purple-600 shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            title={collapsed ? item.name : undefined}
                        >
                            <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-900'}`} />
                            {!collapsed && (
                                <span className="text-sm font-medium tracking-wide">
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            {!collapsed && (
                <div className="p-6 border-t border-gray-100">
                    <p className="text-xs text-gray-400 tracking-wide">
                        Admin Portal v1.0
                    </p>
                </div>
            )}
        </div>
    );
}
