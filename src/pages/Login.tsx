import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const validateEmail = (email: string) => {
  const lower = email.toLowerCase().trim();
  if (!lower) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lower)) return "Enter a valid email address.";
  const isGmail = lower.endsWith("@gmail.com");
  const isAcademic = /\.(edu|ac\.[a-z]{2,}|edu\.[a-z]{2,})$/.test(lower.split("@")[1]);
  if (!isGmail && !isAcademic) return "Only @gmail.com or academic emails are accepted.";
  return "";
};

const validatePassword = (pw: string) => {
  const errors: string[] = [];
  if (pw.length < 8) errors.push("at least 8 characters");
  if (!/[A-Z]/.test(pw)) errors.push("one uppercase letter");
  if (!/[0-9]/.test(pw)) errors.push("one number");
  if (!/[^A-Za-z0-9]/.test(pw)) errors.push("one special character");
  return errors.length ? `Password needs: ${errors.join(", ")}.` : "";
};

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    const pwErr = validatePassword(password);
    if (emailErr || pwErr) {
      setErrors({ email: emailErr || undefined, password: pwErr || undefined });
      return;
    }
    setErrors({});
    toast({ title: "Welcome back!", description: "Redirecting to your dashboard." });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background grid-pattern flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
        className="w-full max-w-sm"
      >
        <div className="bg-card rounded-[12px] shadow-card p-8">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Welcome back</h1>
              <p className="text-xs text-muted-foreground">Sign in to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@students.must.ac.ke" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1" />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1" />
              {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
            </div>
            <Button type="submit" className="w-full rounded-xl gap-2">
              Sign in <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
