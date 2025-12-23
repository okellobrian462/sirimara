import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SellHero from '@/components/sell/SellHero';
import SellStats from '@/components/sell/SellStats';
import SellAdvantage from '@/components/sell/SellAdvantage';
import SellSpotlight from '@/components/sell/SellSpotlight';
import SellStories from '@/components/sell/SellStories';
import SellValuation from '@/components/sell/SellValuation';
import SellContact from '@/components/sell/SellContact';

export const metadata = {
    title: 'Sell Your Home or Property | Douglas Elliman',
    description: 'Ready to sell? Douglas Elliman connects sellers with qualified buyers through expert strategies and a global network. Start your selling journey today.',
}

export default function SellPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <SellHero />
            <SellStats />
            <SellAdvantage />
            <SellSpotlight />
            <SellStories />
            <SellValuation />
            <SellContact />
            <Footer />
        </main>
    );
}
