import { BookCard } from "@/components/BookCard";
import { DashboardLayout } from "@/components/DashboardLayout";
import { mockBooks } from "@/data/mockData";
import { Sparkles } from "lucide-react";

export default function Recommendations() {
  const recommended = mockBooks.sort((a, b) => b.rating - a.rating);

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Recommendations</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Personalized picks based on your preferences and peer activity.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recommended.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
