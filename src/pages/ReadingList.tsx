import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { BookCard } from "@/components/BookCard";
import { mockBooks } from "@/data/mockData";
import { Bookmark, BookOpen } from "lucide-react";

export default function ReadingList() {
  const [savedIds] = useState(["2", "5", "10"]);
  const savedBooks = mockBooks.filter((b) => savedIds.includes(b.id));

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <Bookmark className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Reading List</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          {savedBooks.length} book{savedBooks.length !== 1 ? "s" : ""} saved
        </p>

        {savedBooks.length === 0 ? (
          <div className="bg-card rounded-[12px] shadow-card p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Your reading list is empty.</p>
            <p className="text-xs text-muted-foreground mt-1">Browse books and save them for later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {savedBooks.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
