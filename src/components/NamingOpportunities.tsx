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
  // Building-level
  { name: "Science Facility (Building)", price: "$10,000,000+", floor: 0, category: "building", status: "available" },
  { name: "First Floor Wing", price: "$3,000,000", floor: 1, category: "building", status: "available" },
  { name: "Second Floor Wing", price: "$3,000,000", floor: 2, category: "building", status: "available" },
  { name: "Third Floor Wing", price: "$3,000,000", floor: 3, category: "building", status: "available" },

  // First Floor
  { name: "Lobby & Student Gathering Space", price: "$1,500,000", floor: 1, category: "commons", status: "available" },
  { name: "Conference Room", price: "$250,000", floor: 1, category: "commons", status: "available" },
  { name: "Teaching Lab 101", price: "$500,000", floor: 1, category: "lab", status: "available" },
  { name: "Teaching Lab 102", price: "$500,000", floor: 1, category: "lab", status: "available" },
  { name: "Teaching Lab 103", price: "$500,000", floor: 1, category: "lab", status: "available" },
  { name: "Teaching Lab 104", price: "$500,000", floor: 1, category: "lab", status: "available" },
  { name: "Student Commons (First Floor)", price: "$300,000", floor: 1, category: "commons", status: "available" },
  { name: "Faculty Office Suite A", price: "$100,000", floor: 1, category: "office", status: "available" },
  { name: "Faculty Office Suite B", price: "$100,000", floor: 1, category: "office", status: "available" },

  // Second Floor
  { name: "Microbiology Prep Room", price: "$350,000", floor: 2, category: "lab", status: "available" },
  { name: "Teaching Lab 201", price: "$500,000", floor: 2, category: "lab", status: "available" },
  { name: "Teaching Lab 202", price: "$500,000", floor: 2, category: "lab", status: "available" },
  { name: "Teaching Lab 203", price: "$500,000", floor: 2, category: "lab", status: "available" },
  { name: "Teaching Lab 204", price: "$500,000", floor: 2, category: "lab", status: "available" },
  { name: "Research Methods Lab", price: "$400,000", floor: 2, category: "lab", status: "available" },
  { name: "Memorial Hall", price: "$750,000", floor: 2, category: "commons", status: "available" },
  { name: "Second Floor Commons", price: "$250,000", floor: 2, category: "commons", status: "available" },
  { name: "Faculty Office Suite C", price: "$100,000", floor: 2, category: "office", status: "available" },

  // Third Floor
  { name: "General Chemistry Lab A", price: "$500,000", floor: 3, category: "lab", status: "available" },
  { name: "General Chemistry Lab B", price: "$500,000", floor: 3, category: "lab", status: "available" },
  { name: "Organic Chemistry Lab", price: "$500,000", floor: 3, category: "lab", status: "available" },
  { name: "Physical Chemistry Lab", price: "$500,000", floor: 3, category: "lab", status: "available" },
  { name: "Analytical/Physical College Chemistry", price: "$500,000", floor: 3, category: "lab", status: "available" },
  { name: "Biology Research Lab", price: "$750,000", floor: 3, category: "lab", status: "available" },
  { name: "Chemistry Research Lab", price: "$750,000", floor: 3, category: "lab", status: "available" },
  { name: "Instrument Lab", price: "$400,000", floor: 3, category: "lab", status: "available" },
  { name: "Third Floor Commons", price: "$250,000", floor: 3, category: "commons", status: "available" },
];

const floorLabels = ["Building-Wide", "First Floor", "Second Floor", "Third Floor"];

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
  reserved: { className: "bg-amber-100 text-amber-800", label: "Reserved" },
  named: { className: "bg-[#3D1A78] text-white", label: "Named" },
};

export default function NamingOpportunities() {
  const [activeFloor, setActiveFloor] = useState(0);
  const [selectedItem, setSelectedItem] = useState<NamingItem | null>(null);

  const filteredItems =
    activeFloor === 0
      ? namingData.filter((item) => item.category === "building")
      : namingData.filter((item) => item.floor === activeFloor && item.category !== "building");

  const availableCount = namingData.filter((item) => item.status === "available").length;

  return (
    <section id="naming" className="py-24 md:py-32 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3D1A78] tracking-[0.15em] uppercase mb-4">
            Naming Opportunities
          </h2>
          <div className="w-16 h-1 bg-[#D4A843] mx-auto mb-6" />
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
                    ? "bg-white border-gray-200 hover:border-[#D4A843]"
                    : item.status === "reserved"
                    ? "bg-gray-50 border-gray-200 opacity-75"
                    : "bg-gray-50 border-gray-200 opacity-60"
                } ${selectedItem?.name === item.name ? "ring-2 ring-[#D4A843]" : ""}`}
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
                <p className="font-[var(--font-heading)] text-[#D4A843] font-bold text-lg">{item.price}</p>
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
                <p className="font-[var(--font-heading)] text-[#D4A843] font-bold text-2xl">{selectedItem.price}</p>
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
          <h3 className="font-[var(--font-heading)] text-[#D4A843] text-xl md:text-2xl font-bold tracking-wide uppercase mb-4">
            $4 Million Challenge Grant
          </h3>
          <p className="font-[var(--font-body)] text-white/90 text-lg max-w-2xl mx-auto mb-2">
            A generous anonymous donor has offered a $1 million gift plus a $4 million challenge grant. UMHB must raise an additional $5 million in new gifts by the end of 2026 to unlock the full challenge.
          </p>
          <p className="font-[var(--font-heading)] text-[#D4A843] font-bold text-lg">
            Your gift today counts toward the challenge.
          </p>
        </div>
      </div>
    </section>
  );
}
