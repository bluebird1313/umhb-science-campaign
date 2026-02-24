"use client";

import { useState } from "react";

interface NamingItem {
  name: string;
  price: string;
  floor: number;
  category: "building" | "lab" | "office" | "commons" | "other";
  status: "available" | "reserved" | "named";
  donor?: string;
}

const namingData: NamingItem[] = [
  // $1,000,000 Tier
  { name: "Lobby", price: "$1,000,000", floor: 1, category: "commons", status: "reserved" },

  // $500,000 Tier
  { name: "Study Room - W1", price: "$500,000", floor: 1, category: "commons", status: "available" },
  { name: "Study Room - W2", price: "$500,000", floor: 1, category: "commons", status: "available" },
  { name: "Study Room - E1", price: "$500,000", floor: 1, category: "commons", status: "named" },
  { name: "Office Suites - East", price: "$500,000", floor: 1, category: "office", status: "named" },
  { name: "North Entrance Plaza", price: "$500,000", floor: 4, category: "other", status: "available" },
  { name: "Research Center", price: "$500,000", floor: 3, category: "lab", status: "named" },

  // $150,000 Tier
  { name: "Conference Room", price: "$150,000", floor: 1, category: "commons", status: "available" },
  { name: "General Biology Lab", price: "$150,000", floor: 2, category: "lab", status: "available" },
  { name: "Microbiology Lab", price: "$150,000", floor: 2, category: "lab", status: "available" },
  { name: "Genetics Lab", price: "$150,000", floor: 2, category: "lab", status: "available" },
  { name: "Neuroscience Lab", price: "$150,000", floor: 2, category: "lab", status: "available" },
  { name: "Biochemistry Lab", price: "$150,000", floor: 2, category: "lab", status: "available" },
  { name: "Research Methods Lab", price: "$150,000", floor: 2, category: "lab", status: "available" },
  { name: "General Chemistry Lab 1", price: "$150,000", floor: 3, category: "lab", status: "available" },
  { name: "General Chemistry Lab 2", price: "$150,000", floor: 3, category: "lab", status: "available" },
  { name: "Analytical Physical Forensics Lab", price: "$150,000", floor: 3, category: "lab", status: "available" },
  { name: "Organic Chemistry Lab", price: "$150,000", floor: 3, category: "lab", status: "available" },
  { name: "Instrument Lab", price: "$150,000", floor: 3, category: "lab", status: "available" },

  // $100,000 Tier
  { name: "Stairway", price: "$100,000", floor: 1, category: "other", status: "available" },
  { name: "South Entrance Plaza", price: "$100,000", floor: 4, category: "other", status: "available" },
  { name: "Gazebo", price: "$100,000", floor: 4, category: "other", status: "available" },

  // $50,000 Tier
  { name: "Office Suite - W1", price: "$50,000", floor: 1, category: "office", status: "available" },
  { name: "Office Suite - W2", price: "$50,000", floor: 1, category: "office", status: "available" },
  { name: "Office Suite - E1", price: "$50,000", floor: 1, category: "office", status: "available" },
  { name: "Office Suite - E2", price: "$50,000", floor: 1, category: "office", status: "available" },
  { name: "Office Suite - E3", price: "$50,000", floor: 1, category: "office", status: "available" },
  { name: "Office Suite - E4", price: "$50,000", floor: 1, category: "office", status: "available" },

  // $25,000 Tier
  { name: "Office - W1", price: "$25,000", floor: 1, category: "office", status: "available" },
  { name: "Office - W2", price: "$25,000", floor: 1, category: "office", status: "available" },
  { name: "Office - W3", price: "$25,000", floor: 1, category: "office", status: "available" },
  { name: "Office - W4", price: "$25,000", floor: 1, category: "office", status: "available" },
  { name: "Office - W5", price: "$25,000", floor: 1, category: "office", status: "available" },
  { name: "Office - W6", price: "$25,000", floor: 1, category: "office", status: "available" },
  { name: "Office - W7", price: "$25,000", floor: 1, category: "office", status: "available" },
  { name: "Office - W8", price: "$25,000", floor: 1, category: "office", status: "available" },
  { name: "Office - W9", price: "$25,000", floor: 1, category: "office", status: "available" },
  { name: "Office - W10", price: "$25,000", floor: 1, category: "office", status: "available" },
  { name: "Office - W11", price: "$25,000", floor: 1, category: "office", status: "available" },
];

const floorLabels = ["First Floor", "Second Floor", "Third Floor", "Outside"];

const categoryColors: Record<string, string> = {
  building: "bg-[#3D1A78] text-white",
  lab: "bg-green-50 border-green-200 text-green-800",
  office: "bg-pink-50 border-pink-200 text-pink-800",
  commons: "bg-amber-50 border-amber-200 text-amber-800",
  other: "bg-gray-50 border-gray-200 text-gray-800",
};

const categoryLabels: Record<string, string> = {
  building: "Building",
  lab: "Laboratory",
  office: "Office Suite",
  commons: "Commons / Gathering",
  other: "Other",
};

