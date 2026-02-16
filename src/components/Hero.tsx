"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import MolecularMotif from "./MolecularMotif";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;
      const scrollY = window.scrollY;
      imageRef.current.style.transform = `translateY(${scrollY * 0.3}px) scale(1.1)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <div ref={imageRef} className="absolute inset-0 scale-110">
        <Image
          src="/images/renderings/east-corner.jpg"
          alt="UMHB Science Facility rendering — east corner view"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Purple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3D1A78]/80 via-[#3D1A78]/60 to-[#2D1259]/90" />

      {/* Molecular motifs */}
      <MolecularMotif className="molecule-float absolute top-20 left-10 w-32 h-32 text-white/20 hidden md:block" />
      <MolecularMotif className="molecule-float-delay absolute top-40 right-16 w-24 h-24 text-white/15 hidden md:block" />
      <MolecularMotif className="molecule-float-slow absolute bottom-32 left-20 w-20 h-20 text-white/10 hidden lg:block" />
      <MolecularMotif className="molecule-float absolute bottom-20 right-32 w-28 h-28 text-white/15 hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* UMHB wordmark */}
        <p className="font-[var(--font-heading)] text-white/80 text-sm tracking-[0.4em] uppercase mb-6">
          University of Mary Hardin-Baylor
        </p>

        {/* Main tagline */}
        <h1 className="font-[var(--font-heading)] text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.15em] uppercase leading-tight mb-6">
          A New Era
          <br />
          <span className="text-[#D4A843]">of Science</span>
        </h1>

        {/* Subtitle */}
        <p className="font-[var(--font-body)] text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-4">
          A 56,000 square foot, three-story science facility designed to inspire the next generation of scientists, researchers, and leaders.
        </p>

        {/* Gold accent line */}
        <div className="w-24 h-1 bg-[#D4A843] mx-auto mb-10" />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#vision"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#3D1A78] font-[var(--font-heading)] font-semibold text-lg tracking-wide rounded-sm hover:bg-[#D4A843] hover:text-white transition-all duration-300"
          >
            Explore the Vision
          </a>
          <a
            href="#naming"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#D4A843] text-[#D4A843] font-[var(--font-heading)] font-semibold text-lg tracking-wide rounded-sm hover:bg-[#D4A843] hover:text-white transition-all duration-300"
          >
            Naming Opportunities
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          className="opacity-60"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}
