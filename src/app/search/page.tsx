import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchClient from './SearchClient';
import { Suspense } from 'react';

export default function SearchPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header theme="dark" />

            <main className="container mx-auto px-6 pt-32 pb-12">
                <Suspense fallback={
                    <div className="flex items-center justify-center min-h-[50vh]">
                        <div className="animate-spin w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full"></div>
                    </div>
                }>
                    <SearchClient />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
}
