import { fetchNavigationByLocations } from '@/lib/content/fetchNavigation';
import { fetchSiteConfig } from '@/lib/content/fetchSiteConfig';
import HeaderClient from '@/components/HeaderClient';

interface HeaderProps {
    theme?: 'light' | 'dark';
    isScrolled?: boolean;
}

export default async function Header({ theme = 'light', isScrolled }: HeaderProps) {
    const navigation = await fetchNavigationByLocations([
        'header_main',
        'header_secondary'
    ]);

    const mainNav = navigation.header_main || [];
    const secondaryNav = navigation.header_secondary || [];

    const config = await fetchSiteConfig();
    const logoSvg = config.logo_header_svg || null;

    return (
        <HeaderClient
            theme={theme}
            isScrolled={isScrolled}
            mainNav={mainNav}
            secondaryNav={secondaryNav}
            logoSvg={logoSvg}
        />
    );
}
