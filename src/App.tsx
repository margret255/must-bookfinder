import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SearchBooks from "./pages/SearchBooks";
import BookDetails from "./pages/BookDetails";
import Recommendations from "./pages/Recommendations";
import MyRatings from "./pages/MyRatings";
import ReadingList from "./pages/ReadingList";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBooks from "./pages/AdminBooks";
import AdminTrends from "./pages/AdminTrends";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<SearchBooks />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/ratings" element={<MyRatings />} />
          <Route path="/reading-list" element={<ReadingList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/books" element={<AdminBooks />} />
          <Route path="/admin/trends" element={<AdminTrends />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
