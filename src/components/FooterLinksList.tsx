import Link from 'next/link';

interface FooterLink {
    id: string;
    label: string;
    url: string;
    opens_in_new_tab?: boolean;
}

interface FooterLinksListProps {
    title: string;
    links: FooterLink[];
}

export default function FooterLinksList({ title, links }: FooterLinksListProps) {
    return (
        <div>
            <h3 className="text-sm tracking-widest uppercase mb-6">{title}</h3>
            <ul className="space-y-3 text-sm">
                {links.map((link) => (
                    <li key={link.id}>
                        {link.url.startsWith('mailto:') ? (
                            <a
                                href={link.url}
                                className="hover:opacity-80 transition-opacity uppercase tracking-wider"
                            >
                                {link.label}
                            </a>
                        ) : link.url.startsWith('http') ? (
                            <a
                                href={link.url}
                                target={link.opens_in_new_tab ? '_blank' : undefined}
                                rel={link.opens_in_new_tab ? 'noopener noreferrer' : undefined}
                                className="hover:opacity-80 transition-opacity uppercase tracking-wider"
                            >
                                {link.label}
                            </a>
                        ) : (
                            <Link
                                href={link.url}
                                className="hover:opacity-80 transition-opacity uppercase tracking-wider"
                            >
                                {link.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
