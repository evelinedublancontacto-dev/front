"use client";

import { motion } from "framer-motion";
import {
  getMotionStarStyle,
  getMotionStarTransition,
  type StarStyleOptions,
} from "@/lib/seededRandom";
import { cn } from "@/lib/utils";

type MotionStarsProps = StarStyleOptions & {
  count: number;
  className?: string;
};

const MotionStars = ({
  count,
  className,
  topMin = 15,
  topRange = 70,
  leftMin = 5,
  leftRange = 90,
}: MotionStarsProps) => (
  <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white/30 rounded-full"
        style={getMotionStarStyle(i, { topMin, topRange, leftMin, leftRange })}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={getMotionStarTransition(i)}
      />
    ))}
  </div>
);

export default MotionStars;
