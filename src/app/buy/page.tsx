import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fetchPageSections } from "@/lib/content/fetchPageSections";
import SectionRenderer from "@/components/sections/SectionRenderer";

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
