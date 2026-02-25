"use client";

import Image from "next/image";
import { useState } from "react";

const floorLabels = ["First Floor", "Second Floor", "Third Floor"];

export default function NamingOpportunities() {
  const [activeFloor, setActiveFloor] = useState(0);

  return (
    <section id="naming" className="py-24 md:py-32 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[#4D008C] tracking-[0.15em] uppercase mb-4">
            Naming Opportunities
          </h2>
          <div className="w-16 h-1 bg-[#FFC425] mx-auto mb-6" />
          <p className="font-[var(--font-body)] text-gray-600 text-lg max-w-2xl mx-auto mb-4">
            Leave a lasting legacy by naming a space in the new Science Lab. Every investment advances faith-based science education for generations to come.
          </p>
          <p className="font-[var(--font-heading)] text-[#4D008C] text-lg font-semibold">
            Contact us to learn more about available spaces.
          </p>
        </div>

        {/* Floor tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {floorLabels.map((label, i) => (
            <button
              key={label}
              onClick={() => setActiveFloor(i)}
              className={`px-5 py-2.5 font-[var(--font-heading)] text-sm tracking-[0.1em] uppercase font-semibold transition-all duration-300 rounded-sm ${
                activeFloor === i
                  ? "bg-[#4D008C] text-white shadow-lg"
                  : "bg-white text-[#4D008C] hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Floor map image */}
        <div className="relative w-full rounded-sm overflow-hidden shadow-lg bg-white">
          <Image
            src={`/images/naming-floors/floor-${activeFloor + 1}.jpg`}
            alt={`${floorLabels[activeFloor]} naming opportunity map`}
            width={1400}
            height={900}
            className="w-full h-auto"
          />
        </div>

        {/* Action button below floor map */}
        <div className="flex justify-center mt-6 mb-4">
          <a
            href="mailto:advancement@umhb.edu?subject=Naming%20Inquiry%20-%20UMHB%20Science%20Lab"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#4D008C] text-white font-[var(--font-heading)] text-sm tracking-[0.1em] uppercase font-semibold rounded-sm hover:bg-[#3B0068] transition-colors duration-300 shadow-sm"
          >
            Inquire at advancement@umhb.edu
          </a>
        </div>

        {/* Challenge grant callout */}
        <div className="mt-10 bg-[#4D008C] rounded-sm p-8 md:p-12 text-center">
          <h3 className="font-[var(--font-heading)] text-[#FFC425] text-xl md:text-2xl font-bold tracking-wide uppercase mb-4">
            $4 Million Challenge Grant
          </h3>
          <p className="font-[var(--font-body)] text-white/90 text-lg max-w-2xl mx-auto mb-2">
            A generous anonymous donor has offered a $1 million gift plus a $4 million challenge grant. UMHB must raise an additional $5 million in new gifts by the end of 2026 to unlock the full challenge.
          </p>
          <p className="font-[var(--font-heading)] text-[#FFC425] font-bold text-lg">
            Your gift today counts toward the challenge.
          </p>
        </div>
      </div>
    </section>
  );
}
