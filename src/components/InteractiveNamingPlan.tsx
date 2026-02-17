"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

/* ─── Tier Definitions ─── */
const TIERS: Record<
  number,
  { label: string; price: string; color: string; hoverBg: string; badge: string }
> = {
  1: { label: "Tier 1", price: "$1,000,000", color: "#4CAF50", hoverBg: "rgba(76,175,80,0.25)", badge: "bg-green-100 text-green-800 border-green-300" },
  2: { label: "Tier 2", price: "$500,000", color: "#9575CD", hoverBg: "rgba(149,117,205,0.25)", badge: "bg-purple-100 text-purple-800 border-purple-300" },
  3: { label: "Tier 3", price: "$250,000", color: "#FF9800", hoverBg: "rgba(255,152,0,0.25)", badge: "bg-orange-100 text-orange-800 border-orange-300" },
  4: { label: "Tier 4", price: "$150,000", color: "#FDD835", hoverBg: "rgba(253,216,53,0.30)", badge: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  5: { label: "Tier 5", price: "$100,000", color: "#7B1FA2", hoverBg: "rgba(123,31,162,0.25)", badge: "bg-purple-200 text-purple-900 border-purple-400" },
  6: { label: "Tier 6", price: "$50,000", color: "#4FC3F7", hoverBg: "rgba(79,195,247,0.25)", badge: "bg-sky-100 text-sky-800 border-sky-300" },
  7: { label: "Tier 7", price: "$25,000", color: "#F48FB1", hoverBg: "rgba(244,143,177,0.25)", badge: "bg-pink-100 text-pink-800 border-pink-300" },
};

/* ─── Room Data ─── */
interface Room {
  id: string;
  name: string;
  tier: number;
  status: "available" | "funded";
  x: number; y: number; w: number; h: number; // % of image
}

interface FloorConfig {
  id: string;
  label: string;
  image: string;
  rooms: Room[];
}

const FLOORS: FloorConfig[] = [
  {
    id: "first",
    label: "First Floor",
    image: "/images/naming-floors/floor-1.jpg",
    rooms: [
      // Tier 1
      { id: "f1-lobby", name: "Lobby", tier: 1, status: "available", x: 29, y: 24, w: 20, h: 40 },
      // Tier 2
      { id: "f1-north-entrance", name: "North Entrance Plaza", tier: 2, status: "available", x: 34, y: 8, w: 12, h: 13 },
      { id: "f1-east-offices", name: "Office Suites (East Side)", tier: 2, status: "available", x: 53, y: 28, w: 21, h: 25 },
      // Tier 3
      { id: "f1-conference", name: "Conference Room", tier: 3, status: "available", x: 21, y: 40, w: 7, h: 7 },
      { id: "f1-office-t3a", name: "Office", tier: 3, status: "available", x: 14, y: 40, w: 6, h: 7 },
      { id: "f1-office-study", name: "Office Study", tier: 3, status: "available", x: 27, y: 40, w: 4, h: 7 },
      // Tier 4
      { id: "f1-study", name: "Study", tier: 4, status: "available", x: 31, y: 35, w: 5, h: 8 },
      // Tier 5
      { id: "f1-stairway", name: "Stairway", tier: 5, status: "available", x: 51, y: 24, w: 6, h: 9 },
      { id: "f1-south-entrance", name: "South Entrance Plaza", tier: 5, status: "available", x: 34, y: 68, w: 12, h: 12 },
      { id: "f1-gazebo", name: "Gazebo", tier: 5, status: "available", x: 83, y: 3, w: 7, h: 9 },
      // Tier 6 — grouped office suites
      { id: "f1-suite-a", name: "Office Suite A", tier: 6, status: "available", x: 5, y: 19, w: 11, h: 8 },
      { id: "f1-suite-b", name: "Office Suite B", tier: 6, status: "available", x: 17, y: 19, w: 11, h: 8 },
      { id: "f1-suite-c", name: "Office Suite C", tier: 6, status: "available", x: 53, y: 19, w: 8, h: 6 },
      { id: "f1-suite-d", name: "Office Suite D", tier: 6, status: "available", x: 62, y: 19, w: 8, h: 6 },
      // Tier 7 — individual offices (left column)
      { id: "f1-office-7a", name: "Faculty Office", tier: 7, status: "available", x: 5, y: 30, w: 5, h: 7 },
      { id: "f1-office-7b", name: "Faculty Office", tier: 7, status: "available", x: 5, y: 38, w: 5, h: 7 },
      { id: "f1-office-7c", name: "Faculty Office", tier: 7, status: "available", x: 10, y: 30, w: 5, h: 7 },
      { id: "f1-office-7d", name: "Faculty Office", tier: 7, status: "available", x: 10, y: 38, w: 5, h: 7 },
      // Funded
      { id: "f1-funded", name: "South Entry Vestibule", tier: 2, status: "funded", x: 42, y: 58, w: 7, h: 8 },
    ],
  },
  {
    id: "second",
    label: "Second Floor",
    image: "/images/naming-floors/floor-2.jpg",
    rooms: [
      // Top wing (left to right)
      { id: "f2-gen-bio", name: "General Biology Lab", tier: 4, status: "available", x: 5, y: 12, w: 19, h: 28 },
      { id: "f2-micro", name: "Microbiology Lab", tier: 4, status: "available", x: 25, y: 12, w: 15, h: 28 },
      { id: "f2-genetics", name: "Genetics Lab", tier: 4, status: "available", x: 49, y: 12, w: 16, h: 28 },
      { id: "f2-neuro", name: "Neuroscience Lab", tier: 4, status: "available", x: 66, y: 12, w: 18, h: 28 },
      // Bottom wing
      { id: "f2-biochem", name: "Biochemistry Lab", tier: 4, status: "available", x: 49, y: 55, w: 16, h: 26 },
      { id: "f2-research-methods", name: "Research Methods Lab", tier: 4, status: "available", x: 66, y: 55, w: 18, h: 26 },
    ],
  },
  {
    id: "third",
    label: "Third Floor",
    image: "/images/naming-floors/floor-3.jpg",
    rooms: [
      // Top wing — left pair
      { id: "f3-gen-chem-a", name: "General Chemistry Lab", tier: 4, status: "available", x: 4, y: 10, w: 17, h: 30 },
      { id: "f3-gen-chem-b", name: "General Chemistry Lab", tier: 4, status: "available", x: 22, y: 10, w: 14, h: 30 },
      // Top center — computer labs (smaller, above atrium)
      { id: "f3-computer-a", name: "Computer Lab", tier: 4, status: "available", x: 37, y: 8, w: 9, h: 20 },
      { id: "f3-computer-b", name: "Computer Lab", tier: 4, status: "available", x: 47, y: 8, w: 9, h: 20 },
      // Top wing — right pair
      { id: "f3-phys-chem", name: "Physical Chemistry Lab", tier: 4, status: "available", x: 57, y: 10, w: 12, h: 30 },
      { id: "f3-analytical", name: "Analytical Physical Forensics Lab", tier: 4, status: "available", x: 70, y: 10, w: 15, h: 30 },
      // Center
      { id: "f3-research-center", name: "Research Center", tier: 2, status: "funded", x: 35, y: 38, w: 14, h: 16 },
      // Bottom wing
      { id: "f3-bio-research", name: "Biology Research Lab", tier: 4, status: "available", x: 30, y: 56, w: 11, h: 24 },
      { id: "f3-chem-research", name: "Chemistry Research Lab", tier: 4, status: "available", x: 42, y: 56, w: 11, h: 24 },
      { id: "f3-organic", name: "Organic Chemistry Lab", tier: 4, status: "available", x: 54, y: 56, w: 15, h: 24 },
      { id: "f3-instrument", name: "Instrument Lab", tier: 4, status: "available", x: 70, y: 56, w: 14, h: 24 },
    ],
  },
];

/* ─── Component ─── */
export default function InteractiveNamingPlan() {
  const [activeFloor, setActiveFloor] = useState(0);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const floor = FLOORS[activeFloor];
  const availableCount = FLOORS.flatMap((f) => f.rooms).filter((r) => r.status === "available").length;
  const totalCount = FLOORS.flatMap((f) => f.rooms).length;

  // Group rooms by tier for the current floor
  const roomsByTier = floor.rooms.reduce<Record<number, Room[]>>((acc, room) => {
    if (!acc[room.tier]) acc[room.tier] = [];
    acc[room.tier].push(room);
    return acc;
  }, {});

  // Which tiers appear on this floor
  const floorTiers = Object.keys(roomsByTier)
    .map(Number)
    .sort((a, b) => a - b);

  const handleRoomHover = useCallback((id: string | null) => {
    setHoveredRoom(id);
  }, []);

  return (
    <section id="naming" className="py-24 md:py-32 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3D1A78] tracking-[0.15em] uppercase mb-4">
            Naming Opportunities
          </h2>
          <div className="w-16 h-1 bg-[#FEC324] mx-auto mb-6" />
          <p className="font-[var(--font-body)] text-gray-600 text-lg max-w-2xl mx-auto mb-4">
            Leave a lasting legacy by naming a space in the new Science Facility.
            Every investment advances faith-based science education for generations.
          </p>
          <p className="font-[var(--font-heading)] text-[#3D1A78] text-lg font-semibold">
            {availableCount} of {totalCount} opportunities remaining
          </p>
        </div>

        {/* Floor Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FLOORS.map((f, i) => (
            <button
              key={f.id}
              onClick={() => {
                setActiveFloor(i);
                setHoveredRoom(null);
                setHoveredTier(null);
                setSelectedRoom(null);
              }}
              className={`px-6 py-3 font-[var(--font-heading)] text-sm tracking-[0.12em] uppercase font-semibold transition-all duration-300 rounded-sm ${
                activeFloor === i
                  ? "bg-[#3D1A78] text-white shadow-lg"
                  : "bg-white text-[#3D1A78] hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Main Content: Floor Plan + Legend */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-8 mb-10">
          {/* Floor Plan Image with Hotspots */}
          <div className="relative bg-white rounded-sm shadow-lg overflow-hidden border border-gray-200">
            <div className="relative w-full" style={{ aspectRatio: "3400/2200" }}>
              <Image
                src={floor.image}
                alt={`${floor.label} — Tiered Giving Plan`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 800px"
                priority
              />

              {/* Hotspot Overlays */}
              {floor.rooms.map((room) => {
                const tier = TIERS[room.tier];
                const isHovered = hoveredRoom === room.id;
                const isTierHovered = hoveredTier === room.tier;
                const isActive = isHovered || isTierHovered;
                const isFunded = room.status === "funded";

                return (
                  <div
                    key={room.id}
                    className="absolute cursor-pointer transition-all duration-200"
                    style={{
                      left: `${room.x}%`,
                      top: `${room.y}%`,
                      width: `${room.w}%`,
                      height: `${room.h}%`,
                      backgroundColor: isActive
                        ? isFunded
                          ? "rgba(120,120,120,0.35)"
                          : tier.hoverBg
                        : "transparent",
                      border: isActive ? `2px solid ${isFunded ? "#888" : tier.color}` : "2px solid transparent",
                      borderRadius: "3px",
                      zIndex: isHovered ? 20 : 10,
                      boxShadow: isHovered ? `0 0 20px ${tier.color}40` : "none",
                    }}
                    onMouseEnter={() => handleRoomHover(room.id)}
                    onMouseLeave={() => handleRoomHover(null)}
                    onClick={() => setSelectedRoom(room)}
                  >
                    {/* Tooltip */}
                    {isHovered && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-30 pointer-events-none"
                        style={{ minWidth: "180px" }}
                      >
                        <div className="bg-white rounded-sm shadow-xl border border-gray-200 px-4 py-3 text-center">
                          <p className="font-[var(--font-heading)] text-[#3D1A78] font-bold text-sm leading-tight">
                            {room.name}
                          </p>
                          {isFunded ? (
                            <p className="font-[var(--font-heading)] text-gray-500 font-semibold text-sm mt-1">
                              FUNDED
                            </p>
                          ) : (
                            <>
                              <p className="font-[var(--font-heading)] text-[#FEC324] font-bold text-lg mt-0.5">
                                {TIERS[room.tier].price}
                              </p>
                              <p className="text-gray-400 text-xs mt-0.5">{TIERS[room.tier].label}</p>
                            </>
                          )}
                          {/* Arrow */}
                          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-center text-gray-400 text-xs py-2 font-[var(--font-body)]">
              Hover over colored areas to explore naming opportunities
            </p>
          </div>

          {/* Tier Legend Sidebar */}
          <div className="bg-white rounded-sm shadow-lg border border-gray-200 p-6 h-fit lg:sticky lg:top-8">
            <h3 className="font-[var(--font-heading)] text-[#3D1A78] text-sm tracking-[0.2em] uppercase font-bold mb-5">
              Giving Tiers
            </h3>
            <div className="space-y-3">
              {floorTiers.map((tierNum) => {
                const tier = TIERS[tierNum];
                const rooms = roomsByTier[tierNum] || [];
                const availableInTier = rooms.filter((r) => r.status === "available").length;
                const isActive = hoveredTier === tierNum;

                return (
                  <button
                    key={tierNum}
                    className={`w-full text-left p-3 rounded-sm border transition-all duration-200 ${
                      isActive
                        ? "border-[#FEC324] shadow-md bg-gray-50"
                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                    }`}
                    onMouseEnter={() => setHoveredTier(tierNum)}
                    onMouseLeave={() => setHoveredTier(null)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-sm border border-gray-300 flex-shrink-0"
                        style={{ backgroundColor: tier.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-[var(--font-heading)] text-[#3D1A78] font-bold text-sm">
                          {tier.price}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {availableInTier} available
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legend note */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-sm bg-gray-300 border border-gray-400" />
                <span className="text-gray-500 text-xs font-[var(--font-body)]">Funded</span>
              </div>
              <p className="text-gray-400 text-xs font-[var(--font-body)] leading-relaxed">
                Hover a tier to highlight all rooms at that level on the floor plan.
              </p>
            </div>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="mb-10">
          <h3 className="font-[var(--font-heading)] text-[#3D1A78] text-sm tracking-[0.2em] uppercase font-bold mb-6 text-center">
            {floor.label} — All Spaces
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {floor.rooms
              .sort((a, b) => a.tier - b.tier)
              .map((room) => {
                const tier = TIERS[room.tier];
                const isHovered = hoveredRoom === room.id;
                const isFunded = room.status === "funded";

                return (
                  <button
                    key={room.id}
                    className={`text-left p-4 rounded-sm border transition-all duration-200 ${
                      isFunded
                        ? "bg-gray-50 border-gray-200 opacity-70"
                        : isHovered
                        ? "bg-white border-[#FEC324] shadow-lg ring-2 ring-[#FEC324]/30"
                        : "bg-white border-gray-200 hover:border-[#FEC324] hover:shadow-md"
                    }`}
                    onMouseEnter={() => handleRoomHover(room.id)}
                    onMouseLeave={() => handleRoomHover(null)}
                    onClick={() => setSelectedRoom(room)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold rounded border ${tier.badge}`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-sm"
                          style={{ backgroundColor: tier.color }}
                        />
                        {tier.label}
                      </span>
                      {isFunded ? (
                        <span className="px-2 py-0.5 text-xs font-semibold rounded bg-gray-200 text-gray-600">
                          Funded
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-xs font-semibold rounded bg-green-100 text-green-700">
                          Available
                        </span>
                      )}
                    </div>
                    <h4 className="font-[var(--font-heading)] text-[#3D1A78] font-bold text-sm leading-tight mb-1">
                      {room.name}
                    </h4>
                    <p className="font-[var(--font-heading)] text-[#FEC324] font-bold text-base">
                      {isFunded ? "—" : tier.price}
                    </p>
                  </button>
                );
              })}
          </div>
        </div>

        {/* Detail Modal */}
        {selectedRoom && selectedRoom.status === "available" && (
          <div className="bg-white rounded-sm shadow-xl p-8 border border-gray-200 max-w-2xl mx-auto mb-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold rounded border ${TIERS[selectedRoom.tier].badge}`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-sm"
                      style={{ backgroundColor: TIERS[selectedRoom.tier].color }}
                    />
                    {TIERS[selectedRoom.tier].label}
                  </span>
                </div>
                <h3 className="font-[var(--font-heading)] text-[#3D1A78] font-bold text-xl mb-1">
                  {selectedRoom.name}
                </h3>
                <p className="font-[var(--font-heading)] text-[#FEC324] font-bold text-2xl">
                  {TIERS[selectedRoom.tier].price}
                </p>
              </div>
              <button
                onClick={() => setSelectedRoom(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="font-[var(--font-body)] text-gray-600 leading-relaxed mb-6">
              Your investment in the {selectedRoom.name} will create a lasting tribute while
              advancing science education at UMHB. This space will serve thousands of students
              for decades to come, equipping them to pursue truth, serve others, and lead with integrity.
            </p>
            <a
              href={`mailto:advancement@umhb.edu?subject=Naming%20Inquiry%20%E2%80%94%20UMHB%20Science%20Facility&body=I%20am%20interested%20in%20the%20naming%20opportunity%20for%3A%0A%0ASpace%3A%20${encodeURIComponent(selectedRoom.name)}%0ATier%3A%20${encodeURIComponent(TIERS[selectedRoom.tier].label)}%0ALevel%3A%20${encodeURIComponent(TIERS[selectedRoom.tier].price)}%0A%0APlease%20contact%20me%20to%20discuss.`}
              className="inline-flex items-center justify-center px-6 py-3 bg-[#3D1A78] text-white font-[var(--font-heading)] font-semibold tracking-wide rounded-sm hover:bg-[#2D1259] transition-colors duration-300"
            >
              Inquire at advancement@umhb.edu
            </a>
          </div>
        )}

        {/* Challenge Grant Callout */}
        <div className="bg-[#3D1A78] rounded-sm p-8 md:p-12 text-center">
          <h3 className="font-[var(--font-heading)] text-[#FEC324] text-xl md:text-2xl font-bold tracking-wide uppercase mb-4">
            $4 Million Challenge Grant
          </h3>
          <p className="font-[var(--font-body)] text-white/90 text-lg max-w-2xl mx-auto mb-2">
            A generous anonymous donor has offered a $1&nbsp;million gift plus a $4&nbsp;million
            challenge grant. UMHB must raise an additional $5&nbsp;million in new gifts by the end
            of 2026 to unlock the full challenge.
          </p>
          <p className="font-[var(--font-heading)] text-[#FEC324] font-bold text-lg">
            Your gift today counts toward the challenge.
          </p>
        </div>
      </div>
    </section>
  );
}
