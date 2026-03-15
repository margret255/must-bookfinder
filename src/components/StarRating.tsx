import { useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  interactive?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-3.5 w-3.5",
  md: "h-5 w-5",
  lg: "h-7 w-7",
};

export function StarRating({ rating, onRate, interactive = false, size = "sm" }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const iconSize = sizeMap[size];

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = interactive ? star <= (hovered || rating) : star <= Math.round(rating);
        return (
          <motion.button
            key={star}
            type="button"
            disabled={!interactive}
            whileHover={interactive ? { scale: 1.15 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
            className={`transition-colors duration-200 ${interactive ? "cursor-pointer" : "cursor-default"}`}
            onMouseEnter={() => interactive && setHovered(star)}
            onMouseLeave={() => interactive && setHovered(0)}
            onClick={() => interactive && onRate?.(star)}
          >
            <Star
              className={`${iconSize} ${
                filled
                  ? "fill-amber-400 text-amber-400"
                  : "fill-transparent text-muted-foreground/40"
              }`}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
