import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { StarRating } from "./StarRating";
import { Book } from "@/data/mockData";
import { BookOpen } from "lucide-react";

interface BookCardProps {
  book: Book;
  index?: number;
}

const difficultyColors: Record<string, string> = {
  Beginner: "bg-emerald-50 text-emerald-700",
  Intermediate: "bg-amber-50 text-amber-700",
  Advanced: "bg-rose-50 text-rose-700",
};

export function BookCard({ book, index = 0 }: BookCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.2, 0, 0, 1] }}
    >
      <Link to={`/book/${book.id}`} className="block group">
        <div className="relative bg-card rounded-[12px] p-4 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
          <div className="aspect-[3/4] mb-4 bg-muted rounded-[8px] overflow-hidden flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-muted-foreground/30" />
          </div>
          <h3 className="font-semibold text-sm leading-tight text-card-foreground mb-1 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${difficultyColors[book.difficulty]}`}>
              {book.difficulty}
            </span>
            <span className="text-[10px] text-muted-foreground">{book.category}</span>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-1.5">
              <StarRating rating={book.rating} size="sm" />
              <span className="text-xs font-mono-nums font-medium text-accent-foreground bg-accent px-1.5 py-0.5 rounded-full">
                {book.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              View →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
