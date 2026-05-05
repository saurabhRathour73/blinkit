// Circular spinning badge — Rapida-style.
export default function Badge({ size = 140, label = "blinkit • 10 min delivery • " }: { size?: number; label?: string }) {
  const chars = label.split("");
  const radius = size / 2 - 14;
  return (
    <div className="relative spin-slow" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        <defs>
          <path id="circle" d={`M ${size / 2}, ${size / 2} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`} />
        </defs>
        <circle cx={size / 2} cy={size / 2} r={size / 2 - 1} fill="var(--neon)" />
        <text fontSize="11" fontWeight="700" letterSpacing="2" fill="var(--deep)" fontFamily="var(--font-display)">
          <textPath xlinkHref="#circle" startOffset="0">
            {chars.join("").repeat(2)}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-deep text-2xl">→</span>
      </div>
    </div>
  );
}
