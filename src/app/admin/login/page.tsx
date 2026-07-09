'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Lock, Mail } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfigContext';

export default function AdminLoginPage() {
    const config = useSiteConfig();
    const siteName = config.company_name || 'Sirimara';
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const getFriendlyAuthError = (err: unknown) => {
        const message = err instanceof Error ? err.message : 'Invalid credentials';

        if (message.toLowerCase().includes('database error querying schema')) {
            return 'Supabase could not complete the login because the Auth user or admin record needs repair. Create the user in Supabase Authentication, then run supabase/admin-user-repair.sql.';
        }

        return message;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const supabase = createClient();

            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) throw signInError;

            
            const { data: adminData, error: adminError } = await supabase
                .from('admin_users')
                .select('*')
                .eq('id', data.user.id)
                .single();

            if (adminError || !adminData) {
                await supabase.auth.signOut();
                throw new Error('Unauthorized: Not an admin user');
            }

            
            await supabase
                .from('admin_users')
                .update({ last_login: new Date().toISOString() })
                .eq('id', data.user.id);

            router.push('/admin');
            router.refresh();
        } catch (err: unknown) {
            setError(getFriendlyAuthError(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#181728] via-[#1a1a2e] to-[#0f0f1e] flex items-center justify-center px-6">
            {}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="relative w-full max-w-md">
                {}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-light tracking-[0.3em] text-white mb-3 uppercase">
                        {siteName}
                    </h1>

                    <div className="w-16 h-px bg-white/40 mx-auto mb-6" />
                    <p className="text-white/60 text-sm tracking-widest uppercase">
                        Admin Portal
                    </p>
                </div>

                {}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {}
                        <div>
                            <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2 tracking-wide">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-white/40" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all"
                                    placeholder="admin@sirimara.com"
                                />
                            </div>
                        </div>

                        {}
                        <div>
                            <label htmlFor="password" className="block text-white/80 text-sm font-medium mb-2 tracking-wide">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-white/40" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        {}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-gray-900 rounded-xl py-3 font-medium tracking-wide hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {}
                    <div className="mt-6 text-center">
                        <p className="text-white/40 text-xs tracking-wide">
                            Authorized personnel only
                        </p>
                    </div>
                </div>

                {}
                <div className="mt-8 text-center">
                    <p className="text-white/30 text-xs tracking-widest uppercase">
                        © {new Date().getFullYear()} {siteName}
                    </p>
                </div>

            </div>
        </div>
    );
}
