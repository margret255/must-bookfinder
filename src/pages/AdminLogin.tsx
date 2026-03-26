import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ShieldCheck, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock admin login
    setTimeout(() => {
      if (email && password) {
        toast({ title: "Welcome, Administrator", description: "You have been logged in successfully." });
        navigate("/admin/dashboard");
      } else {
        toast({ title: "Login failed", description: "Please enter valid credentials.", variant: "destructive" });
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center mb-4">
            <ShieldCheck className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Portal</h1>
          <p className="text-sm text-muted-foreground mt-1">MUST Library Administration</p>
        </div>

        <Card className="border-border/60 shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg">Administrator Login</CardTitle>
            <CardDescription>Enter your admin credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="admin@must.ac.ke" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                ← Back to student portal
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
