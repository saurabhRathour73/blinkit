import { motion } from "framer-motion";

const links = ["Services", "Network", "Stories", "Careers", "Contact"];

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.7, duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between"
    >
      <a href="#" className="text-2xl font-display font-bold">
        <span className="text-neon drop-shadow-[0_0_10px_var(--neon)]">blink</span>
        <span className="text-deep">it.</span>
      </a>
      <nav className="hidden md:flex items-center gap-8 glass rounded-full px-6 py-3">
        {links.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-medium text-deep/80 hover:text-deep relative group">
            {l}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-deep group-hover:w-full transition-all duration-300" />
          </a>
        ))}
      </nav>
      <a
        href="#cta"
        className="hidden md:inline-flex items-center gap-2 bg-deep text-neon rounded-full px-5 py-3 text-sm font-semibold hover:bg-deep/90 transition-all hover:shadow-[0_0_30px_var(--neon)]"
      >
        Order now
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
      </a>
    </motion.header>
  );
}
