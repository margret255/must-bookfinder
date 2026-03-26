export interface AdminBook {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  year: number;
  copies: number;
  status: "available" | "low-stock" | "unavailable";
  addedDate: string;
}

export const adminBooks: AdminBook[] = [
  { id: "1", title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Computer Science", isbn: "978-0262033848", year: 2009, copies: 12, status: "available", addedDate: "2024-01-15" },
  { id: "2", title: "Database System Concepts", author: "Abraham Silberschatz", category: "Computer Science", isbn: "978-0078022159", year: 2019, copies: 8, status: "available", addedDate: "2024-02-10" },
  { id: "3", title: "Principles of Economics", author: "N. Gregory Mankiw", category: "Business", isbn: "978-1305585126", year: 2020, copies: 3, status: "low-stock", addedDate: "2024-01-20" },
  { id: "4", title: "Clean Code", author: "Robert C. Martin", category: "Computer Science", isbn: "978-0132350884", year: 2008, copies: 15, status: "available", addedDate: "2023-11-05" },
  { id: "5", title: "Discrete Mathematics", author: "Kenneth H. Rosen", category: "Mathematics", isbn: "978-0073383095", year: 2018, copies: 0, status: "unavailable", addedDate: "2024-03-01" },
  { id: "6", title: "Operating System Concepts", author: "Abraham Silberschatz", category: "Computer Science", isbn: "978-1119800361", year: 2018, copies: 6, status: "available", addedDate: "2024-01-25" },
  { id: "7", title: "Business Law Today", author: "Roger LeRoy Miller", category: "Business", isbn: "978-0357038390", year: 2021, copies: 2, status: "low-stock", addedDate: "2024-04-12" },
  { id: "8", title: "Computer Networking", author: "James Kurose", category: "Computer Science", isbn: "978-0133594140", year: 2020, copies: 10, status: "available", addedDate: "2024-02-18" },
];

export interface TrendData {
  month: string;
  searches: number;
  ratings: number;
  recommendations: number;
}

export const monthlyTrends: TrendData[] = [
  { month: "Sep", searches: 320, ratings: 85, recommendations: 210 },
  { month: "Oct", searches: 480, ratings: 120, recommendations: 340 },
  { month: "Nov", searches: 560, ratings: 145, recommendations: 420 },
  { month: "Dec", searches: 290, ratings: 60, recommendations: 180 },
  { month: "Jan", searches: 620, ratings: 175, recommendations: 490 },
  { month: "Feb", searches: 710, ratings: 198, recommendations: 560 },
  { month: "Mar", searches: 680, ratings: 190, recommendations: 530 },
];

export interface TopBook {
  title: string;
  count: number;
  category: string;
}

export const mostSearchedBooks: TopBook[] = [
  { title: "Introduction to Algorithms", count: 342, category: "Computer Science" },
  { title: "Clean Code", count: 289, category: "Computer Science" },
  { title: "AI: A Modern Approach", count: 256, category: "Computer Science" },
  { title: "Database System Concepts", count: 198, category: "Computer Science" },
  { title: "Principles of Economics", count: 167, category: "Business" },
];

export const topRatedBooks: TopBook[] = [
  { title: "Clean Code", count: 4.8, category: "Computer Science" },
  { title: "Introduction to Algorithms", count: 4.7, category: "Computer Science" },
  { title: "AI: A Modern Approach", count: 4.6, category: "Computer Science" },
  { title: "Computer Networking", count: 4.5, category: "Computer Science" },
  { title: "Operating System Concepts", count: 4.4, category: "Computer Science" },
];

export interface SubjectTrend {
  subject: string;
  thisMonth: number;
  lastMonth: number;
  change: number;
}

export const trendingSubjects: SubjectTrend[] = [
  { subject: "Computer Science", thisMonth: 420, lastMonth: 350, change: 20 },
  { subject: "Business", thisMonth: 180, lastMonth: 160, change: 12.5 },
  { subject: "Mathematics", thisMonth: 95, lastMonth: 110, change: -13.6 },
  { subject: "Education", thisMonth: 65, lastMonth: 55, change: 18.2 },
  { subject: "Engineering", thisMonth: 78, lastMonth: 72, change: 8.3 },
];

export const performanceMetrics = {
  totalUsers: 1247,
  activeUsers: 389,
  totalBooks: 856,
  totalRatings: 3421,
  avgRating: 4.2,
  recommendationAccuracy: 78.5,
  searchesToday: 124,
  newUsersThisMonth: 67,
};
