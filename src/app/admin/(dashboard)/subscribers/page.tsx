import { createClient } from '@/lib/supabase/server';
import SubscribersClient from './SubscribersClient';

async function getSubscribers() {
    const supabase = await createClient();

    const { data: subscribers, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

    if (error) {
        console.error('Error fetching subscribers:', error);
        return [];
    }

    return subscribers || [];
}

export default async function SubscribersPage() {
    const subscribers = await getSubscribers();

    return <SubscribersClient subscribers={subscribers} />;
}
