import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchAllNewsletters } from '@/app/actions/newsletters'; // Using the server action we just made, or better, make a cached fetcher in lib
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
    title: 'Newsletters | Douglas Elliman',
    description: 'Explore our latest insights, magazines, and market reports.',
};

export default async function NewsletterGalleryPage() {
    // We can use the server action directly here as it's a server component
    const newsletters = await fetchAllNewsletters();

    return (
        <main className="min-h-screen bg-white">
            <Header />

            <div className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <div className="w-12 h-12 mx-auto mb-6 relative">
                            {/* Optional: Add a small icon or logo above title if desired, similar to WOE design */}
                            <Image
                                src="https://res.cloudinary.com/dk92v0fkk/image/upload/v1727311016/staging/zkbtspvuvdutxii11lzk.webp"
                                alt="Icon"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-serif tracking-widest mb-4 uppercase text-[#181728]">
                            NEWSLETTERS
                        </h1>
                        <p className="text-gray-500 font-light text-lg tracking-wide">
                            Discover our latest curated stories.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {newsletters.map((newsletter) => (
                            <Link
                                key={newsletter.id}
                                href={`/newsletters/${newsletter.slug}`}
                                className="group block"
                            >
                                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-gray-100">
                                    {newsletter.cover_image_url ? (
                                        <Image
                                            src={newsletter.cover_image_url}
                                            alt={newsletter.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                                </div>

                                <div className="text-center">
                                    <p className="text-xs font-medium tracking-[0.2em] text-gray-400 uppercase mb-2">
                                        {newsletter.category}
                                    </p>
                                    <h3 className="text-xl font-serif text-[#181728] uppercase group-hover:opacity-70 transition-opacity">
                                        {newsletter.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
