import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// First-paint cinematic loader.
export default function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1600);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-deep"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-6xl font-display font-bold tracking-tight"
            >
              <span className="text-neon">blink</span>
              <span className="text-cream">it.</span>
            </motion.div>
            <div className="h-[2px] w-56 bg-neon/20 overflow-hidden">
              <motion.div
                className="h-full bg-neon origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            </div>
            <span className="text-xs uppercase tracking-[0.4em] text-neon/70">Spinning up the drones…</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
