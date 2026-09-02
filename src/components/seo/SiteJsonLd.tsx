import {
  CONTACT,
  DEFAULT_META_DESCRIPTION,
  LOGO_URL,
  SOCIALS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo/site";

interface SiteJsonLdProps {
  name?: string;
  logoUrl?: string;
  phone?: string;
  email?: string;
  address?: string;
}

// WebSite + Organization (RealEstateAgent) structured data, emitted on every page.
export default function SiteJsonLd({ name, logoUrl, phone, email, address }: SiteJsonLdProps) {
  const orgName = name || SITE_NAME;
  const orgLogo = logoUrl || LOGO_URL;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: orgName,
        description: DEFAULT_META_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": ["Organization", "RealEstateAgent"],
        "@id": `${SITE_URL}/#organization`,
        name: orgName,
        url: SITE_URL,
        logo: orgLogo,
        image: orgLogo,
        telephone: phone || CONTACT.phone,
        email: email || CONTACT.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: address || CONTACT.streetAddress,
          addressLocality: CONTACT.addressLocality,
          addressCountry: CONTACT.addressCountry,
        },
        sameAs: [
          SOCIALS.facebook,
          SOCIALS.instagram,
          SOCIALS.twitter,
          SOCIALS.linkedin,
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}