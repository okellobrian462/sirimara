'use client';

import dynamic from 'next/dynamic';

const FooterMap = dynamic(() => import('./FooterMap'), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
            Loading Map...
        </div>
    )
});

export default function FooterMapWrapper({ lat, lng }: { lat: number, lng: number }) {
    return <FooterMap lat={lat} lng={lng} />;
}
