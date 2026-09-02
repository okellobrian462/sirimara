import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fetchPageSections } from "@/lib/content/fetchPageSections";
import SectionRenderer from "@/components/sections/SectionRenderer";

export const metadata = {
    title: 'Homes for Sale | Sirimara Realty',
    description: 'Browse luxury homes and properties for sale in Kenya. Sirimara Realty connects you with exceptional listings nationwide.',
};

export default async function SalesSearchPage() {
    
    const sections = await fetchPageSections('sales');

    return (
        <main className="min-h-screen bg-white">
            <Header theme="light" />

            {}
            {sections?.map((section) => (
                <SectionRenderer key={section.id} section={section} />
            ))}

            <Footer />
        </main>
    );
}
