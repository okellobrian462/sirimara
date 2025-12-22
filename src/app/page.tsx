'use client';

import { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

export default function Home() {
  const [activeTab, setActiveTab] = useState('city-skylines');
  const [currentCarousel, setCurrentCarousel] = useState(0);

  const featuredProperties = [
    {
      image: 'https://ext.same-assets.com/2757429726/2776369223.jpeg',
      title: 'Setai Skyhome: 6,000+ SF Oceanfront & Skyline Views',
      location: 'MIAMI BEACH',
      beds: '5 BR',
      baths: '5 BA',
      price: '$24,950,000',
    },
    {
      image: 'https://ext.same-assets.com/2757429726/2803648720.jpeg',
      title: 'Sophistication Meets Serenity',
      location: 'NEW YORK',
      beds: '5 BR',
      baths: '4 BA, 1 HALF BA',
      price: '$7,995,000',
    },
    {
      image: 'https://ext.same-assets.com/2757429726/778226016.jpeg',
      title: 'Private Vineyard & Architectural Masterpiece in Sonoma',
      location: 'GLEN ELLEN',
      beds: '7 BR',
      baths: '7 BA, 2 HALF BA',
      price: '$28,500,000',
    },
  ];

  const propertyListings = [
    {
      image: 'https://api.cotality.com/trestle/Media/Property/PHOTO-Jpeg/1100149223/1/MzY3Ny81NzgwLzY/Ni8xMjc1My8xNzY2MzM3NDA2/JwUEZ3EjKhowuXy8szILFnG3L9rBd1zFdbpQaommrSg',
      city: 'New York',
      beds: '2 BR',
      baths: '3 BA, 1 HALF BA',
      price: '$17,990,000',
      slug: '200-e-59th-st-ph32-new-york-ny-10022/10482080'
    },
    {
      image: 'https://dvvjkgh94f2v6.cloudfront.net/523fa3e6/420661812/83dcefb7.jpeg',
      city: 'Miami Beach',
      beds: '4 BR',
      baths: '4 BA, 1 HALF BA',
      price: '$5,995,000',
      slug: '291-palm-ave-miami-beach-fl-33139'
    },
    {
      image: 'https://ext.same-assets.com/2757429726/2050726427.jpeg',
      city: 'Miami',
      beds: '3 BR',
      baths: '4 BA',
      price: '$2,900,000',
      slug: '123-miami-st'
    },
    {
      image: 'https://ext.same-assets.com/2757429726/2626763149.jpeg',
      city: 'Los Angeles',
      beds: '3 BR',
      baths: '4 BA',
      price: '$6,500,000',
      slug: '456-la-ave'
    },
  ];

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

      {/* Property Showcase Slider */}
      <section className="relative">
        <div className="relative h-[600px] overflow-hidden">
          <img
            src={featuredProperties[currentCarousel].image}
            alt={featuredProperties[currentCarousel].title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
            <div className="container mx-auto">
              <h3 className="text-3xl font-light mb-4">
                {featuredProperties[currentCarousel].title}
              </h3>
              <div className="flex items-center gap-6 text-sm tracking-widest uppercase">
                <span>{featuredProperties[currentCarousel].location}</span>
                <span>|</span>
                <span>{featuredProperties[currentCarousel].beds}</span>
                <span>|</span>
                <span>{featuredProperties[currentCarousel].baths}</span>
                <span>|</span>
                <span>{featuredProperties[currentCarousel].price}</span>
              </div>
            </div>
          </div>
          <div className="absolute right-12 bottom-12 flex gap-4">
            <button
              onClick={() => setCurrentCarousel((prev) => (prev - 1 + featuredProperties.length) % featuredProperties.length)}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentCarousel((prev) => (prev + 1) % featuredProperties.length)}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Property Listings Section */}
      <section className="bg-[#181728] py-20">
        <div className="px-6">
          <div className="text-center text-white mb-12">
            <p className="text-sm tracking-widest uppercase mb-4">Local Experts, Global Reach</p>
            <h2 className="text-5xl md:text-6xl tracking-wide mb-12">
              THE NEXT MOVE IS YOURS
            </h2>
            {/* Vertical Divider */}
            <div className="w-px h-20 bg-white/40 mx-auto mb-12" />
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 border-b border-white/20">
            {['CITY SKYLINES', 'WATER VIEWS', 'FARM & RANCH', 'JUST LISTED', 'UNDER $2 MILLION'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase().replace(/\s+/g, '-'))}
                className={`pb-4 text-xs md:text-sm tracking-widest uppercase transition-colors ${activeTab === tab.toLowerCase().replace(/\s+/g, '-')
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {propertyListings.map((property, index) => (
              <Link key={index} href={`/listing/${property.slug}`} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-4 aspect-[3/4]">
                  <img
                    src={property.image}
                    alt={property.city}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                  <div className="absolute bottom-8 left-0 right-0 text-center text-white px-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-4xl mb-3 font-serif">
                      {property.city}
                    </h3>
                    <div className="text-xs tracking-widest uppercase space-y-2 font-medium">
                      <div>{property.beds} | {property.baths}</div>
                      <div className="text-base">{property.price}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <button className="px-8 py-4 border-2 border-white rounded-full text-sm tracking-widest text-white hover:bg-white hover:text-gray-900 transition-colors uppercase">
              View All Listings
            </button>
          </div>
        </div>
      </section>

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