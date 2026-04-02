import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { monthlyTrends, mostSearchedBooks, topRatedBooks, trendingSubjects, performanceMetrics } from "@/data/adminMockData";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, RadialBarChart, RadialBar } from "recharts";
import { TrendingUp, TrendingDown, Target, Activity, Search, Star, Download, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const PIE_COLORS = [
  "hsl(221, 83%, 53%)",
  "hsl(142, 71%, 45%)",
  "hsl(38, 92%, 50%)",
  "hsl(280, 65%, 60%)",
  "hsl(0, 84%, 60%)",
];

const subjectPieData = trendingSubjects.map((s) => ({ name: s.subject, value: s.thisMonth }));

const engagementData = [
  { name: "Searches", value: 78, fill: "hsl(221, 83%, 53%)" },
  { name: "Ratings", value: 65, fill: "hsl(142, 71%, 45%)" },
  { name: "Saves", value: 52, fill: "hsl(38, 92%, 50%)" },
  { name: "Shares", value: 34, fill: "hsl(280, 65%, 60%)" },
];

const weeklyHeatmap = [
  { day: "Mon", h8: 12, h10: 45, h12: 32, h14: 28, h16: 56, h18: 38, h20: 15 },
  { day: "Tue", h8: 18, h10: 52, h12: 41, h14: 35, h16: 48, h18: 42, h20: 22 },
  { day: "Wed", h8: 22, h10: 61, h12: 38, h14: 42, h16: 65, h18: 51, h20: 28 },
  { day: "Thu", h8: 15, h10: 48, h12: 35, h14: 30, h16: 52, h18: 36, h20: 19 },
  { day: "Fri", h8: 8, h10: 38, h12: 28, h14: 22, h16: 42, h18: 30, h20: 12 },
];

export default function AdminTrends() {
  const [period, setPeriod] = useState("7months");

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Trend Analysis & Reports</h1>
            <p className="text-sm text-muted-foreground mt-1">System performance, search trends, and recommendation analytics</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-36 h-9 text-xs">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="7months">Last 7 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-9 text-xs gap-1.5">
              <Download className="h-3.5 w-3.5" /> Export
            </Button>
          </div>
        </div>

        {/* Performance summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Recommendation Accuracy", value: `${performanceMetrics.recommendationAccuracy}%`, icon: Target, trend: "+2.3%", up: true },
            { label: "Active Users", value: performanceMetrics.activeUsers, icon: Activity, trend: "+8%", up: true },
            { label: "Searches Today", value: performanceMetrics.searchesToday, icon: Search, trend: "-5%", up: false },
            { label: "Avg Rating", value: performanceMetrics.avgRating.toFixed(1), icon: Star, trend: "+0.2", up: true },
          ].map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center text-primary shrink-0">
                      <m.icon className="h-4 w-4" />
                    </div>
                    <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${m.up ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-rose-50 text-rose-600 border-rose-200"}`}>
                      {m.up ? <TrendingUp className="h-2.5 w-2.5 mr-0.5" /> : <TrendingDown className="h-2.5 w-2.5 mr-0.5" />}
                      {m.trend}
                    </Badge>
                  </div>
                  <p className="text-xl font-bold font-mono-nums text-foreground">{m.value}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{m.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Activity over time */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">System Activity Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrends}>
                  <defs>
                    <linearGradient id="searchGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="recGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="ratingGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                  <YAxis className="text-xs fill-muted-foreground" />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="searches" stroke="hsl(221, 83%, 53%)" fill="url(#searchGrad)" strokeWidth={2} name="Searches" />
                  <Area type="monotone" dataKey="recommendations" stroke="hsl(142, 71%, 45%)" fill="url(#recGrad)" strokeWidth={2} name="Recommendations" />
                  <Area type="monotone" dataKey="ratings" stroke="hsl(38, 92%, 50%)" fill="url(#ratingGrad)" strokeWidth={2} name="Ratings" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Trending subjects */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Trending Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingSubjects.map((s) => (
                  <div key={s.subject} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{s.subject}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-mono-nums text-muted-foreground">{s.thisMonth}</span>
                        {s.change >= 0 ? (
                          <Badge variant="secondary" className="text-[10px] bg-emerald-50 text-emerald-600 border-emerald-200 gap-0.5 px-1.5">
                            <TrendingUp className="h-3 w-3" /> +{s.change}%
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[10px] bg-rose-50 text-rose-600 border-rose-200 gap-0.5 px-1.5">
                            <TrendingDown className="h-3 w-3" /> {s.change}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Progress value={(s.thisMonth / 420) * 100} className="h-1.5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subject distribution pie */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Subject Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={subjectPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} className="text-xs">
                      {subjectPieData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Engagement + Peak Hours */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">User Engagement Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={engagementData} startAngle={180} endAngle={0}>
                    <RadialBar dataKey="value" cornerRadius={6} label={{ position: "insideStart", fill: "#fff", fontSize: 11 }} />
                    <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Peak Usage Hours (Weekday)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyHeatmap}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="day" className="text-xs fill-muted-foreground" />
                    <YAxis className="text-xs fill-muted-foreground" />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                    <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                    <Bar dataKey="h8" stackId="a" fill="hsl(221, 83%, 75%)" name="8AM" />
                    <Bar dataKey="h10" stackId="a" fill="hsl(221, 83%, 63%)" name="10AM" />
                    <Bar dataKey="h12" stackId="a" fill="hsl(221, 83%, 53%)" name="12PM" />
                    <Bar dataKey="h14" stackId="a" fill="hsl(142, 71%, 55%)" name="2PM" />
                    <Bar dataKey="h16" stackId="a" fill="hsl(142, 71%, 45%)" name="4PM" />
                    <Bar dataKey="h18" stackId="a" fill="hsl(38, 92%, 50%)" name="6PM" />
                    <Bar dataKey="h20" stackId="a" fill="hsl(280, 65%, 60%)" name="8PM" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Most searched & rated side by side */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Most Searched Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mostSearchedBooks} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis type="number" className="text-xs fill-muted-foreground" />
                    <YAxis dataKey="title" type="category" width={140} className="text-xs fill-muted-foreground" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Searches" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Highest Rated Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topRatedBooks} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis type="number" domain={[0, 5]} className="text-xs fill-muted-foreground" />
                    <YAxis dataKey="title" type="category" width={140} className="text-xs fill-muted-foreground" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                    <Bar dataKey="count" fill="hsl(38, 92%, 50%)" radius={[0, 4, 4, 0]} name="Rating" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
