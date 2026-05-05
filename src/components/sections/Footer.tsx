const cols = [
  { t: "Company", l: ["About", "Careers", "Press", "Blog"] },
  { t: "Services", l: ["Groceries", "Pharmacy", "Electronics", "Express"] },
  { t: "Support", l: ["Help center", "Contact", "Partners", "Riders"] },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-deep text-cream pt-20 overflow-hidden">
      {/* Marquee */}
      <div className="border-y border-cream/10 py-10 overflow-hidden">
        <div className="flex marquee-track whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-12 pr-12">
              {["Instant Delivery", "Smart Logistics", "Eco Fleet", "10 Min Promise", "AI Routing", "Drone Powered"].map((w, i) => (
                <span key={i} className="font-display text-6xl md:text-8xl font-bold text-cream/10 hover:text-neon transition-colors">
                  {w} <span className="text-neon">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <a href="#" className="text-3xl font-display font-bold">
            <span className="text-neon">blink</span><span className="text-cream">it.</span>
          </a>
          <p className="text-cream/60 mt-4 max-w-sm">
            Reinventing the last mile with autonomous fleets, smart packaging, and obsessive attention to every second.
          </p>
          <div className="flex gap-3 mt-6">
            {["Tw", "Ig", "In", "Yt"].map((s) => (
              <a key={s} href="#" className="w-11 h-11 rounded-full border border-cream/20 flex items-center justify-center text-sm hover:bg-neon hover:text-deep hover:border-neon transition-all">{s}</a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.t}>
            <div className="text-xs uppercase tracking-[0.3em] text-neon/70 mb-4">{c.t}</div>
            <ul className="space-y-2">
              {c.l.map((it) => (
                <li key={it}><a href="#" className="text-cream/80 hover:text-neon transition-colors">{it}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-cream/10 py-6 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-4 text-sm text-cream/50">
        <span>© 2026 Blinkit. All rights reserved.</span>
        <span>Made with <span className="text-neon">⚡</span> in 10 minutes or less.</span>
      </div>
    </footer>
  );
}
