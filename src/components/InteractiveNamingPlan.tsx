"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════
   TIER DEFINITIONS — colors match the Tiered Giving PDF
   ═══════════════════════════════════════════════════════ */
const TIERS: Record<number, { label: string; price: string; swatch: string }> = {
  1: { label: "Tier 1", price: "$1,000,000", swatch: "#7BC67E" },
  2: { label: "Tier 2", price: "$500,000",   swatch: "#C4B1DE" },
  3: { label: "Tier 3", price: "$250,000",   swatch: "#F5A35C" },
  4: { label: "Tier 4", price: "$150,000",   swatch: "#F5E070" },
  5: { label: "Tier 5", price: "$100,000",   swatch: "#8B6BAE" },
  6: { label: "Tier 6", price: "$50,000",    swatch: "#8ECAE6" },
  7: { label: "Tier 7", price: "$25,000",    swatch: "#F2A5B5" },
};

const FUNDED_SWATCH = "#D4D4D4";

/* ═══════════════════════════════════════════════════════
   ROOM DATA — coordinates in 3400×2200 image space
   ═══════════════════════════════════════════════════════ */
interface RoomData {
  id: string;
  name: string;
  tier: number;
  status: "available" | "funded";
  x: number; y: number; w: number; h: number;
  circle?: boolean; // render as ellipse instead of rect
}

interface FloorData {
  id: string;
  label: string;
  image: string;
  rooms: RoomData[];
}

const FLOOR_1: FloorData = {
  id: "first",
  label: "First Floor",
  image: "/images/naming-floors/floor-1.jpg",
  rooms: [
    // Tier 1 — Lobby (green)
    { id: "f1-lobby", name: "Lobby", tier: 1, status: "available", x: 1420, y: 590, w: 400, h: 870 },

    // Tier 2 — Office Suites East (lavender)
    { id: "f1-east-suites", name: "Office Suites (East Side)", tier: 2, status: "available", x: 1850, y: 660, w: 900, h: 730 },

    // Tier 3 — Orange rooms (right edge of left wing cluster)
    { id: "f1-conference", name: "Conference Room", tier: 3, status: "available", x: 1334, y: 832, w: 138, h: 120 },
    { id: "f1-office-study", name: "Office Study", tier: 3, status: "available", x: 1334, y: 960, w: 138, h: 115 },

    // Tier 4 — Yellow rooms
    { id: "f1-stairway", name: "Stairway", tier: 4, status: "available", x: 1793, y: 783, w: 150, h: 267 },
    { id: "f1-study", name: "Study", tier: 4, status: "available", x: 963, y: 947, w: 177, h: 134 },

    // Tier 5 — Purple rooms
    { id: "f1-north-plaza", name: "North Entrance Plaza", tier: 5, status: "available", x: 1472, y: 282, w: 480, h: 313 },
    { id: "f1-south-plaza", name: "South Entrance Plaza", tier: 5, status: "available", x: 1474, y: 1463, w: 475, h: 234 },
    { id: "f1-gazebo", name: "Gazebo", tier: 5, status: "available", x: 2950, y: 90, w: 250, h: 250, circle: true },

    // Tier 6 — Light blue office suites (top row + bottom right)
    { id: "f1-suite-a", name: "Office Suite A", tier: 6, status: "available", x: 625, y: 635, w: 145, h: 200 },
    { id: "f1-suite-b", name: "Office Suite B", tier: 6, status: "available", x: 1330, y: 635, w: 140, h: 200 },
    { id: "f1-suite-c", name: "Office Suite C", tier: 6, status: "available", x: 1965, y: 635, w: 140, h: 200 },
    { id: "f1-suite-d", name: "Office Suite D", tier: 6, status: "available", x: 2640, y: 635, w: 145, h: 200 },
    { id: "f1-suite-e", name: "Office Suite E", tier: 6, status: "available", x: 1965, y: 1400, w: 140, h: 195 },
    { id: "f1-suite-f", name: "Office Suite F", tier: 6, status: "available", x: 2640, y: 1400, w: 145, h: 195 },

    // Tier 7 — Pink faculty offices (top row)
    { id: "f1-fac-1", name: "Faculty Office 1", tier: 7, status: "available", x: 770, y: 635, w: 112, h: 155 },
    { id: "f1-fac-2", name: "Faculty Office 2", tier: 7, status: "available", x: 882, y: 635, w: 112, h: 155 },
    { id: "f1-fac-3", name: "Faculty Office 3", tier: 7, status: "available", x: 994, y: 635, w: 112, h: 155 },
    { id: "f1-fac-4", name: "Faculty Office 4", tier: 7, status: "available", x: 1106, y: 635, w: 112, h: 155 },
    { id: "f1-fac-5", name: "Faculty Office 5", tier: 7, status: "available", x: 1218, y: 635, w: 110, h: 155 },
    // Left column offices (second row)
    { id: "f1-fac-6", name: "Faculty Office 6", tier: 7, status: "available", x: 625, y: 840, w: 150, h: 235 },
    { id: "f1-fac-7", name: "Faculty Office 7", tier: 7, status: "available", x: 825, y: 840, w: 150, h: 235 },
    { id: "f1-fac-8", name: "Faculty Office 8", tier: 7, status: "available", x: 1145, y: 840, w: 140, h: 235 },

    // Funded
    { id: "f1-funded", name: "South Entry Vestibule", tier: 2, status: "funded", x: 1500, y: 1350, w: 110, h: 115 },
  ],
};

