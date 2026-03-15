export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  rating: number;
  totalRatings: number;
  courseRelevance: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  cover: string;
  year: number;
}

export interface UserRating {
  bookId: string;
  rating: number;
  comment?: string;
  date: string;
}

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    description: "A comprehensive textbook covering a broad range of algorithms in depth, yet accessible to all levels of readers.",
    rating: 4.7,
    totalRatings: 128,
    courseRelevance: ["CCS 3251", "CCS 2201"],
    difficulty: "Advanced",
    cover: "",
    year: 2009,
  },
  {
    id: "2",
    title: "Database System Concepts",
    author: "Abraham Silberschatz",
    category: "Computer Science",
    description: "Provides an introduction to the fundamental concepts of database management, including data models, database design, and SQL.",
    rating: 4.3,
    totalRatings: 95,
    courseRelevance: ["CCS 3252", "CCS 2202"],
    difficulty: "Intermediate",
    cover: "",
    year: 2019,
  },
  {
    id: "3",
    title: "Principles of Economics",
    author: "N. Gregory Mankiw",
    category: "Business",
    description: "An economics textbook that explains economic principles in a clear and engaging manner suitable for university students.",
    rating: 4.1,
    totalRatings: 76,
    courseRelevance: ["BBA 1101", "BBA 2101"],
    difficulty: "Beginner",
    cover: "",
    year: 2020,
  },
  {
    id: "4",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Computer Science",
    description: "A handbook of agile software craftsmanship that teaches how to write code that is easy to read, understand, and maintain.",
    rating: 4.8,
    totalRatings: 201,
    courseRelevance: ["CCS 3253", "CCS 4301"],
    difficulty: "Intermediate",
    cover: "",
    year: 2008,
  },
  {
    id: "5",
    title: "Discrete Mathematics and Its Applications",
    author: "Kenneth H. Rosen",
    category: "Mathematics",
    description: "A comprehensive introduction to discrete mathematics, emphasizing problem-solving techniques and applications.",
    rating: 4.0,
    totalRatings: 64,
    courseRelevance: ["CCS 1101", "CMS 1201"],
    difficulty: "Intermediate",
    cover: "",
    year: 2018,
  },
  {
    id: "6",
    title: "Operating System Concepts",
    author: "Abraham Silberschatz",
    category: "Computer Science",
    description: "The definitive guide to operating system internals including process management, memory management, and file systems.",
    rating: 4.4,
    totalRatings: 88,
    courseRelevance: ["CCS 3254", "CCS 3201"],
    difficulty: "Advanced",
    cover: "",
    year: 2018,
  },
  {
    id: "7",
    title: "Business Law Today",
    author: "Roger LeRoy Miller",
    category: "Business",
    description: "An engaging business law text with current examples and case studies that illustrate the relevance of law to everyday life.",
    rating: 3.9,
    totalRatings: 45,
    courseRelevance: ["BBA 2201", "BBA 3101"],
    difficulty: "Beginner",
    cover: "",
    year: 2021,
  },
  {
    id: "8",
    title: "Computer Networking: A Top-Down Approach",
    author: "James Kurose",
    category: "Computer Science",
    description: "An accessible introduction to computer networking using a top-down approach that begins with applications visible to the user.",
    rating: 4.5,
    totalRatings: 112,
    courseRelevance: ["CCS 2251", "CCS 3255"],
    difficulty: "Intermediate",
    cover: "",
    year: 2020,
  },
  {
    id: "9",
    title: "Fundamentals of Education",
    author: "James O. Ochieng",
    category: "Education",
    description: "A foundational text that covers educational theories, teaching methods, and the philosophy of education in the Kenyan context.",
    rating: 3.8,
    totalRatings: 34,
    courseRelevance: ["EDU 1101", "EDU 2101"],
    difficulty: "Beginner",
    cover: "",
    year: 2017,
  },
  {
    id: "10",
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell",
    category: "Computer Science",
    description: "The leading textbook in Artificial Intelligence covering intelligent agents, problem solving, knowledge representation, and machine learning.",
    rating: 4.6,
    totalRatings: 156,
    courseRelevance: ["CCS 4251", "CCS 4301"],
    difficulty: "Advanced",
    cover: "",
    year: 2020,
  },
  {
    id: "11",
    title: "Software Engineering",
    author: "Ian Sommerville",
    category: "Computer Science",
    description: "A comprehensive introduction to software engineering practices, methodologies, and project management techniques.",
    rating: 4.2,
    totalRatings: 92,
    courseRelevance: ["CCS 3256", "CCS 4302"],
    difficulty: "Intermediate",
    cover: "",
    year: 2015,
  },
  {
    id: "12",
    title: "Research Methods for Business Students",
    author: "Mark Saunders",
    category: "Business",
    description: "A practical guide to conducting research in business and management, covering both qualitative and quantitative approaches.",
    rating: 4.0,
    totalRatings: 58,
    courseRelevance: ["BBA 4101", "BBA 3201"],
    difficulty: "Intermediate",
    cover: "",
    year: 2019,
  },
];

export const categories = [
  "Computer Science",
  "Business",
  "Education",
  "Mathematics",
  "Engineering",
  "Sciences",
];

export const programs = [
  "BSc. Computer Science",
  "BSc. Information Technology",
  "BBA Business Administration",
  "B.Ed Education",
  "BSc. Mathematics",
  "BSc. Electrical Engineering",
];

export const yearOptions = ["Year 1", "Year 2", "Year 3", "Year 4"];
