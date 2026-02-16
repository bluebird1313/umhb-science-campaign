"use client";

import { useEffect, useState } from "react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="#naming"
      className={`sticky-cta ${visible ? "visible" : ""}`}
      aria-label="View naming opportunities"
    >
      <span className="flex items-center gap-2 px-6 py-3 bg-[#D4A843] text-white font-[var(--font-heading)] font-bold text-sm tracking-wider uppercase rounded-sm shadow-lg hover:bg-[#3D1A78] transition-colors duration-300">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
        Make Your Investment
      </span>
    </a>
  );
}
