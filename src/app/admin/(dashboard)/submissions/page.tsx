import { getSubmissions } from '@/app/admin/actions/submissions';
import SubmissionsClient from './SubmissionsClient';

export const revalidate = 0; // Dynamic route

export default async function SubmissionsPage() {
    const response = await getSubmissions();
    const initialSubmissions = response.success && response.data ? response.data : [];

    return <SubmissionsClient initialSubmissions={initialSubmissions} />;
}
