"use client";

import { useState } from "react";
import { cn } from "@/lib/utils"; // shadcn utility for conditional classes

interface StarRatingProps {
  maxStars?: number;
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
}

export function StarRating({
  maxStars = 5,
  initialRating = 0,
  onRatingChange,
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: maxStars }, (_, i) => {
        const starValue = i + 1;
        return (
          <button
            key={starValue}
            type="button"
            onClick={() => {
              setRating(starValue);
              onRatingChange?.(starValue);
            }}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            className="text-2xl focus:outline-none"
          >
            <span
              className={cn(
                "transition-colors",
                starValue <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              )}
            >
              ★
            </span>
          </button>
        );
      })}
    </div>
  );
}
