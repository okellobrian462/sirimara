import { createClient as createBrowserClient } from '@/lib/supabase/client';
import { createClient as createServerClient } from '@/lib/supabase/server';

export async function signIn(email: string, password: string) {
    const supabase = createBrowserClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw error;
    }

    
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

    return data;
}

export async function signOut() {
    const supabase = createBrowserClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw error;
    }
}

export async function getSession() {
    const supabase = await createServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

export async function getUser() {
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export async function isAdmin() {
    const user = await getUser();

    if (!user) {
        return false;
    }

    const supabase = await createServerClient();
    const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', user.id)
        .single();

    return !error && !!data;
}
