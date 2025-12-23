import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AgentProfileHero from '@/components/agents/profile/AgentProfileHero';
import AgentProfileNav from '@/components/agents/profile/AgentProfileNav';
import AgentProfileBio from '@/components/agents/profile/AgentProfileBio';
import AgentProfileValuation from '@/components/agents/profile/AgentProfileValuation';
import AgentProfileContact from '@/components/agents/profile/AgentProfileContact';

// Mock data based on the provided HTML/Screenshots for Jack Berkey
const MOCK_AGENT = {
    name: "Jack Berkey",
    title: "Broker Associate",
    license: "FA.100100545",
    phone: "970.925.8810",
    address: "630 EAST HYMAN AVE, SUITE 101, ASPEN, CO 81611",
    email: "JACK.BERKEY@ELLIMAN.COM",
    // Using the headshot from the HTML
    image: "https://res.cloudinary.com/douglas-elliman/image/upload/v1/Headshots/433/eswbdbqe4ztrymkmlrln",
    bio: `Jack Berkey is a real estate professional currently residing on the west side of Los Angeles. Born and raised in Chappaqua, New York, Jack graduated from the University of Michigan’s Ross School of Business with a Bachelor’s in Business Administration. In LA, Jack serves as a Development and Acquisitions Associate to Lincoln Avenue Communities. The company invests in the rehabilitation and development of affordable housing nationwide and in 2024 was named Affordable Housing Finance’ #1 Developer of the year.

Jack has participated in a variety of complex real estate transactions involving the acquisition, rehabilitation and development of Section 42 and Section 8 assets. Notable transactions include the acquisition of a 661-unit Section 42 project in Sacramento, CA, the acquisition of Lakewood Terrace, a 132-unit Section 8 project located in Lakeland, Florida, as well as the Tax Credit Resyndication of Herrington Mill Apartments, a 292-unit Section 42 project located in Lawrenceville, GA.

Most recently, Jack and his team have closed on a 44-acre land parcel located in Columbus, Ohio. Construction is currently in progress for the development of a 321-unit Build-To-Rent project, that will include 2, 3- and 4-bedroom two-story townhomes and duplexes. 100% of units will be affordable to individuals and families making no more than 60% of AMI. The transaction marks the biggest multifamily bond deal ever transacted in the state of Ohio, and LACs first transaction in the state.

In his daily work, Jack brings a strong work ethic and an analytical mindset to his role. His commitment to excellence and work ethics make him a trusted contributor. He is attentive to detail and aims to find solutions. For fun, Jack loves to spend time in the mountains and working out. He has run two TCS New York City Marathons and has competed in Aspen’s Audi Power of Four 50K Trail Run. He can frequently be found swimming in the Pacific ocean or hiking the Highlands bowl. His other interests include cooking and exotic cars. He admires vintage furniture, art and complex architecture.

Jack’s family now lives in Old Snowmass, Colorado, following their relocation from New York. Jack is frequently spending time in the mountain west and understands how to connect various parties across diverse circles. He remains committed to assisting all of whom he works with and should be known for his ability to create and succeed.`
};

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AgentProfilePage(props: PageProps) {
    const params = await props.params;
    // In a real app, we would fetch data based on params.id
    // For this clone task, we use the mock data

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <AgentProfileHero agent={MOCK_AGENT} />
            <AgentProfileNav />
            <AgentProfileBio name={MOCK_AGENT.name} bio={MOCK_AGENT.bio} />
            <AgentProfileValuation />
            <AgentProfileContact name={MOCK_AGENT.name} />
            <Footer />
        </main>
    );
}
