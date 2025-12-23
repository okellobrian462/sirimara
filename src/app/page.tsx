import { createClient } from '@/lib/supabase/server';
import { ChevronDown, Search } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import HomeClient from '@/components/HomeClient';

import { fetchHeroSections } from '@/lib/content/fetchHeroSections';
import StartSearchButton from '@/components/StartSearchButton';

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

  // Get unique categories and filter out duplicates, ensuring string type
  const categories = [...new Set(data?.map(p => p.category) || [])].filter(Boolean) as string[];
  return categories.sort();
}

export default async function Home() {
  const featuredProperties = await getFeaturedProperties();
  const propertyListings = await getPropertyListings();
  const heroSections = await fetchHeroSections('home');
  const categories = await getPropertyCategories();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Sections - Dynamic from Database */}
      {heroSections.map((hero, index) => (
        <section key={hero.id} className="relative h-screen flex items-center justify-center overflow-hidden">
          {hero.media_type === 'video' && hero.media_url ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={hero.media_url} type="video/mp4" />
            </video>
          ) : hero.media_type === 'image' && hero.media_url ? (
            <img
              src={hero.media_url}
              alt={hero.headline || ''}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : null}

          <div className={`absolute inset-0 bg-black/${hero.overlay_opacity || 20}`} />

          <div className="relative z-10 text-center text-white px-6">
            {hero.headline && (
              <h1 className={`${index === 0 ? 'text-[40px] tracking-[0.25rem]' : 'text-7xl md:text-8xl font-light tracking-widest'} mb-${index === 0 ? '6' : '32'}`}>
                {hero.headline}
              </h1>
            )}
            {hero.subheadline && (
              <p className="text-xl mb-12">{hero.subheadline}</p>
            )}


            {hero.cta_text && hero.cta_link && (
              index === 0 ? (
                <StartSearchButton text={hero.cta_text} />
              ) : (
                <Link href={hero.cta_link}>
                  <button className="px-8 py-4 border-2 border-white rounded-full text-sm tracking-widest hover:bg-white hover:text-gray-900 transition-colors uppercase">
                    {hero.cta_text}
                  </button>
                </Link>
              )
            )}
          </div>

          {/* Bottom Navigation - Only on first hero */}
          {index === 0 && (
            <div className="absolute bottom-0 left-0 right-0 z-20">
              <div className="px-6 py-8 flex items-center justify-between text-white">
                <div className="flex items-center gap-8">
                  <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Search className="w-5 h-5" />
                  </button>
                  <nav className="hidden md:flex gap-8 uppercase text-sm tracking-wider">
                    <a href="#" className="hover:opacity-80 transition-opacity">Buy</a>
                    <a href="#" className="hover:opacity-80 transition-opacity">Rent</a>
                    <a href="#" className="hover:opacity-80 transition-opacity">Sell</a>
                    <a href="#" className="hover:opacity-80 transition-opacity">Agents</a>
                  </nav>
                </div>
                <nav className="hidden md:flex gap-8 uppercase text-sm tracking-wider">
                  <a href="#" className="hover:opacity-80 transition-opacity">New Development</a>
                  <a href="#" className="hover:opacity-80 transition-opacity">World of Elliman</a>
                </nav>
              </div>
            </div>
          )}

          {/* Play button - Only on second and third heroes */}
          {index > 0 && (
            <button className="absolute bottom-8 right-8 w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-colors">
              <div className="flex items-center justify-center">
                <div className="w-0 h-0 border-l-8 border-l-current border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1" />
              </div>
            </button>
          )}
        </section>
      ))}

      {/* Client-side interactive sections */}
      <HomeClient
        featuredProperties={featuredProperties}
        propertyListings={propertyListings}
        categories={categories}
      />

      {/* Newsletter Section */}
      <section className="bg-[#181728] py-20">
        <div className="px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <h2 className="text-3xl md:text-4xl text-white" style={{ fontFamily: 'Sainte Colombe, serif' }}>
              The latest in luxury property, lifestyle & culture, curated just for you.
            </h2>
            <div className="relative w-full md:w-auto md:min-w-[400px]">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
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