"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "Twelve Teaching Labs",
    description:
      "Modern, inquiry-based learning environments equipped with flexible workstations, smart technology, and real-time data collection tools.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611l-.772.13c-3.052.513-6.174.513-9.226 0l-.772-.13c-1.717-.293-2.299-2.379-1.067-3.61L9.4 15.3" />
      </svg>
    ),
  },
  {
    title: "Two Research Labs",
    description:
      "Advanced biology and chemistry research labs with cutting-edge equipment for faculty and student collaboration on real-world discoveries.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
  },
  {
    title: "Student Gathering Spaces",
    description:
      "A versatile first-floor atrium with adaptable seating, flexible study commons, and spaces for presentations and collaborative events.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "37 Faculty & Staff Offices",
    description:
      "Located near teaching labs to foster mentorship, innovation, and a seamless connection between instruction and research.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008V10.5Zm0 3h.008v.008h-.008V13.5Zm0 3h.008v.008h-.008V16.5Z" />
      </svg>
    ),
  },
];

const galleryImages = [
  {
    src: "/images/renderings/north-east-corner.jpg",
    alt: "Northeast corner view of UMHB Science Facility",
    caption: "Northeast Corner",
  },
  {
    src: "/images/renderings/lobby-02.jpg",
    alt: "First-floor lobby and student gathering space",
    caption: "Student Gathering Space",
  },
  {
    src: "/images/renderings/southeast-corner.jpg",
    alt: "Southeast corner view showing main entrance",
    caption: "Southeast Corner",
  },
  {
    src: "/images/renderings/lobby-03.jpg",
    alt: "Multi-story atrium with natural light",
    caption: "Three-Story Atrium",
  },
];

export default function Facility() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(ref);
      return observer;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <section id="facility" className="py-24 md:py-32 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[#4D008C] tracking-[0.15em] uppercase mb-4">
            The Facility
          </h2>
          <div className="w-16 h-1 bg-[#FFC425] mx-auto mb-6" />
          <p className="font-[var(--font-body)] text-gray-600 text-lg max-w-2xl mx-auto">
            Three stories of modern labs, collaborative spaces, and faculty offices — designed for the next century of scientific discovery.
          </p>
        </div>

        {/* Image gallery */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`group relative aspect-[16/10] rounded-sm overflow-hidden shadow-lg transition-all duration-700 ${
                visibleCards.has(i) ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-6 font-[var(--font-heading)] text-white text-lg tracking-wide">
                {img.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-sm shadow-sm hover:shadow-lg transition-shadow duration-300 border-t-4 border-[#4D008C]"
            >
              <div className="text-[#FFC425] mb-4">{feature.icon}</div>
              <h3 className="font-[var(--font-heading)] text-[#4D008C] text-lg font-bold tracking-wide uppercase mb-3">
                {feature.title}
              </h3>
              <p className="font-[var(--font-body)] text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
