import { createClient } from '@/lib/supabase/server';
import { Property } from './featured/FeaturedClient';
import { Building2, Star, Mail, TrendingUp } from 'lucide-react';
import Link from 'next/link';

// Define a local interface that extends the base Property with dashboard-specific fields
interface DashboardProperty extends Property {
    status: string;
    created_at: string;
}

async function getDashboardStats() {
    const supabase = await createClient();

    const [
        { count: propertiesCount },
        { count: featuredCount },
        { count: subscribersCount },
        { data: recentProperties }
    ] = await Promise.all([
        supabase.from('properties').select('*', { count: 'exact', head: true }),
        supabase.from('properties').select('*', { count: 'exact', head: true }).eq('is_featured', true),
        supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('properties').select('*').order('created_at', { ascending: false }).limit(5)
    ]);

    return {
        propertiesCount: propertiesCount || 0,
        featuredCount: featuredCount || 0,
        subscribersCount: subscribersCount || 0,
        recentProperties: (recentProperties || []) as unknown as DashboardProperty[]
    };
}

export default async function AdminDashboard() {
    const stats = await getDashboardStats();

    const statCards = [
        {
            name: 'Total Properties',
            value: stats.propertiesCount,
            icon: Building2,
            href: '/admin/properties',
            color: 'bg-blue-500',
        },
        {
            name: 'Featured Properties',
            value: stats.featuredCount,
            icon: Star,
            href: '/admin/featured',
            color: 'bg-yellow-500',
        },
        {
            name: 'Newsletter Subscribers',
            value: stats.subscribersCount,
            icon: Mail,
            href: '/admin/subscribers',
            color: 'bg-green-500',
        },
        {
            name: 'Active Listings',
            value: stats.propertiesCount,
            icon: TrendingUp,
            href: '/admin/properties',
            color: 'bg-orange-500',
        },
    ];

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-light tracking-[0.15em] text-gray-900 mb-2">
                    DASHBOARD OVERVIEW
                </h1>
                <p className="text-gray-500">
                    Welcome back! Here's what's happening with your properties.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat) => (
                    <Link
                        key={stat.name}
                        href={stat.href}
                        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.color === 'bg-orange-500' ? 'bg-orange-100' : stat.color + '/10'} p-3 rounded-lg`}>
                                <stat.icon className={`w-6 h-6 ${stat.color === 'bg-orange-500' ? 'text-orange-600' : 'text-gray-600'}`} />
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium mb-1 tracking-wide uppercase">
                                {stat.name}
                            </p>
                            <p className="text-3xl font-semibold text-gray-900">
                                {stat.value}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Recent Properties */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-light tracking-[0.15em] text-gray-900">
                        RECENT PROPERTIES
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Property
                                </th>
                                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Created
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {stats.recentProperties.map((property: DashboardProperty) => (
                                <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 font-serif">
                                            {property.title}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 uppercase tracking-wider text-[10px] font-bold">
                                            {property.city}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 font-medium">
                                            KSh {property.price.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-[9px] font-bold tracking-widest uppercase rounded-sm ${property.status === 'active'
                                                ? 'bg-green-50 text-green-700 border border-green-100'
                                                : property.status === 'pending'
                                                    ? 'bg-yellow-50 text-yellow-700 border border-yellow-100'
                                                    : 'bg-gray-50 text-gray-700 border border-gray-100'
                                            }`}>
                                            {property.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                        {new Date(property.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                    href="/admin/properties/new"
                    className="bg-white border border-gray-200 text-gray-900 rounded-xl p-6 hover:shadow-md hover:border-orange-200 transition-all group"
                >
                    <h3 className="text-lg font-light tracking-wide mb-2 group-hover:text-orange-600 transition-colors">Add New Property</h3>
                    <p className="text-gray-500 text-sm">
                        Create a new property listing
                    </p>
                </Link>

                <Link
                    href="/admin/featured"
                    className="bg-white border border-gray-200 text-gray-900 rounded-xl p-6 hover:shadow-md hover:border-orange-200 transition-all group"
                >
                    <h3 className="text-lg font-light tracking-wide mb-2 group-hover:text-orange-600 transition-colors">Manage Featured</h3>
                    <p className="text-gray-500 text-sm">
                        Update featured properties carousel
                    </p>
                </Link>

                <Link
                    href="/admin/subscribers"
                    className="bg-white border border-gray-200 text-gray-900 rounded-xl p-6 hover:shadow-md hover:border-orange-200 transition-all group"
                >
                    <h3 className="text-lg font-light tracking-wide mb-2 group-hover:text-orange-600 transition-colors">View Subscribers</h3>
                    <p className="text-gray-500 text-sm">
                        Manage newsletter subscribers
                    </p>
                </Link>
            </div>
        </div>
    );
}
