"use client";

import { Heart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Listing } from "@/lib/types/listing";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ListingCardProps {
    listing: Listing;
    onFavorite?: (id: string | number) => void;
    onClick?: (id: string | number) => void;
}

export default function ListingCard({
    listing,
    onFavorite,
    onClick,
}: ListingCardProps) {
    return (
        <div className="group cursor-pointer" onClick={() => onClick?.(listing.id)}>
            {/* Image Carousel */}
            <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-gray-100">
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                        prevEl: `.listing-${listing.id}-prev`,
                        nextEl: `.listing-${listing.id}-next`,
                    }}
                    pagination={{
                        el: `.listing-${listing.id}-pagination`,
                        clickable: true,
                        bulletClass: "swiper-pagination-bullet listing-bullet",
                        bulletActiveClass: "swiper-pagination-bullet-active listing-bullet-active",
                    }}
                    className="h-full w-full"
                    loop={listing.images.length > 1}
                >
                    {listing.images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image}
                                alt={`${listing.address} - Image ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Badge */}
                {listing.badge && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-widest uppercase z-10">
                        {listing.badge}
                    </div>
                )}

                {/* Navigation Dots */}
                <div
                    className={`listing-${listing.id}-pagination absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10`}
                />

                {/* Navigation Arrows */}
                {listing.images.length > 1 && (
                    <>
                        <button
                            type="button"
                            className={`listing-${listing.id}-prev absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg
                                className="w-4 h-4 text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className={`listing-${listing.id}-next absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg
                                className="w-4 h-4 text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </>
                )}

                {/* Favorite Button */}
                <button
                    type="button"
                    className="absolute bottom-4 right-4 w-8 h-8 flex items-center justify-center bg-transparent text-white hover:scale-110 transition-transform z-10"
                    onClick={(e) => {
                        e.stopPropagation();
                        onFavorite?.(listing.id);
                    }}
                >
                    <Heart className="w-6 h-6" />
                </button>
            </div>

            {/* Details */}
            <div>
                <div className="flex justify-between items-start mb-1">
                    <div className="flex items-end gap-1">
                        <h2 className="text-2xl font-serif text-brand-dark">
                            {listing.priceFormatted}
                        </h2>
                        {listing.listingType === "rental" && (
                            <span className="text-[10px] font-bold tracking-widest uppercase mb-1.5 text-gray-500">
                                / Month
                            </span>
                        )}
                    </div>
                </div>
                <p className="text-xs font-bold tracking-[0.1em] text-brand-dark uppercase mb-4">
                    {listing.address}, {listing.city}
                </p>

                <div className="flex items-center gap-6 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">
                    <span>{listing.beds} BR</span>
                    <span>
                        {listing.baths} BA{listing.halfBaths > 0 ? `, ${listing.halfBaths} HALF BA` : ""}
                    </span>
                    {listing.sqft && <span>{listing.sqft.toLocaleString()} SF</span>}
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-6 border bg-white flex items-center justify-center text-[6px] font-serif">
                            DE
                        </div>
                        <span className="text-[9px] font-bold tracking-[0.2em] text-brand-dark uppercase">
                            {listing.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
