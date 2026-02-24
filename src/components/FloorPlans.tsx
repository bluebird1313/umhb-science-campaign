"use client";

import Image from "next/image";
import { useState, useRef } from "react";

const floors = [
  {
    id: "first",
    label: "First Floor",
    image: "/images/floor-plans/first-floor.jpg",
    highlights: [
      "Lobby & Student Gathering Space",
      "Conference Room",
      "Faculty & Staff Offices",
      "North & South Entry Plaza",
      "Maintenance",
    ],
  },
  {
    id: "second",
    label: "Second Floor",
    image: "/images/floor-plans/second-floor.jpg",
    highlights: [
      "Teaching Labs (Biology, Chemistry)",
      "Microbiology Prep Room",
      "Research Methods Lab",
      "Memorial Hall",
      "Open Atrium to Below",
    ],
  },
  {
    id: "third",
    label: "Third Floor",
    image: "/images/floor-plans/third-floor.jpg",
    highlights: [
      "General & Organic Chemistry Labs",
      "Physical Chemistry Lab",
      "Analytical/Physical College Chemistry",
      "Biology & Chemistry Research Labs",
      "Instrument Lab",
    ],
  },
];

const legend = [
  { color: "#F4C2C2", label: "Offices" },
  { color: "#B5D8B5", label: "Labs" },
  { color: "#F5E6A3", label: "Commons / Corridors" },
  { color: "#C4C4C4", label: "Maintenance" },
];

export default function FloorPlans() {
  const [activeFloor, setActiveFloor] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="floor-plans" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3D1A78] tracking-[0.15em] uppercase mb-4">
            Floor Plans
          </h2>
          <div className="w-16 h-1 bg-[#FEC324] mx-auto mb-6" />
          <p className="font-[var(--font-body)] text-gray-600 text-lg max-w-2xl mx-auto">
            56,000 square feet across three floors, thoughtfully designed for teaching, research, and collaboration.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center gap-2 mb-8">
          {floors.map((floor, i) => (
            <button
              key={floor.id}
              onClick={() => {
                setActiveFloor(i);
                setIsZoomed(false);
              }}
              className={`px-6 py-3 font-[var(--font-heading)] text-sm tracking-[0.15em] uppercase font-semibold transition-all duration-300 rounded-sm ${
                activeFloor === i
                  ? "bg-[#3D1A78] text-white shadow-lg"
                  : "bg-gray-100 text-[#3D1A78] hover:bg-gray-200"
              }`}
            >
              {floor.label}
            </button>
          ))}
        </div>

        {/* Floor plan image */}
        <div className="relative bg-gray-50 rounded-sm overflow-hidden shadow-lg mb-8">
          <div
            ref={imageContainerRef}
            className={`relative w-full cursor-zoom-in transition-transform duration-500 ${
              isZoomed ? "scale-150 cursor-zoom-out" : ""
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={floors[activeFloor].image}
                alt={`${floors[activeFloor].label} plan of UMHB Science Facility`}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm py-3 font-[var(--font-body)]">
            Click to {isZoomed ? "zoom out" : "zoom in"}
          </p>
        </div>

        {/* Legend + highlights */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Color legend */}
          <div className="bg-gray-50 p-6 rounded-sm">
            <h3 className="font-[var(--font-heading)] text-[#3D1A78] text-sm tracking-[0.2em] uppercase font-bold mb-4">
              Color Legend
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {legend.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-sm border border-gray-300"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-[var(--font-body)] text-gray-700 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floor highlights */}
          <div className="bg-gray-50 p-6 rounded-sm">
            <h3 className="font-[var(--font-heading)] text-[#3D1A78] text-sm tracking-[0.2em] uppercase font-bold mb-4">
              {floors[activeFloor].label} Highlights
            </h3>
            <ul className="space-y-2">
              {floors[activeFloor].highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 text-[#FEC324] flex-shrink-0 mt-0.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-[var(--font-body)] text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
