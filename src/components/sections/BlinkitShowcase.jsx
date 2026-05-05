import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ────────────────────────────────────────────────────────────────────

const ITEMS = [
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

// ─── PARTICLE SYSTEM ─────────────────────────────────────────────────────────

const PARTICLE_CONFIGS = {
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

function ParticleLeaf({ p, accent }) {
  return (
    <motion.div
      key={p.id}
      className="absolute pointer-events-none select-none"
      style={{ left: `${p.x}%`, bottom: "-10%", fontSize: p.size }}
      animate={{ y: [0, -window.innerHeight * 1.2], rotate: [p.rotate, p.rotate + 180], x: [0, 40, -30, 20, 0] }}
      transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
    >
      {p.emoji}
    </motion.div>
  );
}

function ParticleSteam({ p, accent }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${p.x}%`, bottom: "30%", width: p.size, height: p.size, background: `radial-gradient(circle, ${accent}30, transparent)` }}
      animate={{ y: [0, -200], opacity: [0.6, 0], scale: [0.5, 2] }}
      transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

function ParticleSpice({ p }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${p.x}%`, bottom: "20%", width: p.size, height: p.size, backgroundColor: p.color }}
      animate={{ y: [0, -300, -100], x: [0, 60, -40], opacity: [1, 0.5, 0], scale: [1, 0.5, 0] }}
      transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function ParticleIce({ p, accent }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${p.x}%`, top: `${Math.random() * 80}%`, width: p.size, height: p.size, background: `${accent}60`, transform: "rotate(45deg)", opacity: p.opacity }}
      animate={{ y: [0, 30, 0], opacity: [p.opacity, p.opacity * 0.3, p.opacity], rotate: [45, 90, 45] }}
      transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function ParticleField({ type, accent, visible }) {
  const particles = PARTICLE_CONFIGS[type] || [];
  if (!visible) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {type === "leaf" && particles.map(p => <ParticleLeaf key={p.id} p={p} accent={accent} />)}
      {type === "steam" && particles.map(p => <ParticleSteam key={p.id} p={p} accent={accent} />)}
      {type === "spice" && particles.map(p => <ParticleSpice key={p.id} p={p} />)}
      {type === "ice" && particles.map(p => <ParticleIce key={p.id} p={p} accent={accent} />)}
    </div>
  );
}

// ─── KINETIC TITLE ────────────────────────────────────────────────────────────

function KineticTitle({ line1, line2, accent, visible }) {
  const chars1 = line1.split("");
  const chars2 = line2.split("");
  const variants = {
    hidden: { y: "120%", opacity: 0, skewY: 8 },
    show: (i) => ({ y: "0%", opacity: 1, skewY: 0, transition: { delay: i * 0.04 + 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }),
    exit: (i) => ({ y: "-120%", opacity: 0, skewY: -8, transition: { delay: i * 0.02, duration: 0.4, ease: [0.7, 0, 1, 0.4] } }),
  };
  return (
    <div>
      <div className="overflow-hidden">
        <div className="flex">
          {chars1.map((c, i) => (
            <motion.span key={i} custom={i} variants={variants} initial="hidden" animate={visible ? "show" : "exit"}
              className="text-white font-black leading-none tracking-tighter"
              style={{ fontSize: "clamp(52px, 8vw, 130px)", display: "inline-block", whiteSpace: "pre" }}>
              {c}
            </motion.span>
          ))}
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="flex">
          {chars2.map((c, i) => (
            <motion.span key={i} custom={i + chars1.length} variants={variants} initial="hidden" animate={visible ? "show" : "exit"}
              className="font-black leading-none tracking-tighter"
              style={{ fontSize: "clamp(52px, 8vw, 130px)", display: "inline-block", whiteSpace: "pre", color: accent }}>
              {c}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAGNETIC BUTTON ─────────────────────────────────────────────────────────

function MagneticCTA({ accent, visible }) {
  const btnRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [added, setAdded] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    animate(x, 0, { type: "spring", stiffness: 300, damping: 25 });
    animate(y, 0, { type: "spring", stiffness: 300, damping: 25 });
  }, [x, y]);

  const handleClick = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
      <motion.button ref={btnRef} style={{ x, y }}
        onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={handleClick}
        whileTap={{ scale: 0.95 }}
        className="relative overflow-hidden group px-10 py-5 rounded-full font-black text-black text-sm uppercase tracking-[0.2em]"
        style={{ background: accent, boxShadow: `0 0 40px ${accent}60` }}>
        <motion.span className="relative z-10 flex items-center gap-3">
          {added ? (
            <><span>✓</span><span>Added to Cart</span></>
          ) : (
            <><span>Add to Cart</span><motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span></>
          )}
        </motion.span>
        <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at center, #ffffff30, transparent)` }} />
      </motion.button>
    </motion.div>
  );
}

// ─── GLASS STAT CARD ─────────────────────────────────────────────────────────

