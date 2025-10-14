export const metadata = {
  title: "Study Abroad",
  description: "Explore study abroad opportunities and services.",
};
import "./globals.css";
import Navbar from "../components/Navbar-sticky";
import Footer from "../components/Footer";
import { ContactFormSection } from "../components/contactFormSection";
import type { ReactNode } from "react";
import { Onest } from "next/font/google";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Remove browser extension attributes that cause hydration mismatches
              (function() {
                const removeExtensionAttributes = () => {
                  const elements = document.querySelectorAll('[bis_skin_checked]');
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
        <Navbar />
        <main>
          {children}
        </main>
        <ContactFormSection />
        <Footer />
      </body>
    </html>
  );
}