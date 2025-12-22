import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function middleware(request: NextRequest) {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();

    // Protect admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Allow access to login page
        if (request.nextUrl.pathname === '/admin/login') {
            // Redirect to dashboard if already logged in
            if (session) {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
            return NextResponse.next();
        }

        // Redirect to login if not authenticated
        if (!session) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Check if user is an admin
        const { data: adminData } = await supabase
            .from('admin_users')
            .select('*')
            .eq('id', session.user.id)
            .single();

        if (!adminData) {
            // Not an admin, sign out and redirect to login
            await supabase.auth.signOut();
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
