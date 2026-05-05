import { motion, useInView, easeOut } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// --- Custom Premium Counter ---
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 2000; 
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      // Cubic ease-out for smoother finish
      const progress = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(to * progress));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

export default function About() {
  const stats = [
    { v: 10, s: "+", l: "Years delivering" },
    { v: 1250, s: "+", l: "Riders & drones" },
    { v: 5, s: "", l: "Transport modes" },
    { v: 38, s: "", l: "Cities served" },
  ];

  // Variants for staggered entrance
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: easeOut } 
    }
  };

  return (
    <section className="relative bg-[#0a0a0a] text-[#f5f5f0] py-32 px-6 md:px-12 overflow-hidden" id="network">
      {/* Background Animated Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ccff00]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ccff00]/5 blur-[100px] rounded-full translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span variants={itemVars} className="text-xs uppercase tracking-[0.5em] text-[#ccff00] font-bold">
            / Our legacy
          </motion.span>
          
          <motion.h2 variants={itemVars} className="font-display text-6xl md:text-8xl font-bold leading-[0.9] mt-8 tracking-tighter">
            COMMITTED TO <br />
            <span className="text-[#ccff00] inline-block">DELIVERING</span> THE BEST
          </motion.h2>

          <div className="grid lg:grid-cols-3 gap-12 mt-20 items-end">
            <motion.p variants={itemVars} className="text-xl text-[#f5f5f0]/60 leading-relaxed lg:col-span-2 max-w-2xl font-light">
              Blinkit is reinventing the last mile. From AI-powered dispatch to autonomous drones and an electric vehicle fleet,
              we orchestrate thousands of deliveries every minute — and obsess over every second.
            </motion.p>
            
            <motion.div variants={itemVars} className="flex justify-start lg:justify-end">
              <a href="#cta" className="group flex items-center gap-4 text-[#ccff00] font-bold uppercase tracking-widest text-sm">
                Explore Tech
                <div className="w-12 h-12 rounded-full border border-[#ccff00]/30 flex items-center justify-center group-hover:bg-[#ccff00] group-hover:text-[#0a0a0a] transition-all duration-500">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* --- Advanced Stats Cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-28">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group bg-[#151515] border border-white/5 p-10 rounded-[2.5rem] overflow-hidden"
            >
              {/* Inner Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ccff00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="font-display text-6xl md:text-7xl font-bold text-white group-hover:text-[#ccff00] transition-colors duration-500">
                  <Counter to={s.v} suffix={s.s} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] mt-4 text-[#f5f5f0]/40 font-bold group-hover:text-white transition-colors">
                  {s.l}
                </p>
              </div>

              {/* Decorative Corner Icon */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#ccff00] opacity-[0.02] rounded-full group-hover:scale-150 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}