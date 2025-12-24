'use client';

import Link from 'next/link';
import { useModal } from '@/context/ModalContext';

interface FooterLinkProps {
    link: {
        id: string;
        label: string;
        url: string;
        opens_in_new_tab: boolean;
    };
    className?: string;
}

export default function FooterLink({ link, className = "hover:opacity-80 transition-opacity uppercase tracking-wider" }: FooterLinkProps) {
    const { openConnectModal } = useModal();

    // Handle Contact Us link
    if (link.url === '#contact' || link.label.toLowerCase() === 'contact us') {
        return (
            <button
                onClick={openConnectModal}
                className={`text-left ${className}`}
            >
                {link.label}
            </button>
        );
    }

    // Handle mailto links
    if (link.url.startsWith('mailto:')) {
        return (
            <a
                href={link.url}
                className={className}
            >
                {link.label}
            </a>
        );
    }

    // Handle external links
    if (link.url.startsWith('http')) {
        return (
            <a
                href={link.url}
                target={link.opens_in_new_tab ? '_blank' : undefined}
                rel={link.opens_in_new_tab ? 'noopener noreferrer' : undefined}
                className={className}
            >
                {link.label}
            </a>
        );
    }

    // Handle internal links
    return (
        <Link
            href={link.url}
            className={className}
        >
            {link.label}
        </Link>
    );
}
