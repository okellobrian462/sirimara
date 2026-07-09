import { fetchSiteConfig } from '@/lib/content/fetchSiteConfig';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ValuationForm from './ValuationForm';

export async function generateMetadata(): Promise<Metadata> {
    const config = await fetchSiteConfig();
    const siteName = config.company_name || 'Sirimara';

    return {
        title: `Request a Home Valuation | ${siteName}`,
        description: `Get a complimentary market analysis of your property from ${siteName} experts.`,
    };
}

export default function ValuationPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            <div className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-2xl">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-5xl font-light tracking-widest mb-4 uppercase font-serif">
                            Request a Valuation
                        </h1>
                        <p className="text-gray-500 font-light">
                            Discover what your property is worth with a complimentary market analysis from our experts.
                        </p>
                    </div>

                    <ValuationForm />
                </div>
            </div>

            <Footer />
        </main>
    );
}
