import Header from "@/components/Header";
import { fetchPageSections } from "@/lib/content/fetchPageSections";
import SectionRenderer from "@/components/sections/SectionRenderer";

export default async function SalesSearchPage() {
    // Fetch CMS-managed sections
    const sections = await fetchPageSections('sales');

    return (
        <main className="min-h-screen bg-white">
            <Header theme="light" />

            {/* Render CMS-managed sections */}
            {sections?.map((section) => (
                <SectionRenderer key={section.id} section={section} />
            ))}
        </main>
    );
}
