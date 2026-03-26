import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { adminBooks, AdminBook } from "@/data/adminMockData";
import { categories } from "@/data/mockData";
import { Plus, Search, Pencil, Trash2, BookCopy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function AdminBooks() {
  const [books, setBooks] = useState<AdminBook[]>(adminBooks);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editBook, setEditBook] = useState<AdminBook | null>(null);
  const { toast } = useToast();

  const filtered = books.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === "all" || b.category === filterCategory;
    return matchSearch && matchCat;
  });

  const statusColor = (s: string) => {
    if (s === "available") return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (s === "low-stock") return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-destructive/10 text-destructive border-destructive/20";
  };

  const handleDelete = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
    toast({ title: "Book removed", description: "The book has been removed from the catalog." });
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newBook: AdminBook = {
      id: editBook?.id || Date.now().toString(),
      title: form.get("title") as string,
      author: form.get("author") as string,
      category: form.get("category") as string,
      isbn: form.get("isbn") as string,
      year: parseInt(form.get("year") as string) || 2024,
      copies: parseInt(form.get("copies") as string) || 0,
      status: parseInt(form.get("copies") as string) > 5 ? "available" : parseInt(form.get("copies") as string) > 0 ? "low-stock" : "unavailable",
      addedDate: editBook?.addedDate || new Date().toISOString().split("T")[0],
    };
    if (editBook) {
      setBooks((prev) => prev.map((b) => (b.id === editBook.id ? newBook : b)));
      toast({ title: "Book updated" });
    } else {
      setBooks((prev) => [...prev, newBook]);
      toast({ title: "Book added", description: `"${newBook.title}" has been added to the catalog.` });
    }
    setDialogOpen(false);
    setEditBook(null);
  };

  const openEdit = (book: AdminBook) => {
    setEditBook(book);
    setDialogOpen(true);
  };

  const openAdd = () => {
    setEditBook(null);
    setDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Book Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Add, edit, and manage the library book catalog</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAdd}>
                <Plus className="h-4 w-4 mr-1" /> Add Book
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editBook ? "Edit Book" : "Add New Book"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" defaultValue={editBook?.title} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" name="author" defaultValue={editBook?.author} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" defaultValue={editBook?.category || "Computer Science"}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" name="year" type="number" defaultValue={editBook?.year || 2024} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input id="isbn" name="isbn" defaultValue={editBook?.isbn} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="copies">Copies</Label>
                    <Input id="copies" name="copies" type="number" defaultValue={editBook?.copies || 0} />
                  </div>
                </div>
                <Button type="submit" className="w-full">{editBook ? "Update Book" : "Add Book"}</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search books..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Books", value: books.length, icon: BookCopy },
            { label: "Available", value: books.filter((b) => b.status === "available").length, icon: BookCopy },
            { label: "Low Stock", value: books.filter((b) => b.status === "low-stock").length, icon: BookCopy },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold text-foreground font-mono-nums">{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Author</TableHead>
                  <TableHead className="hidden sm:table-cell">Category</TableHead>
                  <TableHead>Copies</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{book.author}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="secondary" className="text-xs">{book.category}</Badge>
                    </TableCell>
                    <TableCell className="font-mono-nums">{book.copies}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColor(book.status)}`}>
                        {book.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(book)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(book.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No books found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
