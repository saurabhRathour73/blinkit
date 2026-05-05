import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  animate, 
  MotionValue,
  Variants
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface Item {
  id: number;
  num: string;
  name: string;
  nameLine2: string;
  sub: string;
  tag: string;
  price: string;
  originalPrice: string;
  img: string;
  bg: string;
  color: string;
  accent: string;
  accentDim: string;
  accentGlow: string;
  particles: 'leaf' | 'steam' | 'spice' | 'ice';
  stat: string;
}

interface Particle {
  id: number;
  size: number;
  x: number;
  duration: number;
  delay: number;
  rotate?: number;
  emoji?: string;
  color?: string;
  opacity?: number;
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const ITEMS: Item[] = [
  {
    id: 1,
    num: "01",
    name: "Fresh",
    nameLine2: "Vegetables",
    sub: "Straight from the farm",
    tag: "Farm Fresh",
    price: "₹49",
    originalPrice: "₹79",
    img: "src/assets/a-basket-brimming-with-vegetables-free-png.webp",
    bg: "#071a09",
    color: "#0d3b14",
    accent: "#00e676",
    accentDim: "#00c85320",
    accentGlow: "#00e67640",
    particles: "leaf",
    stat: "500+ farms",
  },
  {
    id: 2,
    num: "02",
    name: "Crispy",
    nameLine2: "Fast Food",
    sub: "KFC Special Buckets",
    tag: "Chef's Pick",
    price: "₹299",
    originalPrice: "₹499",
    img: "src/assets/kfc_food_PNG53.png",
    bg: "#1a0505",
    color: "#3b0d0d",
    accent: "#ff1744",
    accentDim: "#e4002b20",
    accentGlow: "#ff174440",
    particles: "steam",
    stat: "Hot & Fresh",
  },
  {
    id: 3,
    num: "03",
    name: "Tea Time",
    nameLine2: "Munchies",
    sub: "Kurkure Chutney Chaska",
    tag: "Best Seller",
    price: "₹20",
    originalPrice: "₹30",
    img: "src/assets/263-2632165_kurkure-chips-chutney-chaska-112-gm-kurkure-chutney.png",
    bg: "#141200",
    color: "#332e00",
    accent: "#ffd600",
    accentDim: "#fbc02d20",
    accentGlow: "#ffd60040",
    particles: "spice",
    stat: "#1 in India",
  },
  {
    id: 4,
    num: "04",
    name: "Chilled",
    nameLine2: "Drinks",
    sub: "Refreshing Sprite Can",
    tag: "Ice Cold",
    price: "₹40",
    originalPrice: "₹60",
    img: "src/assets/25cbd711878654d3cfa6d06c8539c72b-removebg-preview.png",
    bg: "#011a0a",
    color: "#003315",
    accent: "#00e5a0",
    accentDim: "#00ab4e20",
    accentGlow: "#00e5a040",
    particles: "ice",
    stat: "Ice Cold",
  },
];

const PARTICLE_CONFIGS: Record<Item['particles'], Particle[]> = {
  leaf: Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: 6 + Math.random() * 10,
    x: Math.random() * 100,
    duration: 4 + Math.random() * 4,
    delay: Math.random() * 3,
    rotate: Math.random() * 360,
    emoji: ["🌿", "🍃", "🌱"][i % 3],
  })),
  steam: Array.from({ length: 14 }, (_, i) => ({
    id: i,
    size: 20 + Math.random() * 30,
    x: 30 + Math.random() * 40,
    duration: 3 + Math.random() * 3,
    delay: Math.random() * 2,
  })),
  spice: Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: 3 + Math.random() * 6,
    x: Math.random() * 100,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 2,
    color: ["#ff6d00", "#ffd600", "#ff1744"][i % 3],
  })),
  ice: Array.from({ length: 16 }, (_, i) => ({
    id: i,
    size: 4 + Math.random() * 10,
    x: Math.random() * 100,
    duration: 4 + Math.random() * 3,
    delay: Math.random() * 3,
    opacity: 0.3 + Math.random() * 0.5,
  })),
};

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

const ParticleField: React.FC<{ type: Item['particles'], accent: string, visible: boolean }> = ({ type, accent, visible }) => {
  const particles = useMemo(() => PARTICLE_CONFIGS[type] || [], [type]);
  if (!visible) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {type === "leaf" && particles.map(p => (
        <motion.div key={p.id} className="absolute" style={{ left: `${p.x}%`, bottom: "-10%", fontSize: p.size }}
          animate={{ y: [0, "-120vh"], rotate: [p.rotate!, p.rotate! + 180], x: [0, 40, -30, 20, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}>{p.emoji}</motion.div>
      ))}
      {type === "steam" && particles.map(p => (
        <motion.div key={p.id} className="absolute rounded-full" style={{ left: `${p.x}%`, bottom: "30%", width: p.size, height: p.size, background: `radial-gradient(circle, ${accent}30, transparent)` }}
          animate={{ y: [0, -200], opacity: [0.6, 0], scale: [0.5, 2] }} transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }} />
      ))}
      {/* ... similar mapping for spice and ice */}
    </div>
  );
};

