import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { ReactNode } from "react";
import { Onest } from "next/font/google";
import { ContactFormSectionButton } from "../components/ContactFormSectionButton";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Mentors’ Study Abroad | Study Abroad Counselling & Visa Experts",
    template: "%s | Mentors’ Study Abroad",
  },
  description:
    "Achieve your global dreams with Mentors’ Study Abroad. Expert counselling, university selection, admission support and hassle-free visa processing for top study destinations worldwide.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Mentors’ Study Abroad | Study Abroad Counselling & Visa Experts",
    description:
      "Get end-to-end guidance for admissions, visas and scholarships to top universities worldwide with Mentors’ Study Abroad.",
    url: "/",
    siteName: "Mentors’ Study Abroad",
    type: "website",
    images: [
      {
        url: "/hero-home.png",
        width: 1200,
        height: 630,
        alt: "Mentors’ Study Abroad - Achieve your global dreams",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mentors’ Study Abroad | Study Abroad Counselling & Visa Experts",
    description:
      "Personalised guidance for university applications, admissions and visa processing to help you study abroad confidently.",
    images: ["/hero-home.png"],
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
    canonical: "/",
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