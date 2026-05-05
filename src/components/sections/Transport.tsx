import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import rider from "@/assets/rider-2.png";
import citySkyline from "@/assets/city-skyline.jpg";
import cityFar from "@/assets/city-far.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function Transport() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const bikeRef = useRef<HTMLDivElement>(null);
  const bikeImgRef = useRef<HTMLImageElement>(null);
  const bounceRef = useRef<HTMLDivElement>(null);
  const cityNearRef = useRef<HTMLDivElement>(null);
  const cityFarRef = useRef<HTMLDivElement>(null);
  const lampsRef = useRef<HTMLDivElement>(null);
  const roadLinesRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);

  const [progress, setProgress] = useState(0);
  const [eta, setEta] = useState(10);
  const [windLines, setWindLines] = useState<Array<{width: string, top: string}>>([]);

  useEffect(() => {
    // Generate wind lines data on client side to avoid hydration mismatch
    const lines = Array.from({ length: 10 }).map(() => ({
      width: Math.random() * 150 + 80 + "px",
      top: Math.random() * 50 + 20 + "%",
    }));
    setWindLines(lines);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 0.8,
          pin: sceneRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
            setEta(Math.max(1, Math.round(10 - self.progress * 9)));
          },
        },
        defaults: { ease: "none" },
      });

      // Rider crosses the screen
      tl.fromTo(
        bikeRef.current,
        { xPercent: -120, yPercent: 0, scale: 0.85 },
        { xPercent: 60, scale: 1, ease: "power1.inOut", duration: 1 },
        0
      );

      // FIX: Parallax using backgroundPositionX for seamless looping
      tl.to(cityFarRef.current, { backgroundPositionX: "-300px", duration: 1 }, 0);
      tl.to(cityNearRef.current, { backgroundPositionX: "-1000px", duration: 1 }, 0);
      
      tl.fromTo(lampsRef.current, { xPercent: 0 }, { xPercent: -55, duration: 1 }, 0);
      tl.fromTo(
        roadLinesRef.current,
        { backgroundPositionX: "0px" },
        { backgroundPositionX: "-3000px", duration: 1 },
        0
      );

      // Headline subtle scroll motion
      tl.fromTo(
        headlineRef.current,
        { yPercent: 0, opacity: 1 },
        { yPercent: -30, opacity: 0.15, duration: 1, ease: "power2.in" },
        0
      );
      tl.fromTo(
        subRef.current,
        { yPercent: 0, opacity: 0.9 },
        { yPercent: -60, opacity: 0, duration: 0.6, ease: "power2.in" },
        0
      );

      // Continuous wheel + suspension
      gsap.to(bikeImgRef.current, {
        y: -3,
        duration: 0.28,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(bounceRef.current, {
        rotate: 0.6,
        duration: 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // NEW: Wind streaks animation
      gsap.to(".wind-line", {
        x: -1200,
        opacity: 0,
        duration: 0.6,
        repeat: -1,
        ease: "none",
        stagger: { each: 0.1, repeat: -1 }
      });

      // Reveal copy on entry
      gsap.fromTo(
        [tagRef.current, headlineRef.current, subRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stages = ["Order placed", "Packed", "On the way", "Delivered"];
  const activeStage = progress < 0.15 ? 0 : progress < 0.45 ? 1 : progress < 0.9 ? 2 : 3;

  return (
    <section ref={sectionRef} className="relative w-full bg-[hsl(220_15%_8%)]">
      <div ref={sceneRef} className="relative h-screen w-full overflow-hidden">
        {/* Sky */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(28 65% 78%) 0%, hsl(20 55% 68%) 35%, hsl(15 40% 50%) 65%, hsl(220 25% 18%) 100%)",
          }}
        />

        {/* Far skyline - FIXED REPEAT */}
        <div
          ref={cityFarRef}
          className="absolute inset-x-0 bottom-[34%] h-[42%] opacity-70"
          style={{
            backgroundImage: `url(${cityFar})`,
            backgroundSize: "cover",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "center bottom",
            filter: "blur(1px) saturate(0.85)",
          }}
        />

        {/* Near city - FIXED REPEAT */}
        <div
          ref={cityNearRef}
          className="absolute inset-x-0 bottom-[22%] h-[52%]"
          style={{
            backgroundImage: `url(${citySkyline})`,
            backgroundSize: "cover",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "center bottom",
            maskImage: "linear-gradient(180deg, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* NEW: Wind Lines */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {windLines.map((line, i) => (
            <div
              key={i}
              className="wind-line absolute h-[1px] bg-white/20"
              style={{
                width: line.width,
                top: line.top,
                left: "110%",
              }}
            />
          ))}
        </div>

        {/* Atmospheric haze */}
        <div
          className="absolute inset-x-0 bottom-[20%] h-[30%] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, hsl(20 40% 55% / 0.35) 60%, hsl(20 40% 45% / 0.55) 100%)",
          }}
        />

        {/* Headline copy */}
        <div className="absolute inset-x-0 top-[10%] z-20 flex flex-col items-center px-6 text-center">
          <span
            ref={tagRef}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-white/80 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#F8CB46]" />
            Quick commerce · Live
          </span>
          <h2
            ref={headlineRef}
            className="font-semibold tracking-tight text-white"
            style={{
              fontSize: "clamp(2.25rem, 6.5vw, 5.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              textShadow: "0 4px 30px rgba(0,0,0,0.35)",
            }}
          >
            Groceries in <span className="text-[#F8CB46]">10 Minutes</span>
          </h2>
          <p
            ref={subRef}
            className="mt-4 max-w-xl text-sm md:text-base text-white/75"
          >
            From store to door — quick, fresh, delivered. Real riders, real time.
          </p>
        </div>

        {/* Street lamps row */}
        <div
          ref={lampsRef}
          className="absolute bottom-[18%] left-0 right-0 h-[28%] pointer-events-none"
          aria-hidden
        >
          <div className="relative h-full w-[200%]">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute bottom-0"
                style={{ left: `${i * 9}%` }}
              >
                <div className="relative">
                  <div className="h-[140px] w-[2px] bg-gradient-to-b from-white/10 to-black/60" />
                  <div className="absolute -top-1 left-[-14px] h-[3px] w-[30px] rounded-full bg-black/70" />
                  <div
                    className="absolute -top-3 left-[-18px] h-[12px] w-[38px] rounded-sm"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, #FFE08A 0%, #F8CB46 40%, transparent 75%)",
                      boxShadow: "0 0 30px 6px rgba(248,203,70,0.45)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Road */}
        <div className="absolute inset-x-0 bottom-0 h-[22%] z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, hsl(220 12% 16%) 0%, hsl(220 14% 11%) 50%, hsl(220 16% 7%) 100%)",
            }}
          />
          <div
            ref={roadLinesRef}
            className="absolute inset-x-0 top-[55%] h-[6px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.85) 0 60px, transparent 60px 130px)",
              opacity: 0.7,
              filter: "blur(0.4px)",
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-[1px]"
            style={{ background: "rgba(255,255,255,0.15)" }}
          />
        </div>

        {/* Rider */}
        <div
          ref={bikeRef}
          className="absolute left-0 bottom-[10%] z-30 will-change-transform"
          style={{ width: "min(38vw, 460px)" }}
        >
          <div ref={bounceRef} className="relative">
            <img
              ref={bikeImgRef}
              src={rider}
              alt="Blinkit delivery rider on scooter"
              className="block w-full h-auto select-none"
              draggable={false}
              style={{
                filter:
                  "drop-shadow(0 18px 22px rgba(0,0,0,0.45)) saturate(1.05)",
              }}
            />
            <div
              className="absolute left-[8%] right-[8%] -bottom-2 h-3 rounded-[50%]"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 70%)",
                filter: "blur(2px)",
              }}
            />
          </div>
        </div>

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-40"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* ETA card — top right */}
        <div className="absolute top-6 right-6 z-50 hidden sm:block">
          <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8CB46] text-black font-bold">
              {eta}
            </div>
            <div className="leading-tight">
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                Arriving in
              </div>
              <div className="text-sm font-semibold text-white">
                {eta} min · Sector 18
              </div>
            </div>
          </div>
        </div>

        {/* Order progress — bottom left */}
        <div className="absolute bottom-6 left-6 z-50 hidden md:block">
          <div className="rounded-2xl border border-white/15 bg-black/35 p-4 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] w-[260px]">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">
                Order #BK-29481
              </span>
              <span className="text-[10px] font-medium text-[#F8CB46]">
                {Math.round(progress * 100)}%
              </span>
            </div>
            <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#F8CB46] transition-[width] duration-300"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <ul className="space-y-1.5">
              {stages.map((s, i) => (
                <li
                  key={s}
                  className="flex items-center gap-2 text-[12px] text-white/80"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      i <= activeStage ? "bg-[#F8CB46]" : "bg-white/25"
                    }`}
                  />
                  <span className={i === activeStage ? "text-white" : ""}>
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA — bottom center */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
          <button
            type="button"
            className="group inline-flex items-center gap-2 rounded-full bg-[#F8CB46] px-6 py-3 text-sm font-semibold text-black shadow-[0_12px_30px_rgba(248,203,70,0.35)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Order now
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black text-[#F8CB46] transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}