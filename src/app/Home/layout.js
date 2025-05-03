// layout.js

import "./globals.css";
import ShadowCursor from "@/components/Cursor/index";
import Navbar from "@/components/Navbar";
import SocialMedia from "@/components/SocialMedia";
import Footer from "@/components/Footer/Footer";
import ChatbotComponent from "@/components/Chatbot/Chatbot";
import CookieConsent from "@/components/CookieConsent";
import Script from "next/script";
import * as gtag from "@/lib/gtag";
import Analytics from "@/components/Analytics/Analytics"; 

export const metadata = {
  title: "Custom Software & AI Solution | SML NexGen",
  description:
    "SML NexGen LLP - AI-driven software, cloud solutions, & IT consulting. Future-proof your business with innovative technology. Contact us today!",
  robots: { index: true, follow: true },
  authors: [{ name: "SMLNEXGEN-LLP" }],
  openGraph: {
    title:
      "SMLNEXGEN LLP | Leading Digital Solutions for Web, Mobile & Marketing",
    description:
      "SMLNEXGEN LLP is a leading provider of innovative digital solutions, specializing in website development, mobile app creation, custom software, and digital marketing. Based in Hosur, Tamil Nadu, we help businesses navigate the digital landscape with ease and efficiency.",
    url: "https://www.smlnexgenllp.com/",
    images: [{ url: "https://www.smlnexgenllp.com/sml-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@smlnexgenllp",
    title:
      "SMLNEXGEN LLP | Leading Digital Solutions for Web, Mobile & Marketing",
    description:
      "SMLNEXGEN LLP is a leading provider of innovative digital solutions, specializing in website development, mobile app creation, custom software, and digital marketing. Based in Hosur, Tamil Nadu, we help businesses navigate the digital landscape with ease and efficiency.",
    images: ["https://www.smlnexgenllp.com/sml-logo.png"],
  },
};

export default function RootLayout({ children }) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SMLNEXGEN LLP",
    url: "https://www.smlnexgenllp.com/",
    logo: "https://www.smlnexgenllp.com/sml-logo.png",
    sameAs: [
      "https://www.facebook.com/people/Smlnexgen-Portfolio/pfbid02ve9NNzpYyKSZTSqEEzTGAXpUiK4xKbN16d6238MiUdnPrnbK66BW7213LvBMFVQxl/",
      "https://x.com/smlnexgenllp",
      "https://www.linkedin.com/company/smlnexgen-llp",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91 94870-84117",
      contactType: "Customer Service",
      areaServed: "IN",
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "2nd Floor, JPS Tower, Hosur - Thally Rd",
      addressLocality: "Hosur",
      addressRegion: "Tamil Nadu",
      postalCode: "635109",
      addressCountry: "IN",
    },
  };

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="keywords"
          content="SMLNEXGEN LLP, digital solutions, website development, mobile app development, custom software development, digital marketing, strategic digital marketing, SEO services, eCommerce development, mobile app design, software solutions, digital transformation, IT consulting, web design, website redesign, mobile application solutions, IT Company Hosur,IT Bengaluru, Hosur, Tamil Nadu, India"
        />
        <link rel="canonical" href="https://www.smlnexgenllp.com/" />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaMarkup),
          }}
          type="application/ld+json"
        />
      </head>
      <body>
        {/* Google Analytics Scripts */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        <Navbar />
        <ShadowCursor />
        <SocialMedia />
        <Analytics />
        {children}
        <ChatbotComponent />
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
