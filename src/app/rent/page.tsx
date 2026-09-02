import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fetchPageSections } from "@/lib/content/fetchPageSections";
import SectionRenderer from "@/components/sections/SectionRenderer";

export const metadata = {
    title: 'Homes for Rent | Sirimara Realty',
    description: 'Find refined homes and apartments for rent in Kenya. Explore rental listings with Sirimara Realty.',
};

export default async function RentalsSearchPage() {
    
    const sections = await fetchPageSections('rentals');

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
