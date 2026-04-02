import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { performanceMetrics, monthlyTrends, mostSearchedBooks, topRatedBooks, trendingSubjects } from "@/data/adminMockData";
import { Users, BookOpen, Star, Search, TrendingUp, TrendingDown, Activity, UserPlus, Target, BarChart3, Clock, Shield } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const stats = [
  { label: "Total Users", value: performanceMetrics.totalUsers.toLocaleString(), icon: Users, color: "text-primary", trend: "+12%", up: true },
  { label: "Active Users", value: performanceMetrics.activeUsers.toLocaleString(), icon: Activity, color: "text-emerald-500", trend: "+8%", up: true },
  { label: "Total Books", value: performanceMetrics.totalBooks.toLocaleString(), icon: BookOpen, color: "text-amber-500", trend: "+3%", up: true },
  { label: "Total Ratings", value: performanceMetrics.totalRatings.toLocaleString(), icon: Star, color: "text-orange-500", trend: "+15%", up: true },
  { label: "Avg Rating", value: performanceMetrics.avgRating.toFixed(1), icon: Target, color: "text-violet-500", trend: "+0.2", up: true },
  { label: "Rec. Accuracy", value: `${performanceMetrics.recommendationAccuracy}%`, icon: TrendingUp, color: "text-primary", trend: "+2.3%", up: true },
  { label: "Searches Today", value: performanceMetrics.searchesToday.toString(), icon: Search, color: "text-cyan-500", trend: "-5%", up: false },
  { label: "New Users (Month)", value: performanceMetrics.newUsersThisMonth.toString(), icon: UserPlus, color: "text-emerald-500", trend: "+18%", up: true },
];

const radarData = trendingSubjects.map((s) => ({
  subject: s.subject,
  current: s.thisMonth,
  previous: s.lastMonth,
}));

const recentActivity = [
  { action: "New book added", detail: "Machine Learning Basics", time: "2 min ago", icon: BookOpen },
  { action: "User registered", detail: "student@must.ac.ke", time: "15 min ago", icon: UserPlus },
  { action: "Book rated", detail: "Clean Code — 5 stars", time: "32 min ago", icon: Star },
  { action: "System scan", detail: "No issues found", time: "1 hr ago", icon: Shield },
  { action: "Search spike", detail: "124 searches in last hour", time: "1 hr ago", icon: Search },
  { action: "Report generated", detail: "Monthly analytics export", time: "3 hrs ago", icon: BarChart3 },
];

export default function AdminDashboard() {
  const [chartTab, setChartTab] = useState("activity");

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Administrator Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Overview of the MUST Book Recommendation System</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            Last updated: {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="hover:shadow-card-hover transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`h-9 w-9 rounded-lg bg-accent flex items-center justify-center shrink-0 ${s.color}`}>
                      <s.icon className="h-4 w-4" />
                    </div>
                    <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${s.up ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-rose-50 text-rose-600 border-rose-200"}`}>
                      {s.up ? <TrendingUp className="h-2.5 w-2.5 mr-0.5" /> : <TrendingDown className="h-2.5 w-2.5 mr-0.5" />}
                      {s.trend}
                    </Badge>
                  </div>
                  <p className="text-xl font-bold text-foreground font-mono-nums">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts with tabs */}
        <Card>
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Analytics</CardTitle>
              <Tabs value={chartTab} onValueChange={setChartTab}>
                <TabsList className="h-8">
                  <TabsTrigger value="activity" className="text-xs px-3 h-7">Activity</TabsTrigger>
                  <TabsTrigger value="recommendations" className="text-xs px-3 h-7">Recommendations</TabsTrigger>
                  <TabsTrigger value="subjects" className="text-xs px-3 h-7">Subjects</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {chartTab === "activity" && (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                    <YAxis className="text-xs fill-muted-foreground" />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                    <Legend iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="searches" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Searches" />
                    <Bar dataKey="ratings" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} name="Ratings" />
                    <Bar dataKey="recommendations" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} name="Recommendations" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
            {chartTab === "recommendations" && (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                    <YAxis className="text-xs fill-muted-foreground" />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                    <Legend iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="recommendations" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(var(--primary))" }} name="Recommendations" />
                    <Line type="monotone" dataKey="searches" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={{ r: 3 }} name="Searches" />
                    <Line type="monotone" dataKey="ratings" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={{ r: 3 }} name="Ratings" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            {chartTab === "subjects" && (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid className="stroke-border" />
                    <PolarAngleAxis dataKey="subject" className="text-xs fill-muted-foreground" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis className="text-xs fill-muted-foreground" />
                    <Radar name="This Month" dataKey="current" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
                    <Radar name="Last Month" dataKey="previous" stroke="hsl(38, 92%, 50%)" fill="hsl(38, 92%, 50%)" fillOpacity={0.1} strokeWidth={2} />
                    <Legend iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Most Searched */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Search className="h-4 w-4 text-primary" /> Most Searched
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mostSearchedBooks.map((b, i) => (
                  <div key={b.title} className="flex items-center gap-3">
                    <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${i < 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{b.title}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-muted-foreground">{b.category}</p>
                        <span className="text-[10px] font-mono-nums text-muted-foreground">{b.count}</span>
                      </div>
                      <Progress value={(b.count / 342) * 100} className="h-1 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Rated */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" /> Top Rated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topRatedBooks.map((b, i) => (
                  <div key={b.title} className="flex items-center gap-3">
                    <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${i < 3 ? "bg-amber-100 text-amber-700" : "bg-muted text-muted-foreground"}`}>
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{b.title}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-muted-foreground">{b.category}</p>
                        <div className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-[10px] font-mono-nums">{b.count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-500" /> Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-7 w-7 rounded-md bg-accent flex items-center justify-center shrink-0 mt-0.5">
                      <a.icon className="h-3.5 w-3.5 text-accent-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{a.action}</p>
                      <p className="text-[10px] text-muted-foreground">{a.detail}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{a.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-500" /> System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "API Response Time", value: "142ms", pct: 85 },
                { label: "Uptime (30d)", value: "99.97%", pct: 99.97 },
                { label: "Cache Hit Rate", value: "94.2%", pct: 94.2 },
                { label: "Error Rate", value: "0.03%", pct: 99.97 },
              ].map((m) => (
                <div key={m.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{m.label}</span>
                    <span className="text-xs font-mono-nums font-semibold text-foreground">{m.value}</span>
                  </div>
                  <Progress value={m.pct} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
