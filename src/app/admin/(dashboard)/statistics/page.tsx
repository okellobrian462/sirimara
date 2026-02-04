import { Metadata } from 'next';
import StatsManager from './StatsManager';
import { getStatistics } from '@/app/admin/actions/statistics';

export const metadata: Metadata = {
    title: 'Statistics Manager | Admin',
    description: 'Manage site statistics and numbers',
};

export default async function StatisticsPage() {
    const { data: statistics } = await getStatistics();

    return (
        <StatsManager initialStatistics={statistics || []} />
    );
}
