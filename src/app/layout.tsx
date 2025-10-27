export const metadata = {
  title: "Study Abroad",
  description: "Explore study abroad opportunities and services.",
};
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ContactFormSection } from "../components/contactFormSection";
import type { ReactNode } from "react";
import { Onest } from "next/font/google";
import { ContactFormSectionButton } from "../components/ContactFormSectionButton";


const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K4HGZ5X6');`,
          }}
        />
        {/* End Google Tag Manager */}

        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Remove browser extension attributes that cause hydration mismatches
              (function() {
                const removeExtensionAttributes = () => {
                  const elements = document.querySelectorAll('[bis_skin_checked]');b
                  elements.forEach(el => {
                    el.removeAttribute('bis_skin_checked');
                  });
                };

                // Run immediately when DOM is ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', removeExtensionAttributes);
                } else {
                  removeExtensionAttributes();
                }

                // Use MutationObserver to watch for new attributes added by extensions
                const observer = new MutationObserver((mutations) => {
                  mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'bis_skin_checked') {
                      const target = mutation.target;
                      if (target.hasAttribute('bis_skin_checked')) {
                        target.removeAttribute('bis_skin_checked');
                      }
                    }
                  });
                });

                // Start observing when DOM is ready
                const startObserver = () => {
                  observer.observe(document.body, {
                    attributes: true,
                    attributeFilter: ['bis_skin_checked'],
                    subtree: true
                  });
                };

                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', startObserver);
                } else {
                  startObserver();
                }
              })();
            `,
          }}
        />
      </head>
      <body className={onest.variable} suppressHydrationWarning={true} >
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
        <main className="pt-[120px] sm:pt-[140px]">
          {children}
        </main>
        <ContactFormSectionButton />
        <Footer />
      </body>
    </html>
  );
}