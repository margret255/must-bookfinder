import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/StarRating";
import { BookCard } from "@/components/BookCard";
import { DashboardLayout } from "@/components/DashboardLayout";
import { mockBooks } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function BookDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  const book = mockBooks.find((b) => b.id === id);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(false);

  if (!book) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center text-muted-foreground">Book not found.</div>
      </DashboardLayout>
    );
  }

  const similar = mockBooks
    .filter((b) => b.id !== book.id && b.category === book.category)
    .slice(0, 4);

  const handleRate = () => {
    if (userRating === 0) return;
    toast({ title: "Rating submitted!", description: `You rated "${book.title}" ${userRating} stars.` });
  };

  const handleSave = () => {
    setSaved(!saved);
    toast({
      title: saved ? "Removed from reading list" : "Added to reading list",
      description: book.title,
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
          className="bg-card rounded-[12px] shadow-card p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cover */}
            <div className="w-full md:w-48 shrink-0">
              <div className="aspect-[3/4] bg-muted rounded-[8px] flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-muted-foreground/30" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1" style={{ letterSpacing: "-0.02em" }}>
                {book.title}
              </h1>
              <p className="text-muted-foreground mb-4">{book.author}</p>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-medium bg-accent text-accent-foreground px-2.5 py-1 rounded-full">
                  {book.category}
                </span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  book.difficulty === "Beginner" ? "bg-emerald-50 text-emerald-700" :
                  book.difficulty === "Intermediate" ? "bg-amber-50 text-amber-700" :
                  "bg-rose-50 text-rose-700"
                }`}>
                  {book.difficulty}
                </span>
                {book.courseRelevance.map((c) => (
                  <span key={c} className="text-xs font-mono-nums bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    {c}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-6">
                <StarRating rating={book.rating} />
                <span className="text-sm font-mono-nums font-semibold text-foreground">{book.rating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">({book.totalRatings} ratings)</span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{book.description}</p>

              <Button onClick={handleSave} variant={saved ? "secondary" : "outline"} className="rounded-xl gap-2">
                {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                {saved ? "Saved" : "Add to Reading List"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Rating section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.2, 0, 0, 1] }}
          className="bg-card rounded-[12px] shadow-card p-6 mt-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Rate this book</h2>
          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={userRating} onRate={setUserRating} interactive size="lg" />
            {userRating > 0 && (
              <span className="text-sm text-muted-foreground">{userRating} star{userRating > 1 ? "s" : ""}</span>
            )}
          </div>
          <Textarea
            placeholder="Leave an optional comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-4 rounded-xl"
            rows={3}
          />
          <Button onClick={handleRate} disabled={userRating === 0} className="rounded-xl">
            Submit Rating
          </Button>
        </motion.div>

        {/* Similar */}
        {similar.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Students who liked this book also liked
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similar.map((b, i) => (
                <BookCard key={b.id} book={b} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}
