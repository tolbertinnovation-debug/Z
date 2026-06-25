import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Tolbert Innovation Hub – Study Abroad Portal | Liberia",
  description: "Discover international universities, compare programs, find scholarships, and apply online. Helping students in Liberia access world-class education in India and North Cyprus.",
  keywords: ["study abroad Liberia", "international universities", "scholarships Liberia", "education abroad", "Tolbert Innovation Hub"],
  openGraph: {
    title: "Tolbert Innovation Hub – Study Abroad Portal",
    description: "Your gateway to international education from Liberia",
    type: "website",
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://opportunityliberia.org/#organization",
      "name": "Tolbert Innovation Hub",
      "alternateName": "OpportunityLiberia.org",
      "url": "https://opportunityliberia.org",
      "logo": "https://opportunityliberia.org/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+231-77-895-6979",
        "contactType": "customer service",
        "availableLanguage": "English"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Monrovia",
        "addressCountry": "LR"
      },
      "description": "Helping students in Liberia discover international universities, apply with confidence, and receive expert guidance every step of the way.",
      "sameAs": []
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://opportunityliberia.org/#educational-org",
      "name": "Tolbert Innovation Hub Study Abroad Portal",
      "url": "https://opportunityliberia.org",
      "description": "Study abroad portal connecting Liberian students to 17 partner universities in India and North Cyprus.",
      "areaServed": "Liberia"
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ClientLayout>{children}</ClientLayout>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      </body>
    </html>
  );
}
