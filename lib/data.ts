export type Tool = {
  _id: string;
  name: string;
  url: string;
  description: string;
  tags: string[];
  isPremium: boolean;
  likesCount: number;
  createdAt: string;
};

// export const CATEGORIES = [
//   "All AI",
//   "Writing",
//   "Image",
//   "Code",
//   "Video",
//   "Voice",
//   "3D",
//   "Productivity",
//   "Marketing",
//   "Design",
// ];
export const CATEGORIES = [
  '3D Modeling',
  'AI Agents',
  'AI Art',
  'AI Assistant',
  'AI Code',
  'AI Characters',
  'AI Image',
  'AI Music',
  'AI Research',
  'AI Search',
  'AI Tools',
  'AI Video',
  'AI Voice',
  'AI Writing',
  'Analytics',        // ➕ new
  'Anime',
  'API',              // ➕ new
  'Article',
  'Automation',       // ➕ new
  'Biology',
  'Books',
  'Browser Extension',// ➕ new
  'Car Tools',
  'Cheatsheets',
  'Chemistry',
  'Chrome Extension',
  'Comparison',
  'Cooking',
  'Courses',
  'Database',         // ➕ new
  'Data Sharing',
  'Design',
  'E-commerce',       // ➕ new
  'Education',
  'Entertainment',
  'Fashion',
  'Finance',          // ➕ new
  'Fitness',
  'Food',
  'Formula',
  'Free',
  'Freemium',
  'Fun',
  'Gaming',
  'Health',           // ➕ new
  'History',
  'Hosting',
  'Icons',
  'Image',
  'Image Editing',
  'Image Tool',
  'Language Learning',// ➕ new
  'LLM',
  'Login Required',
  'Logo Creation',
  'Marketing',
  'Math',
  'Movie',
  'Music',
  'News',
  'No Code',          // ➕ new
  'No Login Required',
  'Open Source',      // ➕ new
  'PDF',
  'PDF Editing',
  'Photography',      // ➕ new
  'Podcast',          // ➕ new
  'Presentation',
  'Premium',
  'Privacy and Security',
  'Productivity',
  'Programming',
  'Programming Tricks',
  'Prank',
  'Radio',
  'Research',
  'Resume Builder',
  'Social Media',
  'Study',
  'Study Notes',
  'Summarizer',
  'Teaching',
  'Templates',        // ➕ new
  'Tools',
  'Translation',
  'Travelling',
  'Typing',
  'UI',
  'Video Editing',
  'Video Tools',
  'Web Dev',
  'Wifi',
  'Writing Tool'
];

export const TOOLS: Tool[] = [];

export const TESTIMONIALS = [
  {
    id: "1",
    name: "Sarah Jenkins",
    role: "PRODUCT DESIGNER",
    content: "Web Hunter has completely changed how I source inspiration for my projects. No more generic search results.",
    avatarSeed: "sarah"
  },
  {
    id: "2",
    name: "Marcus Thorne",
    role: "GROWTH LEAD",
    content: "The curation is top-tier. I found three incredible tools for my workflow within the first ten minutes of joining.",
    avatarSeed: "marcus"
  },
  {
    id: "3",
    name: "Lila Chen",
    role: "CREATIVE DIRECTOR",
    content: "A breath of fresh air for the internet. It feels like the old days of stumbling upon gems, but professionally organized.",
    avatarSeed: "lila"
  }
];
