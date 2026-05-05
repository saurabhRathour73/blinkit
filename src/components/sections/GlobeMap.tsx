import { motion } from "framer-motion";

// Coordinates for a standard world map view
const cities = [
  { name: "New Delhi", x: 72, y: 40 },
  { name: "Mumbai", x: 70, y: 50 },
  { name: "London", x: 48, y: 22 },
  { name: "New York", x: 28, y: 32 },
  { name: "Dubai", x: 62, y: 42 },
  { name: "Singapore", x: 80, y: 62 },
  { name: "Sydney", x: 90, y: 82 },
  { name: "São Paulo", x: 35, y: 75 },
];

export default function GlobeMap() {
  return (
    <section className="relative bg-[#0a0a0a] py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.95]">
            Our <span className="text-amber-500 underline decoration-slate-800 underline-offset-8">global</span>
            <br /> network.
          </h2>
          <p className="md:max-w-sm text-slate-400 text-lg italic">
            Connecting major business hubs with precision-guided logistics. 
            Scroll to explore our reach.
          </p>
        </div>

        {/* DARK MAP CONTAINER */}
        <div className="relative aspect-[21/9] rounded-[2.5rem] bg-[#0a0a0a] border border-slate-800 overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
          
          {/* GOLDEN BORDER MAP OVERLAY */}
          <div 
            className="absolute inset-0 opacity-[0.4] pointer-events-none"
            style={{ 
              backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              // Is filter se black map ke edges ko golden-light effect mil raha hai
              filter: 'invert(85%) sepia(45%) saturate(800%) hue-rotate(10deg) brightness(90%) contrast(100%)'
            }} 
          />

          {/* Golden Dotted Grid */}
          <div className="absolute inset-0 opacity-[0.1]" 
            style={{ backgroundImage: 'radial-gradient(#f59e0b 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} 
          />

          {/* Connection Lines (Golden Arcs) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            {cities.slice(1).map((c, i) => {
              const a = cities[0];
              const mx = (a.x + c.x) / 2;
              const my = Math.min(a.y, c.y) - 20; 
              return (
                <motion.path
                  key={`line-${i}`}
                  d={`M ${a.x} ${a.y} Q ${mx} ${my}, ${c.x} ${c.y}`}
                  stroke="#f59e0b" // Golden Amber
                  strokeWidth="0.2"
                  fill="none"
                  strokeDasharray="1 1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.5, delay: i * 0.15, ease: "easeInOut" }}
                />
              );
            })}
          </svg>

          {/* Professional Gold Markers */}
          {cities.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.05, type: "spring", stiffness: 150 }}
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-20"
            >
              <div className="relative">
                {/* Golden Pulse */}
                <span className="absolute inset-0 rounded-full bg-amber-500/40 animate-ping" />
                
                {/* Marker Dot */}
                <div className="relative w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500 border-2 border-[#050b1a] shadow-[0_0_15px_rgba(245,158,11,0.6)] group-hover:bg-white transition-colors duration-300" />
                
                {/* Label Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-y-2 group-hover:translate-y-0">
                  <div className="bg-amber-500 text-[#020617] text-[10px] font-bold px-3 py-1.5 rounded shadow-[0_10px_20px_rgba(245,158,11,0.3)] whitespace-nowrap uppercase tracking-tighter">
                    {c.name}
                  </div>
                  <div className="w-2 h-2 bg-amber-500 rotate-45 mx-auto -mt-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Map Legend */}
        <div className="mt-8 flex justify-center items-center gap-8 text-[10px] uppercase tracking-[0.25em] text-slate-500 font-bold">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            Operational Hubs
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-800 border border-slate-700" />
            Upcoming Ports
          </div>
        </div>
      </div>
    </section>
  );
}