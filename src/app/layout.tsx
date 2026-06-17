import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <LiveChat />
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      </body>
    </html>
  );
}