const statusBadge: Record<string, { className: string; label: string }> = {
  available: { className: "bg-green-100 text-green-800", label: "Available" },
  reserved: { className: "bg-amber-100 text-amber-800", label: "Funded (Hold)" },
  named: { className: "bg-[#3D1A78] text-white", label: "Funded" },
};

export default function NamingOpportunities() {
  const [activeFloor, setActiveFloor] = useState(0);
  const [selectedItem, setSelectedItem] = useState<NamingItem | null>(null);

  const floorValues = [1, 2, 3, 4];
  const filteredItems = namingData.filter((item) => item.floor === floorValues[activeFloor]);

  const availableCount = namingData.filter((item) => item.status === "available").length;

  return (
    <section id="naming" className="py-24 md:py-32 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3D1A78] tracking-[0.15em] uppercase mb-4">
            Naming Opportunities
          </h2>
          <div className="w-16 h-1 bg-[#FEC324] mx-auto mb-6" />
          <p className="font-[var(--font-body)] text-gray-600 text-lg max-w-2xl mx-auto mb-4">
            Leave a lasting legacy by naming a space in the new Science Facility. Every investment advances faith-based science education for generations to come.
          </p>
          <p className="font-[var(--font-heading)] text-[#3D1A78] text-lg font-semibold">
            {availableCount} of {namingData.length} opportunities remaining
          </p>
        </div>

        {/* Floor tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {floorLabels.map((label, i) => (
            <button
              key={label}
              onClick={() => {
                setActiveFloor(i);
                setSelectedItem(null);
              }}
              className={`px-5 py-2.5 font-[var(--font-heading)] text-sm tracking-[0.1em] uppercase font-semibold transition-all duration-300 rounded-sm ${
                activeFloor === i
                  ? "bg-[#3D1A78] text-white shadow-lg"
                  : "bg-white text-[#3D1A78] hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Naming cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {filteredItems.map((item, i) => {
            const badge = statusBadge[item.status];
            return (
              <button
                key={`${item.name}-${i}`}
                onClick={() => setSelectedItem(item)}
                className={`text-left p-5 rounded-sm border transition-all duration-200 hover:shadow-md ${
                  item.status === "available"
                    ? "bg-white border-gray-200 hover:border-[#FEC324]"
                    : item.status === "reserved"
                    ? "bg-gray-50 border-gray-200 opacity-75"
                    : "bg-gray-50 border-gray-200 opacity-60"
                } ${selectedItem?.name === item.name ? "ring-2 ring-[#FEC324]" : ""}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${
                      categoryColors[item.category]
                    }`}
                  >
                    {categoryLabels[item.category]}
                  </span>
                  <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${badge.className}`}>
                    {badge.label}
                  </span>
                </div>
                <h3 className="font-[var(--font-heading)] text-[#3D1A78] font-bold text-base mb-1">{item.name}</h3>
                <p className="font-[var(--font-heading)] text-[#FEC324] font-bold text-lg">{item.price}</p>
                {item.donor && (
                  <p className="font-[var(--font-body)] text-gray-500 text-sm mt-1 italic">Named by {item.donor}</p>
                )}
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        {selectedItem && (
          <div className="bg-white rounded-sm shadow-lg p-8 border border-gray-200 max-w-2xl mx-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-[var(--font-heading)] text-[#3D1A78] font-bold text-xl mb-1">{selectedItem.name}</h3>
                <p className="font-[var(--font-heading)] text-[#FEC324] font-bold text-2xl">{selectedItem.price}</p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="font-[var(--font-body)] text-gray-600 leading-relaxed mb-6">
              Your investment in the {selectedItem.name} will create a lasting tribute while advancing science education at UMHB. This space will serve thousands of students for decades to come, equipping them to pursue truth, serve others, and lead with integrity.
            </p>
            <a
              href="mailto:advancement@umhb.edu?subject=Naming%20Inquiry%20-%20UMHB%20Science%20Facility&body=I%20am%20interested%20in%20the%20naming%20opportunity%20for%20the%20following%20space%3A%0A%0ASpace%3A%20${encodeURIComponent(selectedItem.name)}%0ALevel%3A%20${encodeURIComponent(selectedItem.price)}"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#3D1A78] text-white font-[var(--font-heading)] font-semibold tracking-wide rounded-sm hover:bg-[#2D1259] transition-colors duration-300"
            >
              Inquire at advancement@umhb.edu
            </a>
          </div>
        )}

        {/* Challenge grant callout */}
        <div className="mt-16 bg-[#3D1A78] rounded-sm p-8 md:p-12 text-center">
          <h3 className="font-[var(--font-heading)] text-[#FEC324] text-xl md:text-2xl font-bold tracking-wide uppercase mb-4">
            $4 Million Challenge Grant
          </h3>
          <p className="font-[var(--font-body)] text-white/90 text-lg max-w-2xl mx-auto mb-2">
            A generous anonymous donor has offered a $1 million gift plus a $4 million challenge grant. UMHB must raise an additional $5 million in new gifts by the end of 2026 to unlock the full challenge.
          </p>
          <p className="font-[var(--font-heading)] text-[#FEC324] font-bold text-lg">
            Your gift today counts toward the challenge.
          </p>
        </div>
      </div>
    </section>
  );
}
