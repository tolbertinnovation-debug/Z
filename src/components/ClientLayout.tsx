"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LiveChat from "./LiveChat";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith("/portal");

  return (
    <>
      {!isPortal && <Navbar />}
      <div className={isPortal ? "" : "flex-1"}>{children}</div>
      {!isPortal && <Footer />}
      {!isPortal && <LiveChat />}
    </>
  );
}
