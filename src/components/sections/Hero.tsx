import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import box from "@/assets/delivery-box.png";
import drone from "@/assets/drone.png";
import sky from "@/assets/sky.jpg";
import Badge from "../Badge";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const droneIntroRef = useRef<HTMLDivElement>(null);
  const boxIntroRef = useRef<HTMLDivElement>(null);
  const trailsIntroRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // GSAP Intro: Drone + Box entry from LEFT
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Start position: Screen ke baahar left mein
      gsap.set([droneIntroRef.current, boxIntroRef.current], {
        x: "-120vw", 
        rotate: -12,
        scale: 0.8
      });
      
      gsap.set(trailsIntroRef.current, { opacity: 0 });
      gsap.set(auraRef.current, { opacity: 0, scale: 0.6 });
      gsap.set([taglineRef.current, ctaRef.current], { opacity: 0, y: 24 });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(trailsIntroRef.current, { opacity: 1, duration: 0.4 })
        // Drone aur Box dono ko ek saath center mein laana
        .to([droneIntroRef.current, boxIntroRef.current], {
          x: "0vw",
          rotate: 0,
          scale: 1,
          duration: 2,
          ease: "expo.out",
        })
        .to(trailsIntroRef.current, { opacity: 0, duration: 0.6 }, "-=1")
        .to(auraRef.current, { opacity: 1, scale: 1, duration: 0.8 }, "-=0.5")
        .to([taglineRef.current, ctaRef.current], { opacity: 1, y: 0, stagger: 0.1 }, "-=0.4");
    });
    return () => ctx.revert();
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // --- DRONE SCROLL LOGIC ---
  // Drone center mein rahega (0.4 tak), fir box drop karke upar udd jayega
  const droneY = useTransform(scrollYProgress, [0, 0.4, 0.5, 0.8], ["0vh", "0vh", "-5vh", "-100vh"]);
  const droneOpacity = useTransform(scrollYProgress, [0.7, 0.85], [1, 0]);

  // --- BOX SCROLL LOGIC ---
  // Box drone ke niche rahega, fir 0.4 progress par drop hokar niche gir jayega
  const boxY = useTransform(scrollYProgress, 
    [0, 0.4, 0.65, 1], 
    ["18vh", "18vh", "85vh", "130vh"] // 18vh is the 'hanging' position under the drone
  );
  const boxScale = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 1.05]);
  const shock = useTransform(scrollYProgress, [0.6, 0.72], [0, 1]);

  // Parallax for Text & Sky (Same as before)
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative h-[280vh]" id="services">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ y: skyY, backgroundImage: `url(${sky})` }}
          className="absolute inset-0 bg-cover bg-center scale-140"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/10 to-cream" />

        {/* Text Layer (Same) */}
        <motion.div style={{ y: textY }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
          <h1 className="font-display font-bold text-deep leading-[0.8] text-center tracking-tighter">
            <span className="block text-[18vw] md:text-[14vw] mix-blend-multiply">INSTANT</span>
            <span className="block text-[18vw] md:text-[14vw] text-neon -mt-[3vw] [text-shadow:0_4px_30px_rgba(0,0,0,0.15)]">DELIVERY</span>
          </h1>
        </motion.div>

        {/* Tagline (Same) */}
        <div ref={taglineRef} className="absolute top-28 left-6 md:left-10 max-w-xs text-deep z-10">
          <p className="text-sm leading-relaxed">
            Traditional, yet futuristic delivery service that combines drones, electric fleets and AI routing to ship anything to your door in under 10 minutes.
          </p>
        </div>

        {/* DRONE */}
        <div ref={droneIntroRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] md:w-[35vw] z-20">
          <div ref={auraRef} className="absolute inset-0 m-auto rounded-full bg-neon/30 blur-3xl" style={{ width: "80%", height: "80%" }} />
          <motion.img
            src={drone}
            style={{ y: droneY, opacity: droneOpacity }}
            className="relative w-full drop-shadow-2xl"
          />
        </div>

        {/* BOX (Positioned relative to Drone) */}
        <div ref={boxIntroRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] md:w-[22vw] z-30">
          <motion.img
            src={box}
            style={{ y: boxY, scale: boxScale }}
            className="w-full drop-shadow-2xl"
          />
        </div>

        {/* Impact Shockwave (Same) */}
        <motion.div style={{ opacity: shock }} className="absolute left-1/2 top-[80%] -translate-x-1/2 z-10 pointer-events-none">
          <div className="w-[50vw] h-[50vw] rounded-full border-2 border-neon/60 shockwave" />
        </motion.div>

        {/* UI Elements (Same) */}
        <div className="absolute top-[42%] left-6 md:left-12 z-30"><Badge size={150} /></div>
        <div ref={ctaRef} className="absolute bottom-32 right-6 md:right-12 z-30">
          <div className="glass-dark text-cream rounded-2xl px-5 py-4 flex items-center gap-3">
             <div className="text-2xl font-display font-bold">10 : 00 min</div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-deep/70 text-xs tracking-[0.4em] uppercase flex flex-col items-center gap-2">
          <span>Scroll</span>
          <span className="block w-px h-10 bg-deep/40 origin-top animate-pulse" />
        </div>
      </div>
    </section>
  );
}