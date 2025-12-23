import { fetchNavigationByLocations } from '@/lib/content/fetchNavigation';
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

    return (
        <HeaderClient
            theme={theme}
            isScrolled={isScrolled}
            mainNav={mainNav}
            secondaryNav={secondaryNav}
        />
    );
}
