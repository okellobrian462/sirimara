import { createClient } from '@/lib/supabase/server';

interface ContactSubmission {
    id: string | number;
    form_type: string | null;
    status: string | null;
    data: Record<string, unknown> | null;
    created_at: string | null;
}

interface ContactSubmissionResult {
    submissions: ContactSubmission[];
    error: string | null;
}

async function getContactSubmissions(): Promise<ContactSubmissionResult> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

    if (error) {
        console.error('Error fetching contact submissions:', error);
        return {
            submissions: [],
            error: error.message || 'Unexpected error fetching contact submissions.',
        };
    }

    return {
        submissions: (data || []) as ContactSubmission[],
        error: null,
    };
}

function renderSubmissionMessage(data: ContactSubmission['data']) {
    if (!data) return '-';

    const record = typeof data === 'object' && data !== null ? data : {};
    const message = record['message'];

    return message ? String(message) : '-';
}

export default async function ContactSubmissionsPage() {
    const { submissions, error } = await getContactSubmissions();

    return (
        <div className="p-8">
            {error && (
                <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-700">
                    <strong className="font-semibold">Unable to fetch submissions:</strong> {error}
                </div>
            )}
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-light tracking-[0.15em] text-gray-900 mb-2">
                        Contact Submissions
                    </h1>
                    <p className="text-gray-500 max-w-2xl">
                        Review messages submitted through the contact, valuation, and agent profile forms. Records are stored in the Supabase `form_submissions` table.
                    </p>
                </div>
                <div className="rounded-full bg-orange-50 px-4 py-2 text-sm text-orange-700 shadow-sm">
                    {submissions.length} total submissions
                </div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 uppercase tracking-[0.2em] text-gray-500">ID</th>
                            <th className="px-6 py-4 uppercase tracking-[0.2em] text-gray-500">Type</th>
                            <th className="px-6 py-4 uppercase tracking-[0.2em] text-gray-500">Status</th>
                            <th className="px-6 py-4 uppercase tracking-[0.2em] text-gray-500">Submitted</th>
                            <th className="px-6 py-4 uppercase tracking-[0.2em] text-gray-500">Source</th>
                            <th className="px-6 py-4 uppercase tracking-[0.2em] text-gray-500">Agent</th>
                            <th className="px-6 py-4 uppercase tracking-[0.2em] text-gray-500">Name</th>
                            <th className="px-6 py-4 uppercase tracking-[0.2em] text-gray-500">Email</th>
                            <th className="px-6 py-4 uppercase tracking-[0.2em] text-gray-500">Phone</th>
                            <th className="px-6 py-4 uppercase tracking-[0.2em] text-gray-500">Data</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {submissions.map((submission, index) => {
                            const dataRecord = submission.data ?? {};
                            const record = typeof dataRecord === 'object' && dataRecord !== null ? dataRecord : {};
                            const firstName = record['firstName'] ? String(record['firstName']) : '';
                            const lastName = record['lastName'] ? String(record['lastName']) : '';
                            const email = record['email'] ? String(record['email']) : '-';
                            const phone = record['phone'] ? String(record['phone']) : '-';
                            const source = record['source'] ? String(record['source']).replace(/_/g, ' ') : '-';
                            const agentName = record['agentName'] ? String(record['agentName']) : '-';
                            const name = [firstName, lastName].filter(Boolean).join(' ') || '-';

                            return (
                                <tr key={submission.id ?? index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-xs text-gray-500">{submission.id ?? '-'}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{submission.form_type || '-'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{submission.status || 'new'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{submission.created_at ? new Date(submission.created_at).toLocaleString() : '-'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 capitalize">{source}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{agentName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{phone}</td>
                                    <td className="px-6 py-4">
                                        <pre className="whitespace-pre-wrap break-words text-xs text-gray-500 bg-gray-50 rounded-xl p-3 max-h-40 overflow-auto">
                                            {renderSubmissionMessage(submission.data)}
                                        </pre>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
