export default function MolecularMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Central hexagon ring */}
      <circle cx="100" cy="60" r="6" fill="currentColor" opacity="0.3" />
      <circle cx="130" cy="77" r="6" fill="currentColor" opacity="0.3" />
      <circle cx="130" cy="113" r="6" fill="currentColor" opacity="0.3" />
      <circle cx="100" cy="130" r="6" fill="currentColor" opacity="0.3" />
      <circle cx="70" cy="113" r="6" fill="currentColor" opacity="0.3" />
      <circle cx="70" cy="77" r="6" fill="currentColor" opacity="0.3" />
      {/* Bonds */}
      <line x1="100" y1="60" x2="130" y2="77" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <line x1="130" y1="77" x2="130" y2="113" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <line x1="130" y1="113" x2="100" y2="130" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <line x1="100" y1="130" x2="70" y2="113" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <line x1="70" y1="113" x2="70" y2="77" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <line x1="70" y1="77" x2="100" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      {/* Side chains */}
      <circle cx="100" cy="30" r="4" fill="currentColor" opacity="0.2" />
      <line x1="100" y1="60" x2="100" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
      <circle cx="160" cy="60" r="4" fill="currentColor" opacity="0.2" />
      <line x1="130" y1="77" x2="160" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
      <circle cx="160" cy="130" r="4" fill="currentColor" opacity="0.2" />
      <line x1="130" y1="113" x2="160" y2="130" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
      <circle cx="40" cy="60" r="4" fill="currentColor" opacity="0.2" />
      <line x1="70" y1="77" x2="40" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
      <circle cx="40" cy="130" r="4" fill="currentColor" opacity="0.2" />
      <line x1="70" y1="113" x2="40" y2="130" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
      <circle cx="100" cy="160" r="4" fill="currentColor" opacity="0.2" />
      <line x1="100" y1="130" x2="100" y2="160" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
    </svg>
  );
}
