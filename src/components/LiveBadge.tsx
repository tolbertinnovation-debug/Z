"use client";
import { useEffect, useState } from "react";

export default function LiveBadge() {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">
      <span className={`w-1.5 h-1.5 rounded-full bg-green-500 transition-opacity duration-500 ${pulse ? "opacity-100" : "opacity-30"}`} />
      LIVE
    </span>
  );
}
