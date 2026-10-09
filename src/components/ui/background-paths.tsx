"use client";

import { motion, useReducedMotion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
  const reduceMotion = useReducedMotion();
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${
      312 - i * 5 * position
    } ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${
      470 - i * 6
    } ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
    // Deterministic durations so re-renders don't reshuffle the animation
    duration: 20 + ((i * 7) % 10),
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-blue-900 dark:text-blue-200"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.016}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={reduceMotion ? undefined : {
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: path.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/** Decorative animated line field. Place inside a `relative overflow-hidden` parent. */
export function BackgroundPaths() {
  return (
    // Radial mask fades the lines out behind the centred copy so text stays legible
    <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_55%_60%_at_50%_45%,transparent_35%,black_100%)]">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}
