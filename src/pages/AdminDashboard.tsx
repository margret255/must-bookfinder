import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { performanceMetrics, monthlyTrends, mostSearchedBooks, topRatedBooks } from "@/data/adminMockData";
import { Users, BookOpen, Star, Search, TrendingUp, Activity, UserPlus, Target } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { motion } from "framer-motion";

const stats = [
  { label: "Total Users", value: performanceMetrics.totalUsers.toLocaleString(), icon: Users, color: "text-primary" },
  { label: "Active Users", value: performanceMetrics.activeUsers.toLocaleString(), icon: Activity, color: "text-emerald-500" },
  { label: "Total Books", value: performanceMetrics.totalBooks.toLocaleString(), icon: BookOpen, color: "text-amber-500" },
  { label: "Total Ratings", value: performanceMetrics.totalRatings.toLocaleString(), icon: Star, color: "text-orange-500" },
  { label: "Avg Rating", value: performanceMetrics.avgRating.toFixed(1), icon: Target, color: "text-violet-500" },
  { label: "Rec. Accuracy", value: `${performanceMetrics.recommendationAccuracy}%`, icon: TrendingUp, color: "text-primary" },
  { label: "Searches Today", value: performanceMetrics.searchesToday.toString(), icon: Search, color: "text-cyan-500" },
  { label: "New Users (Month)", value: performanceMetrics.newUsersThisMonth.toString(), icon: UserPlus, color: "text-emerald-500" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Administrator Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Overview of the MUST Book Recommendation System</p>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg bg-accent flex items-center justify-center shrink-0 ${s.color}`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="text-lg font-bold text-foreground font-mono-nums">{s.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Monthly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                    <YAxis className="text-xs fill-muted-foreground" />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                    <Bar dataKey="searches" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Searches" />
                    <Bar dataKey="ratings" fill="hsl(var(--primary) / 0.5)" radius={[4, 4, 0, 0]} name="Ratings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Recommendation Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                    <YAxis className="text-xs fill-muted-foreground" />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                    <Line type="monotone" dataKey="recommendations" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} name="Recommendations" />
                    <Line type="monotone" dataKey="searches" stroke="hsl(var(--primary) / 0.4)" strokeWidth={2} dot={{ r: 3 }} name="Searches" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top lists */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Most Searched Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mostSearchedBooks.map((b, i) => (
                  <div key={b.title} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{b.title}</p>
                        <p className="text-xs text-muted-foreground">{b.category}</p>
                      </div>
                    </div>
                    <span className="text-sm font-mono-nums text-muted-foreground">{b.count} searches</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Top Rated Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topRatedBooks.map((b, i) => (
                  <div key={b.title} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{b.title}</p>
                        <p className="text-xs text-muted-foreground">{b.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-mono-nums text-foreground">{b.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
