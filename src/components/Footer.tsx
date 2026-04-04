import { fetchSiteConfig } from '@/lib/content/fetchSiteConfig';
import { fetchNavigationByLocations } from '@/lib/content/fetchNavigation';
import Link from 'next/link';
import FooterMarkets from '@/components/FooterMarkets';
import FooterLink from '@/components/FooterLink';
import FooterNewsletter from '@/components/FooterNewsletter';
import FooterMapWrapper from '@/components/FooterMapWrapper';

export default async function Footer() {
    const config = await fetchSiteConfig();
    const navigation = await fetchNavigationByLocations([
        'footer_company',
        'footer_resources',
        'footer_portfolio',
        'footer_markets',
        'footer_legal'
    ]);

    // Extract config values with fallbacks
    const contactPhone = config.phone || '';
    const contactEmail = config.email || '';
    const contactAddress = config.contact_address || '';
    const socialFacebook = config.facebook_url || '#';
    const socialTwitter = config.twitter_url || '#';
    const socialInstagram = config.instagram_url || '#';
    const socialLinkedin = config.linkedin_url || '#';
    const siteName = (config.company_name ?? 'Sirimara Real Estate').toUpperCase();
    const location = config.location;
    const keepingUpTitle = config.footer_keepingup_title || 'Keep up to date with Sirimara Realty';

    // Extract footer section titles
    const footerTitles = config.footer_section_titles ?? {
        company_title: 'Company',
        resources_title: 'Resources',
        portfolio_title: 'Brand Portfolio',
        markets_title: 'Our Markets'
    };

    const companyLinks = navigation.footer_company || [];
    const resourcesLinks = navigation.footer_resources || [];
    const portfolioLinks = navigation.footer_portfolio || [];
    const marketsLinks = navigation.footer_markets || [];
    const legalLinks = navigation.footer_legal || [];

    return (
        <footer className="bg-brand-primary text-white pt-16 pb-8">
            <div className="px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 items-start">
                    
                    {/* Newsletter Card - Spans 4 columns */}
                    <div className="md:col-span-4 h-full min-h-[280px]">
                        <FooterNewsletter title={keepingUpTitle} />
                    </div>

                    {/* Navigation Links - Spans 4 columns (2 each) */}
                    <div className="md:col-span-4 grid grid-cols-2 gap-8">
                        {/* Company Section */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-white/80">{footerTitles.company_title}</h3>
                            <ul className="space-y-4 text-xs font-bold tracking-[0.1em] uppercase text-white hover:[&_a]:opacity-70 transition-opacity">
                                {companyLinks.map((link) => (
                                    <li key={link.id}>
                                        <FooterLink link={link} />
                                    </li>
                                ))}
                                {/* Re-map resources here for simpler 2-col visual stack */}
                                {resourcesLinks.map((link) => (
                                    <li key={link.id}>
                                        <FooterLink link={link} />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Brand Portfolio Section */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-white/80">{footerTitles.portfolio_title}</h3>
                            <ul className="space-y-4 text-xs font-bold tracking-[0.1em] uppercase text-white hover:[&_a]:opacity-70 transition-opacity">
                                {portfolioLinks.map((link) => (
                                    <li key={link.id}>
                                        <FooterLink link={link} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Location Map Embed - Spans 4 columns */}
                    <div className="md:col-span-4 h-full min-h-[280px] flex flex-col relative z-0">
                        <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-white/80 mb-6">Location</h3>
                        <div className="bg-gray-800 flex-1 relative w-full overflow-hidden min-h-[200px]">
                            {location?.lat && location?.lng ? (
                                <FooterMapWrapper lat={location.lat} lng={location.lng} />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm p-4 text-center">
                                    Location coordinates not configured in CMS
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Our Markets Expandable Section */}
                <FooterMarkets markets={marketsLinks} title={footerTitles.markets_title} />

                {/* Bottom Footer */}
                <div className="border-t border-white/20 pt-8">
                    <div className="flex flex-wrap gap-6 text-xs mb-6 uppercase tracking-wider">
                        {legalLinks.slice(0, 2).map((link) => (
                            <Link
                                key={link.id}
                                href={link.url}
                                className="hover:opacity-80 transition-opacity"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex gap-6 mb-8">
                        <a href={socialFacebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                        <a href={socialTwitter} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                        </a>
                        <a href={socialInstagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                        <a href={socialLinkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>

                    {/* Legal Document Links */}
                    <div className="mb-8 space-y-2">
                        {legalLinks.slice(2).map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target={link.opens_in_new_tab ? '_blank' : undefined}
                                rel={link.opens_in_new_tab ? 'noopener noreferrer' : undefined}
                                className="block text-xs underline hover:opacity-80 transition-opacity uppercase tracking-wider"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {config.footer_disclaimer_1 && (
                        <p className="text-xs text-white/80 leading-relaxed mb-4 uppercase">
                            {config.footer_disclaimer_1}
                        </p>
                    )}

                    <p className="text-xs text-white/80 leading-relaxed mb-4">
                        {contactAddress && `${contactAddress}. `}{contactPhone && `${contactPhone} `}© {new Date().getFullYear()} {siteName}.
                        {config.footer_disclaimer_2 && ` ${config.footer_disclaimer_2}`}
                    </p>

                    {config.footer_disclaimer_3 && (
                        <p className="text-xs text-white/80 leading-relaxed mb-4">
                            {config.footer_disclaimer_3}
                        </p>
                    )}

                    <p className="text-xs text-white/80">
                        {config.footer_powered_by ?? 'POWERED BY PURLIN.AI'}
                    </p>
                </div>
            </div>
        </footer>
    );
}
