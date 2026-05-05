import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import truck from "@/assets/truck.png";

// Cinematic highway. Truck enters from left, scroll drives motion.
export default function TruckSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-60%", "60%"]);
  const wheelRot = useTransform(scrollYProgress, [0, 1], [0, 1440]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={ref} className="relative h-[140vh] bg-deep overflow-hidden">
      <div className="sticky top-0 h-screen flex flex-col justify-between py-16 overflow-hidden">
        <div className="px-6 md:px-12 max-w-7xl mx-auto w-full flex items-start justify-between gap-6">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-cream leading-[0.95]">
            <span className="text-neon">Confident</span> about shipping?
            <br />We move at city speed.
          </h2>
          <div className="hidden md:flex flex-col items-end glass-dark rounded-2xl p-4 min-w-[180px]">
            <div className="text-[10px] uppercase tracking-[0.3em] text-neon/80">Speedometer</div>
            <div className="font-display text-4xl text-cream font-bold">82<span className="text-base text-cream/60">km/h</span></div>
            <div className="w-full h-1 bg-cream/10 rounded mt-2 overflow-hidden">
              <motion.div className="h-full bg-neon" style={{ scaleX: scrollYProgress, transformOrigin: "left" }} />
            </div>
          </div>
        </div>

        {/* Background city silhouette */}
        <motion.div style={{ x: bgX }} className="absolute inset-x-0 bottom-32 h-40 flex">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex-1 mx-1 bg-cream/5 rounded-t" style={{ height: `${30 + (i * 37) % 70}%` }} />
          ))}
        </motion.div>

        {/* Speed lines */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-px bg-gradient-to-l from-neon/60 to-transparent streak"
              style={{ top: `${20 + i * 7}%`, width: `${30 + (i * 11) % 40}%`, animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </div>

        {/* Truck */}
        <motion.div style={{ x }} className="relative w-full px-10 mb-16">
          <img src={truck} alt="Blinkit delivery truck" width={1600} height={900} className="w-[70vw] md:w-[55vw] max-w-[900px] mx-auto drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)]" />
          {/* Spinning wheels overlay */}
          <motion.div
            style={{ rotate: wheelRot }}
            className="absolute bottom-[18%] left-[26%] w-[5vw] h-[5vw] max-w-[60px] max-h-[60px] rounded-full border-2 border-neon/40"
          />
          <motion.div
            style={{ rotate: wheelRot }}
            className="absolute bottom-[18%] right-[20%] w-[5vw] h-[5vw] max-w-[60px] max-h-[60px] rounded-full border-2 border-neon/40"
          />
        </motion.div>

        {/* Road */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute top-1/2 inset-x-0 h-px overflow-hidden">
            <motion.div
              className="h-full"
              style={{
                backgroundImage: "repeating-linear-gradient(90deg, var(--neon) 0 24px, transparent 24px 56px)",
                width: "200%",
              }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
