import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { ReactNode } from "react";
import { Onest } from "next/font/google";
import { ContactFormSectionButton } from "../components/ContactFormSectionButton";
import Script from "next/script";
import type { Metadata } from "next";

// Get the base URL from environment or default to the production domain
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.studyabroadmentors.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Mentors' Study Abroad | Study Abroad Counselling & Visa Experts",
    template: "%s | Mentors' Study Abroad",
  },
  description:
    "Achieve your global dreams with Mentors' Study Abroad. Expert counselling, university selection, admission support and hassle-free visa processing for top study destinations worldwide.",
  keywords: [
    "study abroad",
    "study abroad counselling",
    "visa experts",
    "university selection",
    "study in Australia",
    "study in USA",
    "study in UK",
    "study in Canada",
    "study abroad Bangladesh",
    "Mentors Study Abroad"
  ],
  authors: [{ name: "Mentors' Study Abroad" }],
  creator: "Mentors' Study Abroad",
  publisher: "Mentors' Study Abroad",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon" }
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/favicon.ico",
  openGraph: {
    title: "Mentors' Study Abroad | Study Abroad Counselling & Visa Experts",
    description:
      "Get end-to-end guidance for admissions, visas and scholarships to top universities worldwide with Mentors' Study Abroad.",
    url: baseUrl,
    siteName: "Mentors' Study Abroad",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${baseUrl}/hero-home.png`,
        width: 1200,
        height: 630,
        alt: "Mentors' Study Abroad - Achieve your global dreams",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mentors' Study Abroad | Study Abroad Counselling & Visa Experts",
    description:
      "Personalised guidance for university applications, admissions and visa processing to help you study abroad confidently.",
    images: [`${baseUrl}/hero-home.png`],
    creator: "@MentorsStudyAbroad",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    // Add Google Search Console verification if you have it
    // google: "your-google-verification-code",
  },
};

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* Explicit favicon links for better compatibility */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K4HGZ5X6');`}
        </Script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Handle browser extension attributes that cause hydration mismatches
              (function() {
                // Wait for React to hydrate before cleaning up
                const cleanup = () => {
                  // Remove problematic attributes that extensions add
                  if (document.documentElement.hasAttribute('webcrx')) {
                    document.documentElement.removeAttribute('webcrx');
                  }
                  if (document.body.hasAttribute('bis_skin_checked')) {
                    document.body.removeAttribute('bis_skin_checked');
                  }
                };

                // Run cleanup after React hydration
                if (document.readyState === 'complete') {
                  setTimeout(cleanup, 200);
                } else {
                  window.addEventListener('load', () => setTimeout(cleanup, 200));
                }
              })();
            `,
          }}
        />
      </head>
      <body className={onest.variable} suppressHydrationWarning={true}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K4HGZ5X6"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Navbar />
        <main>
          {children}
        </main>
        <ContactFormSectionButton />
        <Footer />
      </body>
    </html>
  );
}