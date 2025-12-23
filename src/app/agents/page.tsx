import AgentsHero from '@/components/agents/AgentsHero';
import AgentsFeatures from '@/components/agents/AgentsFeatures';
import AgentsStats from '@/components/agents/AgentsStats';
import AgentsInsider from '@/components/agents/AgentsInsider';
import AgentsContact from '@/components/agents/AgentsContact';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AgentsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <AgentsHero />
            <AgentsFeatures />
            <AgentsStats />
            <AgentsInsider />
            <AgentsContact />
            <Footer />
        </main>
    );
}
