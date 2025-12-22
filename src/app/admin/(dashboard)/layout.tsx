import { getUser } from '@/lib/auth/auth-helpers';
import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getUser();

    return (
        <div className="flex h-screen bg-[#f8f9fa]">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader userEmail={user?.email} />

                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
