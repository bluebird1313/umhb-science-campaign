"use client";

import { useEffect, useRef, useState } from "react";
import MolecularMotif from "./MolecularMotif";

interface StatProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

function AnimatedStat({ end, suffix = "", prefix = "", label, duration = 2000 }: StatProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [started, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="counter-number font-[var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold text-[#D4A843] mb-3">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="font-[var(--font-heading)] text-white/80 text-sm md:text-base tracking-[0.25em] uppercase">
        {label}
      </div>
    </div>
  );
}

export default function ByTheNumbers() {
  return (
    <section className="relative py-24 md:py-32 bg-[#3D1A78] overflow-hidden">
      {/* Molecular motif watermarks */}
      <MolecularMotif className="absolute top-10 left-10 w-48 h-48 text-white/5 hidden lg:block" />
      <MolecularMotif className="absolute bottom-10 right-10 w-56 h-56 text-white/5 hidden lg:block" />
      <MolecularMotif className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-white/[0.03]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h2 className="font-[var(--font-heading)] text-center text-white text-3xl md:text-4xl font-bold tracking-[0.15em] uppercase mb-4">
          Meeting the Growing Demand
        </h2>
        <p className="font-[var(--font-body)] text-center text-white/70 text-lg max-w-2xl mx-auto mb-16">
          From around 1,000 students in the 1920&rsquo;s to almost 3,300 today, UMHB&rsquo;s growth demands a science facility worthy of its mission.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-8">
          <AnimatedStat end={3300} label="Students" prefix="~" />
          <AnimatedStat end={90} suffix="+" label="Science Courses" />
          <AnimatedStat end={56000} label="Square Feet" suffix="" />
          <AnimatedStat end={13} label="Teaching & Research Labs" />
          <AnimatedStat end={3} label="Stories" />
        </div>
      </div>
    </section>
  );
}
