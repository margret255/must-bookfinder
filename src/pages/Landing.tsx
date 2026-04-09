import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Search, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrnamentalDivider } from "@/components/OrnamentalDivider";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-sm font-bold text-foreground">MUST</span>
            <span className="text-xs text-muted-foreground ml-1.5 hidden sm:inline">Book Recommender</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
        >
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <Star className="h-3 w-3" />
            Trusted by MUST students
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight leading-[1.1] mb-4">
            Smarter discovery for
            <br />
            <span className="text-primary">MUST students.</span>
          </h1>
          <OrnamentalDivider symbol="✦" />
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 drop-cap">
            master your coursework with peer-backed resources. Find, rate, and share the best academic books for your program.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.2, 0, 0, 1] }}
          className="max-w-lg mx-auto mb-10"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder='Try: "Data Structures", "Business Law"...'
              className="pl-12 h-14 text-base rounded-2xl shadow-card bg-card border-0 focus-visible:ring-2 focus-visible:ring-primary/30"
              readOnly
              onClick={() => window.location.href = '/login'}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.2, 0, 0, 1] }}
          className="flex items-center justify-center gap-4"
        >
          <Link to="/register">
            <Button size="lg" className="rounded-xl gap-2">
              Get started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="rounded-xl">
              I have an account
            </Button>
          </Link>
        </motion.div>
      </section>

      <OrnamentalDivider symbol="§" />

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: Search,
              title: "Find your next resource",
              desc: "Search by title, author, subject, or course code to find exactly what you need.",
            },
            {
              icon: Star,
              title: "Rate & review books",
              desc: "Share your experience and help fellow students make better choices.",
            },
            {
              icon: Users,
              title: "Peer recommendations",
              desc: "Discover books recommended by students in your program and year.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-card rounded-[12px] p-6 shadow-card hover:shadow-card-hover transition-all duration-200 corner-ornament"
            >
              <div className="h-10 w-10 rounded-[8px] bg-accent flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Meru University of Science and Technology. All rights reserved.
          </p>
          <Link to="/admin/login" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Admin Portal →
          </Link>
        </div>
      </footer>
    </div>
  );
}
