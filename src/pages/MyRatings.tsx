import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StarRating } from "@/components/StarRating";
import { mockBooks } from "@/data/mockData";
import { Link } from "react-router-dom";
import { BookOpen, Star } from "lucide-react";

interface MockRating {
  bookId: string;
  rating: number;
  comment: string;
  date: string;
}

const initialRatings: MockRating[] = [
  { bookId: "1", rating: 5, comment: "Excellent coverage of algorithms. Very thorough.", date: "2026-03-10" },
  { bookId: "4", rating: 4, comment: "Great practical advice for writing clean code.", date: "2026-03-08" },
  { bookId: "8", rating: 4, comment: "Good networking fundamentals.", date: "2026-03-05" },
];

export default function MyRatings() {
  const [ratings] = useState<MockRating[]>(initialRatings);

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <Star className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">My Ratings</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          {ratings.length} book{ratings.length !== 1 ? "s" : ""} rated
        </p>

        {ratings.length === 0 ? (
          <div className="bg-card rounded-[12px] shadow-card p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground mb-1">No ratings yet.</p>
            <p className="text-xs text-muted-foreground">Rate 3 books to unlock personalized recommendations.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {ratings.map((r) => {
              const book = mockBooks.find((b) => b.id === r.bookId);
              if (!book) return null;
              return (
                <Link key={r.bookId} to={`/book/${book.id}`}>
                  <div className="bg-card rounded-[12px] shadow-card hover:shadow-card-hover transition-all duration-200 p-4 flex items-start gap-4">
                    <div className="h-16 w-12 bg-muted rounded-[8px] flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5 text-muted-foreground/30" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-foreground truncate">{book.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                      <StarRating rating={r.rating} />
                      {r.comment && (
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">"{r.comment}"</p>
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0">{r.date}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
