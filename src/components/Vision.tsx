"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Vision() {
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
    <section id="vision" ref={sectionRef} className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* President's quote */}
        <div
          className={`max-w-4xl mx-auto text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="w-16 h-1 bg-[#FFC425] mx-auto mb-10" />
          <blockquote className="font-[var(--font-quote)] text-2xl md:text-3xl lg:text-4xl text-[#4D008C] italic leading-relaxed mb-8">
            &ldquo;This new science lab facility will be a beautiful and modern addition to our campus that will open doors to countless learning opportunities for UMHB students.&rdquo;
          </blockquote>
          <cite className="not-italic font-[var(--font-heading)] text-[#4D008C]/70 text-base tracking-[0.2em] uppercase">
            &mdash; Randy O&rsquo;Rear, President
          </cite>
        </div>

        {/* Case for support with image */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[#4D008C] tracking-wide uppercase mb-6">
              A New Era of Science
            </h2>
            <div className="w-12 h-1 bg-[#FFC425] mb-8" />
            <p className="font-[var(--font-body)] text-gray-700 text-lg leading-relaxed mb-6">
              At UMHB, we believe the pursuit of scientific knowledge is an act of stewardship&mdash;an opportunity to better understand and care for the world God has entrusted to us. Yet to prepare students for today&rsquo;s challenges, we know they need more than classrooms and labs; they need environments where collaboration, discovery, and mentorship can thrive together.
            </p>
            <p className="font-[var(--font-body)] text-gray-700 text-lg leading-relaxed mb-6">
              Because of faithful partners like you, we have the opportunity to create a new science lab that brings students and faculty from across the natural sciences into one shared space to study, teach, and innovate side by side.
            </p>
            <p className="font-[var(--font-body)] text-gray-700 text-lg leading-relaxed">
              Your generosity makes this vision possible. By helping create this new home for science at UMHB, you are opening doors for students to discover their calling, pursue breakthrough ideas, and gain a fuller understanding of the interconnected world they are preparing to serve.
            </p>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="/images/renderings/lobby-01.jpg"
                alt="Science lab lobby rendering — students gathering in modern atrium"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Purple accent block */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#4D008C]/10 -z-10 rounded-sm" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#FFC425]/10 -z-10 rounded-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}
