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