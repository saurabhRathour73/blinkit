import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import box from "@/assets/delivery-box.png";

const features = [
  { t: "Climate Control", d: "Active cooling keeps perishables crisp.", x: "-32%", y: "-15%" },
  { t: "Live Tracking", d: "Sub-second GPS ping with route prediction.", x: "32%", y: "-22%" },
  { t: "Tamper Seal", d: "Smart lock opens only at your door.", x: "-38%", y: "25%" },
  { t: "Eco Packaging", d: "100% reusable composite shells.", x: "35%", y: "22%" },
];

export default function FeaturesBox() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 25 });

  const scale = useTransform(smoothProgress, [0, 0.4], [0.8, 1.1]);
  const rot = useTransform(smoothProgress, [0, 1], [-8, 8]);
  
  // NEW: "Exploded Tech" offsets - Elements pop out of the box
  const techPopY = useTransform(smoothProgress, [0.3, 0.7], [0, -180]);
  const techPopX = useTransform(smoothProgress, [0.4, 0.8], [0, 100]);
  const opacityIn = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);

  return (
    <section ref={ref} className="relative h-[300vh] bg-white" id="stories">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-[#F9FAFB]">
        
        {/* Soft Animated Background Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] bg-[#F8CB46]/10 blur-[150px] rounded-full -top-1/4 -right-1/4" 
        />

        {/* Floating Tech-Blueprint Lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />

        {/* Main Title */}
        <div className="absolute top-16 text-center z-10">
          <motion.p 
            style={{ opacity: useTransform(smoothProgress, [0, 0.2], [1, 0]) }}
            className="text-[#F8CB46] font-black tracking-[0.4em] text-[10px] uppercase mb-2"
          >
            Evolution of Delivery
          </motion.p>
          <h2 className="text-6xl md:text-8xl font-black text-[#1F2937] tracking-tighter uppercase italic">
            Smart <span className="text-[#F8CB46]">Logic.</span>
          </h2>
        </div>

        {/* Central Box with Exploded Tech Components */}
        <motion.div style={{ scale, rotate: rot }} className="relative z-20">
          
          <img 
            src={box} 
            alt="Smart Box" 
            className="relative w-[65vw] md:w-[38vw] max-w-[520px] drop-shadow-[0_40px_80px_rgba(248,203,70,0.3)] z-10" 
          />

          {/* NEW: DISASSEMBLE ANIMATION (Tech Components popping out) */}
          
          {/* Component 1: Smart Chipset */}
          <motion.div 
            style={{ y: techPopY, opacity: opacityIn, x: -60 }}
            className="absolute top-0 left-1/2 p-4 bg-white shadow-2xl rounded-xl border-t-4 border-[#F8CB46] z-20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F8CB46]/20 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold text-[#F8CB46]">CPU</div>
              <div className="text-left">
                <div className="text-[10px] font-black text-gray-800 uppercase">Neural Core</div>
                <div className="text-[8px] text-gray-400">Path Optimization v2.0</div>
              </div>
            </div>
          </motion.div>

          {/* Component 2: Thermal Sensor */}
          <motion.div 
            style={{ x: techPopX, y: 50, opacity: opacityIn }}
            className="absolute right-[-40px] top-1/4 p-3 bg-white shadow-xl rounded-full border border-gray-100 z-20 flex items-center gap-2"
          >
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-gray-600">Temp: 4.2°C</span>
          </motion.div>

          {/* Component 3: GPS Pulse Radar */}
          <motion.div 
            style={{ x: useTransform(smoothProgress, [0.4, 0.8], [0, -180]), opacity: opacityIn }}
            className="absolute left-[-20px] bottom-1/4 z-0"
          >
            <div className="relative">
              <motion.div 
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-[#F8CB46] rounded-full"
              />
              <div className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center border-2 border-[#F8CB46]">
                <div className="w-2 h-2 bg-[#F8CB46] rounded-full" />
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Clean Minimal Info Cards */}
        {features.map((f, i) => (
          <motion.div
            key={f.t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{ left: `calc(50% + ${f.x})`, top: `calc(50% + ${f.y})` }}
            className="absolute hidden lg:block z-30"
          >
            <div className="group relative">
               {/* Animated Connecting Line to Box */}
               <div className="absolute top-1/2 left-[-20px] w-5 h-[1px] bg-[#F8CB46]/30 group-hover:w-10 transition-all" />
               
               <div className="bg-white/80 backdrop-blur-xl border-l-4 border-[#F8CB46] p-4 w-[220px] shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <h3 className="text-black font-black text-sm mb-1 uppercase tracking-tighter">{f.t}</h3>
                  <p className="text-gray-500 text-[10px] font-medium leading-relaxed uppercase">{f.d}</p>
               </div>
            </div>
          </motion.div>
        ))}

        {/* Bottom Floating Dynamic Counter */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="absolute bottom-12 bg-[#1F2937] text-white px-10 py-6 rounded-[2rem] shadow-2xl flex items-center gap-12 z-40"
        >
          <div className="text-center">
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-1">Processing Speed</p>
            <p className="text-2xl font-black italic tracking-tighter">0.003 <span className="text-[#F8CB46] text-xs">ms</span></p>
          </div>
          <div className="w-[1px] h-10 bg-gray-700" />
          <div className="text-center">
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-1">Encryption</p>
            <p className="text-2xl font-black italic tracking-tighter">AES-256</p>
          </div>
          <div className="w-[1px] h-10 bg-gray-700" />
          <div className="text-center">
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-1">Rider Connection</p>
            <p className="text-2xl font-black text-[#F8CB46] italic tracking-tighter">HYPER</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}