const KineticTitle: React.FC<{ line1: string, line2: string, accent: string, visible: boolean }> = ({ line1, line2, accent, visible }) => {
  // ERROR FIX: Variants with proper typing
  const titleVariants: Variants = {
    hidden: { y: "120%", opacity: 0, skewY: 8 },
    show: (i: number) => ({ 
      y: "0%", opacity: 1, skewY: 0, 
      transition: { delay: i * 0.04 + 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    }),
    exit: (i: number) => ({ 
      y: "-120%", opacity: 0, skewY: -8, 
      transition: { delay: i * 0.02, duration: 0.4, ease: [0.7, 0, 1, 0.4] } 
    }),
  };

  const renderChars = (text: string, startIndex: number, color: string) => (
    <div className="overflow-hidden flex">
      {text.split("").map((c, i) => (
        <motion.span key={i} custom={i + startIndex} variants={titleVariants} initial="hidden" animate={visible ? "show" : "exit"}
          className="font-black leading-none tracking-tighter inline-block whitespace-pre"
          style={{ fontSize: "clamp(42px, 8vw, 130px)", color }}>
          {c}
        </motion.span>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col">
      {renderChars(line1, 0, "white")}
      {renderChars(line2, line1.length, accent)}
    </div>
  );
};

const DeliveryBadge: React.FC<{ visible: boolean, accent: string }> = ({ visible, accent }) => (
  <motion.div initial={{ opacity: 0, x: -20 }} animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-widest border"
    style={{ background: `${accent}15`, borderColor: `${accent}40`, color: accent }}>
    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
    ⚡ Delivery in 10 mins
  </motion.div>
);

const GlassCard: React.FC<{ label: string, value: string, accent: string, visible: boolean, delay?: number }> = ({ label, value, accent, visible, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 0.3 + delay }}
    className="rounded-xl px-4 py-3 border backdrop-blur-md bg-white/5" style={{ borderColor: `${accent}30` }}>
    <div className="text-[10px] uppercase tracking-tighter opacity-50 text-white">{label}</div>
    <div className="font-bold text-sm" style={{ color: accent }}>{value}</div>
  </motion.div>
);

const MagneticCTA: React.FC<{ accent: string, visible: boolean }> = ({ accent, visible }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [added, setAdded] = useState(false);

  return (
    <motion.button ref={btnRef} 
      onMouseMove={(e) => {
        const rect = btnRef.current?.getBoundingClientRect();
        if (rect) {
          x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
          y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
        }
      }}
      onMouseLeave={() => { animate(x, 0); animate(y, 0); }}
      onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000); }}
      style={{ x, y, background: accent }}
      className="relative px-8 py-4 rounded-full font-black text-black text-xs uppercase tracking-widest overflow-hidden group shadow-2xl"
    >
      <span className="relative z-10">{added ? "✓ Added" : "Add to Cart →"}</span>
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
    </motion.button>
  );
};

const FloatingProduct: React.FC<{ item: Item, progress: MotionValue<number>, index: number }> = ({ item, progress, index }) => {
  const start = index / 4;
  const end = (index + 1) / 4;
  const scale = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0.5, 1, 1, 0.5]);
  const opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);

  return (
    <motion.div style={{ scale, opacity }} className="relative">
      <div className="absolute inset-0 blur-[100px] rounded-full" style={{ background: item.accentGlow }} />
      <img src={item.img} alt={item.name} className="relative z-10 w-[280px] lg:w-[450px] drop-shadow-[0_50px_50px_rgba(0,0,0,0.5)]" />
    </motion.div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function BlinkitShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * 4), 3);
      if (idx !== activeIndex) {
        setActiveIndex(idx);
        if (bgRef.current) gsap.to(bgRef.current, { backgroundColor: ITEMS[idx].bg, duration: 0.8 });
      }
    });
  }, [smoothProgress, activeIndex]);

  const activeItem = ITEMS[activeIndex];

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <section ref={bgRef} className="sticky top-0 h-screen w-full overflow-hidden bg-[#071a09] transition-colors duration-700">
        
        {/* Background Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <h2 className="text-[25vw] font-black uppercase opacity-5 select-none" 
            style={{ WebkitTextStroke: `2px ${activeItem.accent}`, color: 'transparent' }}>Blinkit</h2>
        </div>

        {/* Particles */}
        {ITEMS.map((item, i) => (
          <ParticleField key={item.id} type={item.particles} accent={item.accent} visible={activeIndex === i} />
        ))}

        {/* Content Layout */}
        <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 gap-10">
          <div className="flex-1 space-y-8">
            <DeliveryBadge visible={true} accent={activeItem.accent} />
            <KineticTitle line1={activeItem.name} line2={activeItem.nameLine2} accent={activeItem.accent} visible={true} />
            <p className="text-white/50 text-sm max-w-xs">{activeItem.sub}</p>
            
            <div className="flex gap-3">
              <GlassCard label="Price" value={activeItem.price} accent={activeItem.accent} visible={true} />
              <GlassCard label="Original" value={activeItem.originalPrice} accent={activeItem.accent} visible={true} delay={0.1} />
              <GlassCard label="Status" value={activeItem.stat} accent={activeItem.accent} visible={true} delay={0.2} />
            </div>

            <MagneticCTA accent={activeItem.accent} visible={true} />
          </div>

          <div className="flex-1 flex justify-center items-center">
            <FloatingProduct item={activeItem} progress={smoothProgress} index={activeIndex} />
          </div>
        </div>

        {/* Navigation Indicator */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          {ITEMS.map((_, i) => (
            <div key={i} className="w-1 h-10 rounded-full bg-white/10 overflow-hidden">
              {i === activeIndex && (
                <motion.div layoutId="nav" className="w-full h-full" style={{ backgroundColor: activeItem.accent }} />
              )}
            </div>
          ))}
        </div>

        {/* Counter */}
        <div className="absolute left-10 bottom-10 flex items-baseline gap-2 font-black">
          <span className="text-6xl" style={{ color: activeItem.accent }}>{activeItem.num}</span>
          <span className="text-white/20 text-xl">/ 04</span>
        </div>

      </section>
    </div>
  );
}