const FLOOR_2: FloorData = {
  id: "second",
  label: "Second Floor",
  image: "/images/naming-floors/floor-2.jpg",
  rooms: [
    { id: "f2-gen-bio", name: "General Biology Lab", tier: 4, status: "available", x: 515, y: 612, w: 390, h: 474 },
    { id: "f2-micro", name: "Microbiology Lab", tier: 4, status: "available", x: 1054, y: 613, w: 395, h: 473 },
    { id: "f2-genetics", name: "Genetics Lab", tier: 4, status: "available", x: 1982, y: 622, w: 396, h: 472 },
    { id: "f2-neuro", name: "Neuroscience Lab", tier: 4, status: "available", x: 2513, y: 613, w: 394, h: 473 },
    { id: "f2-biochem", name: "Biochemistry Lab", tier: 4, status: "available", x: 1982, y: 1200, w: 395, h: 472 },
    { id: "f2-research", name: "Research Methods Lab", tier: 4, status: "available", x: 2522, y: 1225, w: 396, h: 472 },
  ],
};

const FLOOR_3: FloorData = {
  id: "third",
  label: "Third Floor",
  image: "/images/naming-floors/floor-3.jpg",
  rooms: [
    // Tier 4 — Yellow labs
    { id: "f3-gen-chem-a", name: "General Chemistry Lab A", tier: 4, status: "available", x: 393, y: 539, w: 399, h: 528 },
    { id: "f3-gen-chem-b", name: "General Chemistry Lab B", tier: 4, status: "available", x: 976, y: 551, w: 403, h: 524 },
    { id: "f3-phys-chem", name: "Physical Chemistry Lab", tier: 4, status: "available", x: 1984, y: 543, w: 403, h: 528 },
    { id: "f3-analytical", name: "Analytical / Physical Forensics Lab", tier: 4, status: "available", x: 2571, y: 543, w: 404, h: 528 },
    { id: "f3-organic", name: "Organic Chemistry Lab", tier: 4, status: "available", x: 1964, y: 1163, w: 403, h: 528 },
    { id: "f3-instrument", name: "Instrument Lab", tier: 4, status: "available", x: 2551, y: 1177, w: 405, h: 528 },

    // Funded Research Center
    { id: "f3-research-center", name: "Research Center", tier: 2, status: "funded", x: 1380, y: 720, w: 600, h: 600 },
  ],
};

const FLOORS = [FLOOR_1, FLOOR_2, FLOOR_3];

