import { motion } from "framer-motion";
import phone from "@/assets/phone.png";

export default function CTA() {
  return (
    <section id="cta" className="relative bg-cream py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-neon/40 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-deep/10 blur-3xl" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs uppercase tracking-[0.4em] text-deep/60">/ Get the app</span>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-deep mt-4 leading-[0.95]">
            Your city, in your <span className="text-neon [text-shadow:0_2px_0_var(--deep)]">pocket</span>.
          </h2>
          <p className="text-deep/70 mt-6 max-w-md text-lg">
            Tap. Track. Receive. Blinkit's app gets groceries, medicines, electronics and more to your door faster than you can scroll this page.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a href="#" className="group inline-flex items-center gap-3 bg-deep text-neon rounded-full px-7 py-4 font-semibold hover:shadow-[0_0_40px_var(--neon)] transition-all">
              <span>App Store</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#" className="group inline-flex items-center gap-3 bg-neon text-deep rounded-full px-7 py-4 font-semibold hover:bg-deep hover:text-neon transition-all">
              <span>Google Play</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="flex items-center gap-6 mt-10 text-deep/60 text-sm">
            <div><strong className="text-deep text-2xl font-display">4.9★</strong><br />2.1M reviews</div>
            <div className="w-px h-10 bg-deep/20" />
            <div><strong className="text-deep text-2xl font-display">#1</strong><br />Shopping app</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring" }}
          className="relative flex justify-center"
        >
          <div className="absolute inset-0 m-auto w-[300px] h-[300px] rounded-full bg-neon blur-3xl opacity-50" />
          <img src={phone} alt="Blinkit mobile app" width={832} height={1280} className="relative w-[70%] max-w-[420px] drop-shadow-[0_40px_60px_rgba(0,0,0,0.25)] hover-bob" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="absolute top-10 right-0 glass rounded-2xl p-4"
          >
            <div className="text-xs uppercase tracking-widest text-deep/60">Order placed</div>
            <div className="font-display text-2xl text-deep font-bold">🥕 + 12 items</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-12 left-0 bg-deep text-neon rounded-2xl p-4"
          >
            <div className="text-xs uppercase tracking-widest text-neon/70">Arriving in</div>
            <div className="font-display text-3xl font-bold">07:42</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
