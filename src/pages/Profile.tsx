import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "lucide-react";
import { categories, programs, yearOptions } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { toast } = useToast();
  const [selectedSubjects, setSelectedSubjects] = useState(["Computer Science", "Mathematics"]);

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const handleSave = () => {
    toast({ title: "Profile updated", description: "Your preferences have been saved." });
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <User className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-6">Update your info and reading preferences.</p>

        <div className="bg-card rounded-[12px] shadow-card p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <Input defaultValue="John Mwangi" className="mt-1" />
            </div>
            <div>
              <Label>Registration Number</Label>
              <Input defaultValue="CT201/00001/22" className="mt-1 font-mono-nums" readOnly />
            </div>
            <div>
              <Label>Email</Label>
              <Input defaultValue="john@students.must.ac.ke" className="mt-1" />
            </div>
            <div>
              <Label>Year of Study</Label>
              <Select defaultValue="Year 3">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((y) => (
                    <SelectItem key={y} value={y}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label>Program</Label>
              <Select defaultValue="BSc. Computer Science">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {programs.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Label className="mb-2 block">Subject Interests</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleSubject(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                    selectedSubjects.includes(cat)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:border-primary/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={handleSave} className="rounded-xl">Save Changes</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
