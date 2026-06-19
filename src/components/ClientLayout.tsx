"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LiveChat from "./LiveChat";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith("/portal");
  const isAdmin = pathname?.startsWith("/admin");
  const isAgent = pathname?.startsWith("/agent");
  const isBare = isPortal || isAdmin || isAgent;

  return (
    <>
      {!isBare && <Navbar />}
      <div className={isBare ? "" : "flex-1"}>{children}</div>
      {!isBare && <Footer />}
      {!isBare && <LiveChat />}
    </>
  );
}
