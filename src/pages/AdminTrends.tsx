import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { monthlyTrends, mostSearchedBooks, topRatedBooks, trendingSubjects, performanceMetrics } from "@/data/adminMockData";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, Target, Activity, Search, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const PIE_COLORS = [
  "hsl(221, 83%, 53%)",
  "hsl(142, 71%, 45%)",
  "hsl(38, 92%, 50%)",
  "hsl(280, 65%, 60%)",
  "hsl(0, 84%, 60%)",
];

const subjectPieData = trendingSubjects.map((s) => ({ name: s.subject, value: s.thisMonth }));

export default function AdminTrends() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Trend Analysis & Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">System performance, search trends, and recommendation analytics</p>
        </div>

        {/* Performance summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Recommendation Accuracy", value: `${performanceMetrics.recommendationAccuracy}%`, icon: Target },
            { label: "Active Users", value: performanceMetrics.activeUsers, icon: Activity },
            { label: "Searches Today", value: performanceMetrics.searchesToday, icon: Search },
            { label: "Avg Rating", value: performanceMetrics.avgRating.toFixed(1), icon: Star },
          ].map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center text-primary shrink-0">
                    <m.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                    <p className="text-lg font-bold font-mono-nums text-foreground">{m.value}</p>
                  </div>
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
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                  <YAxis className="text-xs fill-muted-foreground" />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                  <Area type="monotone" dataKey="searches" stroke="hsl(221, 83%, 53%)" fill="url(#searchGrad)" strokeWidth={2} name="Searches" />
                  <Area type="monotone" dataKey="recommendations" stroke="hsl(142, 71%, 45%)" fill="url(#recGrad)" strokeWidth={2} name="Recommendations" />
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
                          <Badge variant="secondary" className="text-[10px] bg-emerald-100 text-emerald-700 border-emerald-200 gap-0.5 px-1.5">
                            <TrendingUp className="h-3 w-3" /> +{s.change}%
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[10px] bg-destructive/10 text-destructive border-destructive/20 gap-0.5 px-1.5">
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
