import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import GoToTopButton from "@/components/GoToTopButton";
import Script from "next/script";

const roboto = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: ["100", "300"],
  display: "swap",
});

export const metadata = {
  title: "Ocean Lifespaces | Civil Construction Company in Chennai",
  description:
    "Build with confidence! Ocean Lifespaces India Pvt Ltd delivers Civil Construction Company in Chennai with innovation and trust.",
  keywords: "Ocean Lifespaces India Pvt Ltd",
  alternates: {
    canonical: "https://www.olipl.com/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Tag Manager */}
        <Script defer id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M9PZQW94');`}
        </Script>

        {/* ✅ Google Site Verification */}
        <meta
          name="google-site-verification"
          content="Lb7CitML3oiSoZZl3PGbiYCKCptQgyzb7f0odg_wunw"
        />
        <meta name="robots" content="index, follow, noodp, noydir" />
        <meta property="og:title" content="Ocean Lifespaces India Pvt Ltd" />
        <meta
          property="og:site_name"
          content="Ocean Lifespaces India Pvt Ltd"
        />
        <meta property="og:url" content="https://www.olipl.com/" />
        <meta
          property="og:description"
          content="Build with confidence! Ocean Lifespaces India Pvt Ltd delivers Civil Construction services in Chennai with innovation and trust."
        />
        <meta property="og:type" content="website" />
        {/* ✅ Structured Data - Product */}
        <Script
          defer
          id="ld-product"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: "Ocean Lifespaces India Private Limited",
            image: "https://www.olipl.com/foot-logo.webp",
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
          })}
        </Script>

        {/* ✅ Structured Data - WebSite */}
        <Script
          defer
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
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
          })}
        </Script>

        {/* ✅ Structured Data - Organization */}
        <Script
          defer
          id="ld-organization"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Ocean Lifespaces India Private Limited",
            alternateName: "Ocean Lifespaces",
            url: "https://www.olipl.com/",
            logo: "https://www.olipl.com/foot-logo.webp",
            sameAs: [
              "https://www.instagram.com/oceanlifespaces/",
              "https://www.facebook.com/ocean.net.in/",
              "https://www.linkedin.com/company/ocean-life-spaces-private-limited/",
            ],
          })}
        </Script>
      </head>
      <body className={`${roboto.variable}`}>
        {/* ✅ Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M9PZQW94"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            strategy="lazyOnload"
          ></iframe>
        </noscript>
        <Menu />
        {children}
        <Footer />
        <GoToTopButton />
      </body>
    </html>
  );
}
