export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  role: string;
  badge?: string;
  isVerified?: boolean;
  followersCount: number;
  followingCount: number;
  website?: string;
  github?: string;
  twitter?: string;
  bannerImage?: string;
  skills: string[];
}

export interface ToolItem {
  id: string;
  name: string;
  tagline: string;
  category: 'Coding & IDEs' | 'LLMs & Reasoning' | 'Agents & Automation' | 'Design & Frontend' | 'Media & Voice' | 'DevOps & Cloud';
  url: string;
  icon: string;
  pricing: 'Free' | 'Freemium' | 'Open Source' | 'Paid';
  rating: number;
  upvotes: number;
  isTrending?: boolean;
  featuredBy?: string;
  description: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  likes: number;
  hasLiked?: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  userVotedOptionId?: string;
}

export interface CodeSnippet {
  language: string;
  filename?: string;
  code: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  category: 'Trending' | 'Vibe Coding' | 'AI Tools' | 'Showcase' | 'General';
  tags: string[];
  likes: number;
  hasLiked?: boolean;
  comments: Comment[];
  reposts: number;
  hasReposted?: boolean;
  isSaved?: boolean;
  toolAttachment?: ToolItem;
  codeSnippet?: CodeSnippet;
  poll?: Poll;
  image?: string;
  isPinned?: boolean;
  views?: number;
}

export type FeedTab = 'trending' | 'latest' | 'vibe-coding' | 'tools' | 'showcase' | 'following';
export type MainView = 'feed' | 'explore' | 'notifications' | 'messages' | 'tools-directory' | 'vibe-hub' | 'saved' | 'profile';
