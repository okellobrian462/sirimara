import { createClient } from '@/lib/supabase/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchPageSections } from '@/lib/content/fetchPageSections';
import SectionRenderer from '@/components/sections/SectionRenderer';

export default async function Home() {
  
  const sections = await fetchPageSections('home');

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {}
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}

      <Footer />
    </div>
  );
}