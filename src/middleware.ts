import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function middleware(request: NextRequest) {
    const supabase = await createClient();

    
    const { data: { session } } = await supabase.auth.getSession();

    
    if (request.nextUrl.pathname.startsWith('/admin')) {
        
        if (request.nextUrl.pathname === '/admin/login') {
            
            if (session) {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
            return NextResponse.next();
        }

        
        if (!session) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        
        const { data: adminData } = await supabase
            .from('admin_users')
            .select('*')
            .eq('id', session.user.id)
            .single();

        if (!adminData) {
            
            await supabase.auth.signOut();
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
