"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MolecularMotif from "./MolecularMotif";

export default function InvestingInStudents() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-white overflow-hidden">
      <MolecularMotif className="absolute bottom-10 left-10 w-40 h-40 text-[#3D1A78]/5 hidden lg:block" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="/images/renderings/lobby-04.jpg"
                alt="Students collaborating in the science facility lobby"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#FEC324]/10 -z-10 rounded-sm" />
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3D1A78] tracking-wide uppercase mb-2">
              Investing in Students
            </h2>
            <h3 className="font-[var(--font-heading)] text-xl md:text-2xl text-[#FEC324] tracking-wide uppercase mb-6">
              Advancing the Mission
            </h3>
            <div className="w-12 h-1 bg-[#FEC324] mb-8" />

            <p className="font-[var(--font-body)] text-gray-700 text-lg leading-relaxed mb-6">
              The Science Facility represents a significant investment in the University of Mary Hardin-Baylor&rsquo;s commitment to Christ-centered higher education and academic excellence.
            </p>
            <p className="font-[var(--font-body)] text-gray-700 text-lg leading-relaxed mb-6">
              Designed to support innovative teaching, undergraduate research, and interdisciplinary collaboration, the facility brings together laboratories, research spaces, faculty offices, and student gathering areas to create an environment where learning and mentorship thrive.
            </p>
            <p className="font-[var(--font-body)] text-gray-700 text-lg leading-relaxed">
              Here, students are equipped to pursue scientific inquiry, healthcare careers, and graduate study while remaining grounded in UMHB&rsquo;s Christ-centered commitment to leadership, service, and faith-informed discernment in a global society.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
