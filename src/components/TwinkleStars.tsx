import { getTwinkleStarStyle, type StarStyleOptions } from "@/lib/seededRandom";
import { cn } from "@/lib/utils";

type TwinkleStarsProps = StarStyleOptions & {
  count: number;
  className?: string;
};

const TwinkleStars = ({
  count,
  className,
  topMin = 0,
  topRange = 100,
  leftMin = 0,
  leftRange = 100,
}: TwinkleStarsProps) => (
  <div className={cn("absolute inset-0 pointer-events-none", className)}>
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-gold-light animate-twinkle"
        style={getTwinkleStarStyle(i, { topMin, topRange, leftMin, leftRange })}
      />
    ))}
  </div>
);

export default TwinkleStars;
