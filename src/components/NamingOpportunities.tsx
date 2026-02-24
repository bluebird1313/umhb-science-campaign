"use client";

import Image from "next/image";
import { useState } from "react";

interface NamingItem {
  name: string;
  price: string;
  floor: number;
  category: "building" | "lab" | "office" | "commons" | "other";
  status: "available" | "reserved" | "named";
}

const namingData: NamingItem[] = [
  // $1,000,000 Tier
  { name: "Lobby", price: "$1,000,000", floor: 1, category: "commons", status: "named" },

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

export default function NamingOpportunities() {
  const [activeFloor, setActiveFloor] = useState(0);
  const [showList, setShowList] = useState(false);

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
                setShowList(false);
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

        {/* Floor map image */}
        {[1, 2, 3].includes(floorValues[activeFloor]) && (
          <div className="relative w-full rounded-sm overflow-hidden shadow-lg bg-white">
            <Image
              src={`/images/naming-floors/floor-${floorValues[activeFloor]}.jpg`}
              alt={`${floorLabels[activeFloor]} naming opportunity map`}
              width={1400}
              height={900}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Toggle button for naming list */}
        <div className="flex justify-center mt-6 mb-4">
          <button
            onClick={() => setShowList(!showList)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-sm font-[var(--font-heading)] text-[#3D1A78] text-sm tracking-[0.1em] uppercase font-semibold hover:bg-gray-50 hover:border-[#FEC324] transition-all duration-300 shadow-sm"
          >
            {showList ? "Hide" : "View"} Naming Opportunities & Amounts
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-4 h-4 transition-transform duration-300 ${showList ? "rotate-180" : ""}`}
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Collapsible naming list */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showList ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white rounded-sm shadow-lg border border-gray-200 overflow-hidden mt-2 mb-10">
            <table className="w-full">
              <thead>
                <tr className="bg-[#3D1A78] text-white">
                  <th className="text-left px-6 py-3 font-[var(--font-heading)] text-sm tracking-[0.1em] uppercase">Space</th>
                  <th className="text-right px-6 py-3 font-[var(--font-heading)] text-sm tracking-[0.1em] uppercase">Amount</th>
                  <th className="text-right px-6 py-3 font-[var(--font-heading)] text-sm tracking-[0.1em] uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, i) => (
                  <tr
                    key={`${item.name}-${i}`}
                    className={`border-b border-gray-100 ${
                      item.status === "named" ? "bg-gray-50 text-gray-400" : "hover:bg-[#FAF8F5]"
                    }`}
                  >
                    <td className="px-6 py-3">
                      <span className={`font-[var(--font-body)] text-sm ${item.status === "named" ? "text-gray-400" : "text-gray-800"}`}>
                        {item.name}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <span className={`font-[var(--font-heading)] font-bold text-sm ${item.status === "named" ? "text-gray-400" : "text-[#3D1A78]"}`}>
                        {item.price}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <span
                        className={`inline-block px-2.5 py-1 text-xs font-semibold rounded ${
                          item.status === "available"
                            ? "bg-green-100 text-green-800"
                            : "bg-[#3D1A78] text-white"
                        }`}
                      >
                        {item.status === "available" ? "Available" : "Funded"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
              <a
                href="mailto:tglaske@umhb.edu?subject=Naming%20Inquiry%20-%20UMHB%20Science%20Facility"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#3D1A78] text-white font-[var(--font-heading)] font-semibold tracking-wide text-sm rounded-sm hover:bg-[#2D1259] transition-colors duration-300"
              >
                Inquire at tglaske@umhb.edu
              </a>
            </div>
          </div>
        </div>

        {/* Challenge grant callout */}
        <div className="mt-10 bg-[#3D1A78] rounded-sm p-8 md:p-12 text-center">
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