/* ═══════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function InteractiveNamingPlan() {
  const [activeFloor, setActiveFloor] = useState(0);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; room: RoomData } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const floor = FLOORS[activeFloor];
  const availableRooms = FLOORS.flatMap((f) => f.rooms).filter((r) => r.status === "available");
  const floorTiers = [...new Set(floor.rooms.map((r) => r.tier))].sort((a, b) => a - b);

  const handleMouseEnter = useCallback((room: RoomData, e: React.MouseEvent) => {
    setHoveredRoom(room.id);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltip({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 10,
        room,
      });
    }
  }, []);

  const handleMouseMove = useCallback((room: RoomData, e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltip({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 10,
        room,
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredRoom(null);
    setTooltip(null);
  }, []);

  return (
    <section id="naming" className="py-24 md:py-32 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[#4D008C] tracking-[0.15em] uppercase mb-4">
            Naming Opportunities
          </h2>
          <div className="w-16 h-1 bg-[#FFC425] mx-auto mb-6" />
          <p className="font-[var(--font-body)] text-gray-600 text-lg max-w-2xl mx-auto mb-4">
            Leave a lasting legacy by naming a space in the new Science Facility.
            Hover over any room to explore giving levels.
          </p>
          <p className="font-[var(--font-heading)] text-[#4D008C] text-lg font-semibold">
            {availableRooms.length} naming opportunities available
          </p>
        </div>

        {/* Floor Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {FLOORS.map((f, i) => (
            <button
              key={f.id}
              onClick={() => { setActiveFloor(i); setHoveredRoom(null); setTooltip(null); }}
              className={`px-6 py-3 font-[var(--font-heading)] text-sm tracking-[0.12em] uppercase font-semibold transition-all duration-300 rounded-sm ${
                activeFloor === i
                  ? "bg-[#4D008C] text-white shadow-lg"
                  : "bg-white text-[#4D008C] hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Floor Plan Image + SVG Overlay + Legend */}
        <div className="grid lg:grid-cols-[1fr_220px] gap-6 mb-12">
          {/* Floor Plan with Overlay */}
          <div
            ref={containerRef}
            className="relative bg-white rounded-sm shadow-lg border border-gray-200 overflow-hidden"
          >
            {/* Actual floor plan image */}
            <Image
              src={floor.image}
              alt={`${floor.label} floor plan`}
              width={3400}
              height={2200}
              className="w-full h-auto block"
              priority
            />

            {/* SVG overlay — same dimensions as image */}
            <svg
              viewBox="0 0 3400 2200"
              className="absolute inset-0 w-full h-full"
              style={{ pointerEvents: "none" }}
            >
              {floor.rooms.map((room) => {
                const isHovered = hoveredRoom === room.id;
                const isFunded = room.status === "funded";

                const shapeProps = {
                  className: "cursor-pointer",
                  style: {
                    pointerEvents: "all" as const,
                    transition: "fill 0.15s, stroke 0.15s, stroke-width 0.15s",
                  },
                  fill: isHovered
                    ? isFunded
                      ? "rgba(100,100,100,0.25)"
                      : "rgba(61, 26, 120, 0.2)"
                    : "transparent",
                  stroke: isHovered ? "#4D008C" : "transparent",
                  strokeWidth: isHovered ? 6 : 0,
                  onMouseEnter: (e: React.MouseEvent) => handleMouseEnter(room, e),
                  onMouseMove: (e: React.MouseEvent) => handleMouseMove(room, e),
                  onMouseLeave: handleMouseLeave,
                };

                if (room.circle) {
                  return (
                    <ellipse
                      key={room.id}
                      cx={room.x + room.w / 2}
                      cy={room.y + room.h / 2}
                      rx={room.w / 2}
                      ry={room.h / 2}
                      {...shapeProps}
                    />
                  );
                }

                return (
                  <rect
                    key={room.id}
                    x={room.x}
                    y={room.y}
                    width={room.w}
                    height={room.h}
                    rx={8}
                    {...shapeProps}
                  />
                );
              })}
            </svg>

            {/* Floating Tooltip */}
            {tooltip && (
              <div
                className="absolute z-30 pointer-events-none"
                style={{
                  left: tooltip.x,
                  top: tooltip.y,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <div className="bg-[#4D008C] text-white rounded-md shadow-xl px-4 py-2.5 text-center whitespace-nowrap">
                  <p className="font-[var(--font-heading)] font-bold text-sm leading-tight">
                    {tooltip.room.name}
                  </p>
                  {tooltip.room.status === "funded" ? (
                    <p className="text-white/60 text-xs font-semibold mt-0.5">FUNDED</p>
                  ) : (
                    <p className="text-[#FFC425] font-bold text-base mt-0.5">
                      {TIERS[tooltip.room.tier].price}
                    </p>
                  )}
                </div>
                <div className="flex justify-center">
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#4D008C]" />
                </div>
              </div>
            )}

            <p className="text-center text-gray-400 text-xs py-3 font-[var(--font-body)]">
              Hover over any colored room to see naming details
            </p>
          </div>

          {/* Tier Legend */}
          <div className="bg-white rounded-sm shadow-lg border border-gray-200 p-5 h-fit lg:sticky lg:top-8">
            <h3 className="font-[var(--font-heading)] text-[#4D008C] text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Giving Tiers
            </h3>
            <div className="space-y-2.5">
              {floorTiers
                .filter((t) => floor.rooms.some((r) => r.tier === t && r.status === "available"))
                .map((t) => {
                  const tier = TIERS[t];
                  const count = floor.rooms.filter((r) => r.tier === t && r.status === "available").length;
                  return (
                    <div key={t} className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-sm flex-shrink-0 border border-black/10"
                        style={{ backgroundColor: tier.swatch }}
                      />
                      <div className="flex-1">
                        <p className="font-[var(--font-heading)] text-[#4D008C] font-bold text-sm leading-tight">
                          {tier.price}
                        </p>
                        <p className="text-gray-400 text-xs">{count} available</p>
                      </div>
                    </div>
                  );
                })}
            </div>
            {floor.rooms.some((r) => r.status === "funded") && (
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-sm flex-shrink-0 border border-black/10" style={{ backgroundColor: FUNDED_SWATCH }} />
                  <span className="text-gray-400 text-xs font-[var(--font-body)]">Already Funded</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tiles — All Naming Opportunities */}
        <div className="mb-12">
          <h3 className="font-[var(--font-heading)] text-[#4D008C] text-sm tracking-[0.15em] uppercase font-bold mb-5 text-center">
            {floor.label} — All Naming Opportunities
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {floor.rooms
              .filter((r) => r.status === "available")
              .sort((a, b) => a.tier - b.tier)
              .map((room) => {
                const tier = TIERS[room.tier];
                return (
                  <div
                    key={room.id}
                    className="bg-white rounded-sm border border-gray-200 px-3 py-2.5 flex items-start gap-2.5 hover:border-[#FFC425] hover:shadow-sm transition-all duration-200 cursor-default"
                    onMouseEnter={() => setHoveredRoom(room.id)}
                    onMouseLeave={() => setHoveredRoom(null)}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-sm flex-shrink-0 mt-1 border border-black/10"
                      style={{ backgroundColor: tier.swatch }}
                    />
                    <div className="min-w-0">
                      <p className="font-[var(--font-heading)] text-[#4D008C] font-semibold text-xs leading-tight truncate">
                        {room.name}
                      </p>
                      <p className="font-[var(--font-heading)] text-[#FFC425] font-bold text-sm">
                        {tier.price}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Challenge Grant */}
        <div className="bg-[#4D008C] rounded-sm p-8 md:p-12 text-center">
          <h3 className="font-[var(--font-heading)] text-[#FFC425] text-xl md:text-2xl font-bold tracking-wide uppercase mb-4">
            $4 Million Challenge Grant
          </h3>
          <p className="font-[var(--font-body)] text-white/90 text-lg max-w-2xl mx-auto mb-2">
            A generous anonymous donor has offered a $1&nbsp;million gift plus a $4&nbsp;million
            challenge grant. UMHB must raise an additional $5&nbsp;million in new gifts by the end
            of 2026 to unlock the full challenge.
          </p>
          <p className="font-[var(--font-heading)] text-[#FFC425] font-bold text-lg">
            Your gift today counts toward the challenge.
          </p>
        </div>
      </div>
    </section>
  );
}
