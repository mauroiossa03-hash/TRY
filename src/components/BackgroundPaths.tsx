import { motion } from "framer-motion";
import { useMemo } from "react";

function FloatingPaths({ position }: { position: number }) {
  const paths = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${
          189 + i * 6
        } -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${
          343 - i * 6
        }C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${
          875 - i * 6
        } ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.025,
        duration: 16 + (i % 6) * 2.5,
      })),
    [position],
  );

  return (
    <svg
      className="size-full"
      viewBox="0 0 696 316"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          stroke="#34dba8"
          strokeWidth={path.width}
          strokeOpacity={0.05 + path.id * 0.012}
          initial={{ pathLength: 0.3, opacity: 0.3 }}
          animate={{
            pathLength: 1,
            opacity: [0.15, 0.45, 0.15],
            pathOffset: [0, 1, 0],
          }}
          transition={{
            duration: path.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </svg>
  );
}

export default function BackgroundPaths({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}
