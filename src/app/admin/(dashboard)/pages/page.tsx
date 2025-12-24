import { Metadata } from 'next';
import Link from 'next/link';
import { Home, FileText, ShoppingBag, Users, Globe } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Page Manager | Admin',
    description: 'Manage page sections and content',
};

const PAGES = [
    { id: 'home', name: 'Homepage', icon: Home, path: '/' },
    { id: 'about', name: 'About Us', icon: FileText, path: '/about' },
    { id: 'sell', name: 'Sell', icon: ShoppingBag, path: '/sell' },
    { id: 'agents', name: 'Agents', icon: Users, path: '/agents' },
    { id: 'world-of-elliman', name: 'World of Elliman', icon: Globe, path: '/world-of-elliman' },
];

export default function PagesPage() {
    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-light tracking-wide mb-2">Page Manager</h1>
                <p className="text-gray-600">Select a page to manage its sections</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PAGES.map((page) => {
                    const Icon = page.icon;
                    return (
                        <Link
                            key={page.id}
                            href={`/admin/pages/${page.id}/sections`}
                            className="group block p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-lg transition-all"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-gray-900 transition-colors">
                                    <Icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium mb-1 group-hover:text-gray-900">
                                        {page.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{page.path}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
