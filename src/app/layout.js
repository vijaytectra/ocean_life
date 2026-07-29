import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import GoToTopButton from "@/components/GoToTopButton";
import AdPopup from "@/components/AdPopup";
import Script from "next/script";
import FloatingEnquiry from "@/components/FloatingEnquiry";
import HideOnAdmin from "@/components/HideOnAdmin";
import {
  getFooterLogo,
  getHeaderLogo,
  getHeroVideoSrc,
  getPopupImage,
  isFloatingEnquiryEnabled,
} from "@/lib/siteContent";

/**
 * Roboto is applied through the `--font-roboto-sans` variable in globals.css.
 *
 * Previously globals.css declared `font-family: "Roboto", serif` — the literal
 * family name, which never matches the hashed family next/font generates. The
 * woff2 was downloaded on every page and then ignored, and body text actually
 * rendered in the serif fallback. Weights 400/500 are included because the
 * stylesheets use them; only 100/300 were loaded before, so everything else
 * was synthetically bolded by the browser.
 */
const roboto = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

const HERO_POSTER = "/hero-poster.webp";

export const metadata = {
  metadataBase: new URL("https://www.olipl.com"),
  title: "Ocean Lifespaces | Civil Construction Company in Chennai",
  description:
    "Build with confidence! Ocean Lifespaces India Pvt Ltd delivers Civil Construction Company in Chennai with innovation and trust.",
  keywords: "Ocean Lifespaces India Pvt Ltd",
  alternates: {
    canonical: "https://www.olipl.com/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Ocean Lifespaces India Pvt Ltd",
    siteName: "Ocean Lifespaces India Pvt Ltd",
    url: "https://www.olipl.com/",
    description:
      "Build with confidence! Ocean Lifespaces India Pvt Ltd delivers Civil Construction services in Chennai with innovation and trust.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocean Lifespaces India Pvt Ltd",
    description:
      "Build with confidence! Ocean Lifespaces India Pvt Ltd delivers Civil Construction services in Chennai with innovation and trust.",
  },
  verification: {
    google: "Lb7CitML3oiSoZZl3PGbiYCKCptQgyzb7f0odg_wunw",
  },
};

const STRUCTURED_DATA = [
  {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: "Ocean Lifespaces India Private Limited",
    image: "https://www.olipl.com/foot-logo.svg",
    description:
      "Ocean Lifespaces India Pvt Ltd – a trusted civil construction company in Chennai, building iconic spaces that blend innovation, quality, and lasting impact.",
    brand: {
      "@type": "Brand",
      name: "Civil Construction Company in Chennai",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.3",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "168",
    },
  },
  {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "Ocean Lifespaces India Private Limited",
    url: "https://www.olipl.com/",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://www.google.com/search?q=ocean+lifespace{search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ocean Lifespaces India Private Limited",
    alternateName: "Ocean Lifespaces",
    url: "https://www.olipl.com/",
    logo: "https://www.olipl.com/foot-logo.svg",
    sameAs: [
      "https://www.instagram.com/oceanlifespaces/",
      "https://www.facebook.com/ocean.net.in/",
      "https://www.linkedin.com/company/ocean-life-spaces-private-limited/",
    ],
  },
];

export default function RootLayout({ children }) {
  const headerLogo = getHeaderLogo();
  const footerLogo = getFooterLogo();
  const heroVideoSrc = getHeroVideoSrc();
  const popupImage = getPopupImage();
  const floatingEnquiry = isFloatingEnquiryEnabled();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Third-party origins used after load — resolved early, fetched late. */}
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Structured data is static markup, not a script that needs executing,
            so it is emitted directly instead of through next/script. */}
        {STRUCTURED_DATA.map((data, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
      </head>
      <body className={`${roboto.variable}`} suppressHydrationWarning>
        {/* ✅ Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M9PZQW94"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          ></iframe>
        </noscript>
        <Menu
          logo={headerLogo}
          heroVideoSrc={heroVideoSrc}
          heroPoster={HERO_POSTER}
        />
        {children}
        <HideOnAdmin>
          <Footer logo={footerLogo} />
        </HideOnAdmin>
        <GoToTopButton />
        <AdPopup imageUrl={popupImage} />
        <FloatingEnquiry enabled={floatingEnquiry} />

        {/* ✅ Google Tag Manager
            Was `strategy="beforeInteractive"`, which injects the loader into the
            document head and blocks the first render on a 115 KB third-party
            script (65% unused, 126 ms of blocking time). `lazyOnload` defers it
            until the page is idle; tag collection is unaffected. */}
        <Script id="gtm-script" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M9PZQW94');`}
        </Script>
      </body>
    </html>
  );
}
