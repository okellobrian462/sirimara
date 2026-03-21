'use client';

import { Heart } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfigContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ListingCardProps {
    listing: {
        id: number;
        price: string;
        address: string;
        cityStateZip: string;
        beds: number;
        baths: number;
        halfBaths: number;
        sqft: string;
        images: string[];
    };
}

export default function ListingCard({ listing }: ListingCardProps) {
    const config = useSiteConfig();
    const siteName = config.company_name || 'Sirimara';

    return (
        <div className="w-full h-full flex flex-col">
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden mb-4 group">
                <span className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] font-bold tracking-widest px-2 py-1 uppercase">
                    New
                </span>

                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                    className="w-full h-full exclusive-swiper"
                >
                    {listing.images.map((img, idx) => (
                        <SwiperSlide key={idx}>
                            <img
                                src={img}
                                alt={`Property Image ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="flex flex-col gap-2 relative">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xl font-light mb-1">{listing.price}</p>
                        <h3 className="text-sm font-bold tracking-widest uppercase text-brand-dark">
                            {listing.address}, <span className="text-gray-500">{listing.cityStateZip}</span>
                        </h3>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-gray-500 mt-2">
                    <span>{listing.beds} BR</span>
                    <span>{listing.baths} BA, {listing.halfBaths} HALF BA</span>
                    <span>{listing.sqft} SF</span>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <img
                            src="https://www.sirimara.com/images/de-master-logo.png"
                            alt={`${siteName} Logo`}
                            className="h-4 opacity-50"
                        />

                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                        {siteName} exclusive
                    </span>

                </div>
            </div>
        </div>
    );
}
