'use client';

import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface AdminHeaderProps {
    userEmail?: string;
}

export default function AdminHeader({ userEmail }: AdminHeaderProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSignOut = async () => {
        setLoading(true);
        try {
            const supabase = createClient();
            await supabase.auth.signOut();
            router.push('/admin/login');
            router.refresh();
        } catch (error) {
            console.error('Sign out error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <h2 className="text-lg font-light tracking-[0.15em] text-[#181728]">
                    ADMIN DASHBOARD
                </h2>
            </div>

            <div className="flex items-center gap-4">
                {/* User Info */}
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 tracking-wide">
                        {userEmail || 'Admin'}
                    </span>
                </div>

                {/* Sign Out Button */}
                <button
                    onClick={handleSignOut}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all disabled:opacity-50"
                >
                    <LogOut className="w-4 h-4" />
                    {loading ? 'Signing out...' : 'Sign Out'}
                </button>
            </div>
        </header>
    );
}
