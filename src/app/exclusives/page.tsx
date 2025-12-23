import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExclusivesHero from '@/components/exclusives/ExclusivesHero';
import ExclusivesFilterBar from '@/components/exclusives/ExclusivesFilterBar';
import ExclusivesGrid from '@/components/exclusives/ExclusivesGrid';

export const metadata = {
    title: 'Luxury Homes for Sale & Real Estate | Douglas Elliman',
    description: 'View luxury homes for sale. Find your dream property at Elliman.com',
}

export default function ExclusivesPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <ExclusivesHero />
            <ExclusivesFilterBar />
            <ExclusivesGrid />
            <Footer />
        </main>
    );
}
