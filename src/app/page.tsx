import { createClient } from '@/lib/supabase/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import HomeClient from '@/components/HomeClient';
import { fetchPageSections } from '@/lib/content/fetchPageSections';
import SectionRenderer from '@/components/sections/SectionRenderer';
import { fetchSiteConfig } from '@/lib/content/fetchSiteConfig';

async function getFeaturedProperties() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('properties')
    .select('*')
    .eq('is_featured', true)
    .order('featured_order', { ascending: true })
    .limit(3);
  return data || [];
}

async function getPropertyListings() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(4);
  return data || [];
}

async function getPropertyCategories() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('properties')
    .select('category')
    .not('category', 'is', null)
    .eq('status', 'active');

  const categories = [...new Set(data?.map(p => p.category) || [])].filter(Boolean) as string[];
  return categories.sort();
}

export default async function Home() {
  const featuredProperties = await getFeaturedProperties();
  const propertyListings = await getPropertyListings();
  const categories = await getPropertyCategories();
  const config = await fetchSiteConfig();

  // Fetch hero sections from CMS
  const heroSections = await fetchPageSections('home');

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Sections - Now CMS-managed */}
      {heroSections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}

      {/* Client-side interactive sections (property carousel and grid) */}
      <HomeClient
        featuredProperties={featuredProperties}
        propertyListings={propertyListings}
        categories={categories}
        propertyShowcaseTitle={config.property_showcase_title}
        propertyShowcaseSubtitle={config.property_showcase_subtitle}
      />

      {/* Newsletter Section */}
      <section className="bg-[#181728] py-20">
        <div className="px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <h2 className="text-3xl md:text-4xl text-white" style={{ fontFamily: 'Sainte Colombe, serif' }}>
              {config.newsletter_text || 'The latest in luxury property, lifestyle & culture, curated just for you.'}
            </h2>
            <div className="relative w-full md:w-auto md:min-w-[400px]">
              <input
                type="email"
                placeholder={config.newsletter_placeholder || 'ENTER YOUR EMAIL'}
                className="w-full bg-transparent border-2 border-white rounded-full px-6 py-4 text-white placeholder:text-white/60 text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:opacity-80 transition-opacity">
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CookieConsent />
    </div>
  );
}