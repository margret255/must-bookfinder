import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BookCard } from "@/components/BookCard";
import { DashboardLayout } from "@/components/DashboardLayout";
import { OrnamentalDivider } from "@/components/OrnamentalDivider";
import { mockBooks } from "@/data/mockData";

export default function Dashboard() {
  const [search, setSearch] = useState("");

  const recommended = mockBooks.filter((b) => b.category === "Computer Science").slice(0, 4);
  const popular = [...mockBooks].sort((a, b) => b.totalRatings - a.totalRatings).slice(0, 4);
  const recent = mockBooks.slice(0, 3);

  const filtered = search
    ? mockBooks.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.author.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-1">Welcome back, Student</h1>
          <p className="text-sm text-muted-foreground mb-6">Find your next resource.</p>

          {/* Search */}
          <div className="relative max-w-xl mb-8">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 rounded-xl bg-card shadow-card border-0 focus-visible:ring-2 focus-visible:ring-primary/30"
            />
          </div>
        </motion.div>

        {filtered ? (
          <section>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 section-heading">
              Search Results ({filtered.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((book, i) => (
                <BookCard key={book.id} book={book} index={i} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">
                No books found matching "{search}"
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Recommended */}
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 section-heading">
                Recommended For You
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recommended.map((book, i) => (
                  <BookCard key={book.id} book={book} index={i} />
                ))}
              </div>
            </section>

            <OrnamentalDivider symbol="❖" />

            {/* Popular */}
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 section-heading">
                Popular Books
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {popular.map((book, i) => (
                  <BookCard key={book.id} book={book} index={i} />
                ))}
              </div>
            </section>

            <OrnamentalDivider symbol="❖" />

            {/* Recently Rated */}
            <section>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 section-heading">
                Recently Rated
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recent.map((book, i) => (
                  <BookCard key={book.id} book={book} index={i} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
