import { createClient } from '@/lib/supabase/server';
import { ChevronDown, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import HomeClient from '@/components/HomeClient';

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

export default async function Home() {
  const featuredProperties = await getFeaturedProperties();
  const propertyListings = await getPropertyListings();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://ext.same-assets.com/2757429726/911340418.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-[40px] tracking-[0.25rem] mb-6">
            WHERE DO YOU WANT TO GO?
          </h1>
          <p className="text-xl mb-12">We are leaders in luxury properties.</p>
          <button className="mx-auto px-8 py-4 border-2 border-white rounded-full text-base hover:bg-white hover:text-gray-900 transition-colors uppercase flex items-center justify-center gap-3">
            Start Your Search
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Navigation */}
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
      </section>

      {/* Featured Property Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://ext.same-assets.com/2757429726/610197214.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-6">
          <h2 className="text-7xl md:text-8xl font-light tracking-widest mb-32">DREAM</h2>
          <button className="px-8 py-4 border-2 border-white rounded-full text-sm tracking-widest hover:bg-white hover:text-gray-900 transition-colors uppercase">
            View Our Exclusives
          </button>
        </div>
        <button className="absolute bottom-8 right-8 w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-colors">
          <div className="flex items-center justify-center">
            <div className="w-0 h-0 border-l-8 border-l-current border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1" />
          </div>
        </button>
      </section>

      {/* Client-side interactive sections */}
      <HomeClient
        featuredProperties={featuredProperties}
        propertyListings={propertyListings}
      />

      {/* World of Elliman Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://ext.same-assets.com/2757429726/3846012413.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-white px-6">
          <p className="text-xl mb-6" style={{ fontFamily: 'Sainte Colombe, serif' }}>
            The world of
          </p>
          <h2 className="text-7xl md:text-8xl font-light tracking-widest mb-8">ELLIMAN</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Get immersed in the places, people, and lifestyles that inspire our world.
          </p>
          <button className="px-8 py-4 border-2 border-white rounded-full text-sm tracking-widest hover:bg-white hover:text-gray-900 transition-colors uppercase">
            Explore Now
          </button>
        </div>
        <button className="absolute bottom-8 right-8 w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-colors">
          <div className="flex items-center justify-center">
            <div className="w-0 h-0 border-l-8 border-l-current border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1" />
          </div>
        </button>
      </section>

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