function GlassCard({ label, value, accent, visible, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
      transition={{ delay: 0.3 + delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl px-5 py-4 border"
      style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", borderColor: `${accent}30` }}>
      <div className="text-xs uppercase tracking-widest opacity-50 text-white mb-1">{label}</div>
      <div className="font-black text-white text-lg" style={{ color: accent }}>{value}</div>
    </motion.div>
  );
}

// ─── DELIVERY BADGE ───────────────────────────────────────────────────────────

function DeliveryBadge({ visible, accent }) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest"
      style={{ background: `${accent}15`, border: `1px solid ${accent}40`, color: accent }}>
      <motion.span animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
        className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
      ⚡ Delivery in 10 mins
    </motion.div>
  );
}

// ─── FLOATING PRODUCT ────────────────────────────────────────────────────────

function FloatingProduct({ item, progress, index }) {
  const imgRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 150, damping: 20 });
  const tiltY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 150, damping: 20 });

  const start = index / 4;
  const end = (index + 1) / 4;
  const mid = (start + end) / 2;

  const scale = useTransform(progress, [start, start + 0.08, mid - 0.05, mid + 0.05, end - 0.08, end], [0.3, 1.05, 1, 1, 1.05, 0.3]);
  const z = useTransform(progress, [start, start + 0.08, end - 0.08, end], [-600, 0, 0, -600]);
  const opacity = useTransform(progress, [start, start + 0.06, end - 0.06, end], [0, 1, 1, 0]);
  const blur = useTransform(progress, [start, start + 0.08, end - 0.08, end], [20, 0, 0, 20]);
  const rotate = useTransform(progress, [start, start + 0.08, end - 0.08, end], [-12, 0, 0, 12]);

  const handleMouseMove = useCallback((e) => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  }, [mouseX, mouseY]);

  return (
    <motion.div ref={imgRef} onMouseMove={handleMouseMove} onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative flex items-center justify-center" style={{ perspective: "1200px" }}>
      {/* Glow aura */}
      <motion.div className="absolute rounded-full pointer-events-none"
        style={{ width: 500, height: 500, background: `radial-gradient(circle, ${item.accentGlow}, transparent 70%)` }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />

      {/* Rotating ring */}
      <motion.div className="absolute rounded-full border pointer-events-none"
        style={{ width: 380, height: 380, borderColor: `${item.accent}20` }}
        animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full" style={{ backgroundColor: item.accent }} />
      </motion.div>

      {/* Light sweep overlay */}
      <motion.div className="absolute w-full h-full rounded-full pointer-events-none overflow-hidden"
        style={{ width: 500, height: 500 }}>
        <motion.div className="absolute inset-0" style={{ background: `conic-gradient(from 0deg, transparent 0%, ${item.accent}15 10%, transparent 20%)` }}
          animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
      </motion.div>

      {/* Product */}
      <motion.div style={{ scale, opacity, rotateZ: rotate, z, filter: useTransform(blur, v => `blur(${v}px)`), rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}>
        <motion.img src={item.img} alt={item.name}
          className="relative z-10 pointer-events-none select-none drop-shadow-[0_80px_120px_rgba(0,0,0,0.8)]"
          style={{ width: "clamp(260px, 35vw, 520px)", height: "auto" }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>

      {/* Shadow */}
      <motion.div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{ width: 300, height: 30, background: `radial-gradient(ellipse, ${item.accent}30, transparent 70%)` }}
        animate={{ scaleX: [1, 0.85, 1], opacity: [0.6, 0.3, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
    </motion.div>
  );
}

// ─── PRODUCT SCENE ────────────────────────────────────────────────────────────

function ProductScene({ item, index, progress, isActive }) {
  const start = index / 4;
  const end = (index + 1) / 4;

  const contentOpacity = useTransform(progress, [start, start + 0.06, end - 0.06, end], [0, 1, 1, 0]);
  const textX = useTransform(progress, [start, start + 0.1, end - 0.1, end], [-80, 0, 0, -80]);

  return (
    <motion.div style={{ opacity: contentOpacity }} className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center px-8 lg:px-20 gap-8 lg:gap-0 z-10">
      {/* LEFT: Text */}
      <motion.div style={{ x: textX }} className="w-full lg:w-1/2 flex flex-col gap-6 order-2 lg:order-1">
        <DeliveryBadge visible={isActive} accent={item.accent} />

        <KineticTitle line1={item.name} line2={item.nameLine2} accent={item.accent} visible={isActive} />

        <motion.p initial={{ opacity: 0 }} animate={isActive ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white text-base tracking-wide max-w-xs font-light">
          {item.sub}
        </motion.p>

        {/* Price */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.35 }} className="flex items-center gap-4">
          <span className="text-white font-black text-4xl" style={{ color: item.accent }}>{item.price}</span>
          <span className="text-white opacity-30 line-through text-xl font-light">{item.originalPrice}</span>
          <span className="text-xs font-black px-2 py-1 rounded" style={{ background: `${item.accent}25`, color: item.accent }}>
            {Math.round((1 - parseInt(item.price.slice(1)) / parseInt(item.originalPrice.slice(1))) * 100)}% OFF
          </span>
        </motion.div>

        <div className="flex gap-3 flex-wrap">
          <GlassCard label="Delivery" value="10 min" accent={item.accent} visible={isActive} delay={0} />
          <GlassCard label="Category" value={item.tag} accent={item.accent} visible={isActive} delay={0.1} />
          <GlassCard label="Rating" value={item.stat} accent={item.accent} visible={isActive} delay={0.2} />
        </div>

        <MagneticCTA accent={item.accent} visible={isActive} />
      </motion.div>

      {/* RIGHT: Product */}
      <div className="w-full lg:w-1/2 flex justify-center items-center relative order-1 lg:order-2" style={{ perspective: "1200px" }}>
        <FloatingProduct item={item} progress={progress} index={index} />
      </div>
    </motion.div>
  );
}

// ─── PROGRESS TRACKER ────────────────────────────────────────────────────────

function ProgressTracker({ progress, activeIndex }) {
  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 items-center">
      {ITEMS.map((item, i) => {
        const isActive = i === activeIndex;
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <motion.div animate={{ scale: isActive ? 1 : 0.6, opacity: isActive ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: isActive ? item.accent : "#ffffff" }} />
            {isActive && (
              <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} className="w-0.5 h-8 rounded-full origin-top"
                style={{ backgroundColor: item.accent }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── COUNTER ─────────────────────────────────────────────────────────────────

function ProductCounter({ activeIndex, accent }) {
  return (
    <div className="absolute left-8 bottom-10 z-50 flex items-end gap-2">
      <motion.span key={activeIndex} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }}
        className="font-black text-white text-5xl leading-none" style={{ color: accent, fontVariantNumeric: "tabular-nums" }}>
        {ITEMS[activeIndex].num}
      </motion.span>
      <span className="text-white opacity-20 text-xl font-light mb-1">/ 04</span>
    </div>
  );
}

// ─── NOISE OVERLAY ────────────────────────────────────────────────────────────

function NoiseOverlay() {
  return (
    <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px",
      }} />
  );
}

// ─── SCAN LINE ────────────────────────────────────────────────────────────────

function ScanLine() {
  return (
    <motion.div className="absolute left-0 right-0 h-[1px] z-40 pointer-events-none"
      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }}
      animate={{ top: ["0%", "100%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
  );
}

// ─── BLINKIT BG TEXT ──────────────────────────────────────────────────────────

function BackgroundText({ accent }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none">
      <motion.h2
        animate={{ opacity: [0.025, 0.045, 0.025] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="text-white font-black uppercase leading-none"
        style={{ fontSize: "clamp(100px, 20vw, 340px)", letterSpacing: "-0.05em", color: accent, WebkitTextStroke: `2px ${accent}30`, WebkitTextFillColor: "transparent" }}>
        Blinkit
      </motion.h2>
    </div>
  );
}

// ─── MASTER COMPONENT ─────────────────────────────────────────────────────────

export default function BlinkitShowcase() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.0001 });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      const raw = Math.floor(v * 4);
      const idx = Math.min(raw, 3);
      setActiveIndex(idx);
      gsap.to(bgRef.current, { backgroundColor: ITEMS[idx].bg, duration: 1, ease: "power3.out" });
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  const activeItem = ITEMS[activeIndex];

  return (
    <div ref={containerRef} style={{ height: "600vh" }} className="relative">
      <section ref={bgRef} className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor: ITEMS[0].bg, transition: "background-color 0.8s ease" }}>

        <NoiseOverlay />
        <ScanLine />
        <BackgroundText accent={activeItem.accent} />

        {/* Ambient radial glow center */}
        <motion.div className="absolute inset-0 pointer-events-none z-0"
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: `radial-gradient(ellipse 70% 60% at 60% 50%, ${activeItem.accentDim}, transparent)` }} />

        {/* Particle fields for each item */}
        {ITEMS.map((item, i) => (
          <ParticleField key={item.id} type={item.particles} accent={item.accent} visible={activeIndex === i} />
        ))}

        {/* Product scenes */}
        {ITEMS.map((item, i) => (
          <ProductScene key={item.id} item={item} index={i} progress={smoothProgress} isActive={activeIndex === i} />
        ))}

        {/* UI Chrome */}
        <ProgressTracker progress={smoothProgress} activeIndex={activeIndex} />
        <ProductCounter activeIndex={activeIndex} accent={activeItem.accent} />

        {/* Top bar */}
        <div className="absolute top-8 left-8 right-8 z-50 flex items-center justify-between">
          <motion.div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-black text-sm"
              style={{ backgroundColor: "#ffd600" }}>B</div>
            <span className="text-white font-black text-sm uppercase tracking-widest opacity-70">Blinkit</span>
          </motion.div>
          <div className="text-white opacity-30 text-xs uppercase tracking-widest font-light">
            {activeItem.tag}
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div className="absolute bottom-10 right-1/2 translate-x-1/2 z-50 flex flex-col items-center gap-2"
          initial={{ opacity: 1 }} animate={activeIndex > 0 ? { opacity: 0 } : { opacity: 1 }}>
          <span className="text-white opacity-20 text-xs uppercase tracking-widest font-light">Scroll to explore</span>
          <motion.div className="w-px h-12 origin-top" style={{ backgroundColor: activeItem.accent, opacity: 0.4 }}
            animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </section>
    </div>
  );
}