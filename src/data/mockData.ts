import { User, ToolItem, Post } from '../types';

export const CURRENT_USERS: User[] = [
  {
    id: 'user-zubair',
    name: 'Zubair WebsiteWala',
    handle: 'zubair_websitewala',
    avatar: '/assets/aistudio/ChatGPT_Image_Sep_26__2026__05_15_45_AM_f041ed4f.png',
    bio: 'Founder of Zubair WebsiteWala 💜🤖 | AI Builder, Vibe Coder & Full-Stack Architect. Building the future one prompt & project at a time. 🇵🇰',
    role: 'Platform Founder & Vibe Coder',
    badge: 'Founder 🚀',
    isVerified: true,
    followersCount: 14280,
    followingCount: 312,
    website: 'https://zubairwebsitewala.dev',
    github: 'https://github.com/zubair-websitewala',
    twitter: 'https://twitter.com/zubair_wala',
    bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    skills: ['Vibe Coding', 'Full-Stack AI', 'Next.js & Vite', 'Gemini & Claude', 'System Design']
  },
  {
    id: 'user-alex',
    name: 'Alex Chen',
    handle: 'alexc_vibecodes',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    bio: 'Shipping 3 SaaS apps in 30 days using Cursor + Gemini 2.0. Vibe coding enthusiast & indie hacker. ⚡',
    role: 'Indie Hacker & Vibe Coder',
    badge: 'Top Shipper',
    isVerified: true,
    followersCount: 8430,
    followingCount: 184,
    skills: ['Cursor IDE', 'Fast Prototyping', 'Tailwind CSS', 'Supabase']
  },
  {
    id: 'user-elena',
    name: 'Elena Rostova',
    handle: 'elena_ai_ux',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    bio: 'Product Designer exploring Generative UI, Canvas AI, and human-agent interfaces. Crafting pixel perfection.',
    role: 'Lead AI Design Engineer',
    badge: 'Design Guru 🎨',
    isVerified: true,
    followersCount: 6120,
    followingCount: 220,
    skills: ['Figma to Code', 'Generative UI', 'v0.dev', 'Micro-interactions']
  },
  {
    id: 'user-marcus',
    name: 'Marcus Thorne',
    handle: 'marcus_agents',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    bio: 'Building autonomous multi-agent swarms. Contributor to LangGraph and open-source local LLMs.',
    role: 'AI Systems Architect',
    badge: 'Agentic Core',
    isVerified: false,
    followersCount: 4890,
    followingCount: 410,
    skills: ['LangGraph', 'Local LLMs', 'Python', 'Vector DBs']
  }
];

export const CURATED_TOOLS: ToolItem[] = [
  {
    id: 'tool-cursor',
    name: 'Cursor',
    tagline: 'The AI-first code editor built on VS Code with effortless multi-file edits.',
    category: 'Coding & IDEs',
    url: 'https://cursor.com',
    icon: '⚡',
    pricing: 'Freemium',
    rating: 4.9,
    upvotes: 1842,
    isTrending: true,
    featuredBy: 'zubair_websitewala',
    description: 'An AI-powered fork of VS Code with powerful composer mode, codebase indexing, and tab autocomplete that feels like telepathy.'
  },
  {
    id: 'tool-gemini-2',
    name: 'Gemini 2.0 Flash',
    tagline: 'Google\'s state-of-the-art multimodal model with lightning speed and 1M context.',
    category: 'LLMs & Reasoning',
    url: 'https://ai.google.dev',
    icon: '✨',
    pricing: 'Freemium',
    rating: 4.8,
    upvotes: 1620,
    isTrending: true,
    featuredBy: 'zubair_websitewala',
    description: 'Ultra-low latency, multimodal streaming, native audio dialog, and deep tool use capabilities designed for real-time production agents.'
  },
  {
    id: 'tool-claude-37',
    name: 'Claude 3.7 Sonnet',
    tagline: 'Hybrid reasoning model with controllable thought budgets and unmatched code synthesis.',
    category: 'LLMs & Reasoning',
    url: 'https://anthropic.com',
    icon: '🧠',
    pricing: 'Paid',
    rating: 4.9,
    upvotes: 2104,
    isTrending: true,
    description: 'Combines instantaneous responses with thorough deep-thinking reasoning loops for complex refactoring and logic puzzles.'
  },
  {
    id: 'tool-v0',
    name: 'v0 by Vercel',
    tagline: 'Generative UI system turning plain text prompts into modern React + Tailwind components.',
    category: 'Design & Frontend',
    url: 'https://v0.dev',
    icon: '🎨',
    pricing: 'Freemium',
    rating: 4.7,
    upvotes: 1395,
    isTrending: false,
    description: 'Instant generative UI engine that writes clean TypeScript, Shadcn-compatible components ready to drop into Next.js.'
  },
  {
    id: 'tool-bolt',
    name: 'Bolt.new',
    tagline: 'In-browser full-stack AI development sandbox running Node.js via WebContainers.',
    category: 'Coding & IDEs',
    url: 'https://bolt.new',
    icon: '⚡',
    pricing: 'Freemium',
    rating: 4.6,
    upvotes: 1180,
    isTrending: true,
    description: 'Prompt, build, run, and deploy full-stack Node.js and React applications directly inside your browser without installing anything locally.'
  },
  {
    id: 'tool-langgraph',
    name: 'LangGraph',
    tagline: 'Build resilient cyclic multi-agent workflows with state persistence.',
    category: 'Agents & Automation',
    url: 'https://langchain-ai.github.io/langgraph',
    icon: '🕸️',
    pricing: 'Open Source',
    rating: 4.8,
    upvotes: 940,
    isTrending: false,
    description: 'Stateful, multi-actor applications with LLMs, cyclical graphs, human-in-the-loop validation, and memory checkpointing.'
  },
  {
    id: 'tool-elevenlabs',
    name: 'ElevenLabs',
    tagline: 'Industry-standard voice synthesis, voice cloning, and emotional speech generation.',
    category: 'Media & Voice',
    url: 'https://elevenlabs.io',
    icon: '🎙️',
    pricing: 'Freemium',
    rating: 4.9,
    upvotes: 1530,
    isTrending: false,
    description: 'Realistic text-to-speech with natural inflection, low-latency conversational voice agent SDKs, and multi-language support.'
  },
  {
    id: 'tool-lovable',
    name: 'Lovable.dev',
    tagline: 'AI engineer that creates full-stack applications with database integration from plain English.',
    category: 'Coding & IDEs',
    url: 'https://lovable.dev',
    icon: '💜',
    pricing: 'Freemium',
    rating: 4.7,
    upvotes: 1045,
    isTrending: true,
    description: 'High-speed vibe coding tool that designs interfaces, configures backends, and deploys production applications effortlessly.'
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-jinnah-edhi',
    author: CURRENT_USERS[0], // Zubair WebsiteWala
    content: `My school is making me into next Jinnah & Edhi — Ask me how! 🌟🇵🇰

Proudly building, teaching, and empowering the next generation with modern AI technology, web development, and timeless values of service and leadership. 

One idea at a time. One project at a time. Let's build the future together! 🚀✨

#JinnahAndEdhi #ZubairWebsiteWala #AIBuilders #NextGen #TechForGood #Education`,
    createdAt: '2m ago',
    category: 'Showcase',
    tags: ['JinnahAndEdhi', 'ZubairWebsiteWala', 'AIBuilders', 'TechForGood', 'FutureLeaders'],
    likes: 542,
    hasLiked: true,
    reposts: 128,
    isSaved: true,
    isPinned: true,
    image: '/assets/aistudio/ChatGPT_Image_Sep_26__2026__05_15_45_AM_f041ed4f.png',
    comments: [
      {
        id: 'c-je-1',
        author: CURRENT_USERS[1],
        content: 'MashaAllah! Inspiring mission Zubair bhai! True leadership is creating creators and builders ❤️🇵🇰',
        createdAt: '1m ago',
        likes: 38,
        hasLiked: true
      },
      {
        id: 'c-je-2',
        author: CURRENT_USERS[2],
        content: 'What a powerful message! The yellow shirts and the vision for education are incredible 👏',
        createdAt: 'Just now',
        likes: 19
      }
    ]
  },
  {
    id: 'post-1',
    author: CURRENT_USERS[0], // Zubair WebsiteWala
    content: `🚀 Welcome to **Zubair WebsiteWala** — our dedicated AI social playground! 💜🤖

A space built for developers, vibe coders, founders, and curious minds who believe building with AI is not just the future, but our everyday reality.

Here is what we stand for:
1. **Curiosity over Cynicism**: Try the new model, test the new workflow, break things and share what you learned.
2. **Vibe Coding with Craft**: AI handles the boilerplate; your taste and architectural instinct direct the symphony.
3. **Open Collaboration**: Share prompts, review breakthrough tools, and support fellow creators.

One idea at a time. One project at a time. Let's build the future together! Drop a hello below and share what you are currently building! 👇✨`,
    createdAt: '15m ago',
    category: 'Trending',
    tags: ['ZubairWebsiteWala', 'VibeCoding', 'BuildInPublic', 'FutureOfDev'],
    likes: 184,
    hasLiked: false,
    reposts: 42,
    isSaved: true,
    isPinned: true,
    comments: [
      {
        id: 'c-1',
        author: CURRENT_USERS[1],
        content: 'Huge congratulations Zubair! The UI feels blazing fast and the vibe is immaculate. Ready to share all my recent Cursor hacks! 🚀',
        createdAt: '10m ago',
        likes: 14,
        hasLiked: true
      },
      {
        id: 'c-2',
        author: CURRENT_USERS[2],
        content: 'Loving the purple cyber palette and clean card hierarchy! Finally a place where AI UX and coding meet properly 💜',
        createdAt: '5m ago',
        likes: 9
      }
    ],
    poll: {
      id: 'poll-1',
      question: 'What is your primary AI coding companion in 2026?',
      totalVotes: 326,
      options: [
        { id: 'opt-1', text: 'Cursor + Claude 3.7 / Sonnet', votes: 154 },
        { id: 'opt-2', text: 'Google AI Studio & Gemini 2.0', votes: 98 },
        { id: 'opt-3', text: 'Windsurf / Copilot Workspace', votes: 48 },
        { id: 'opt-4', text: 'Bolt.new / Lovable In-Browser', votes: 26 }
      ]
    }
  },
  {
    id: 'post-2',
    author: CURRENT_USERS[0], // Zubair WebsiteWala
    content: `💡 **Vibe Coding Secret #4: The 3-Rule Context Anchor**

When building full-stack apps with LLMs, 90% of hallucinations happen because the model loses the original architecture boundaries. Here is the exact instruction block I prepend to my custom system prompts:

- Rule 1: Always check existing schemas before creating redundant tables.
- Rule 2: Keep components modular under 200 lines; extract hooks early.
- Rule 3: Prefer standard TypeScript enums and explicit interfaces.

I tested this workflow building a real-time analytics dashboard in 45 minutes flat. Check out the snippet below! 🛠️`,
    createdAt: '1h ago',
    category: 'Vibe Coding',
    tags: ['VibeCoding', 'PromptEngineering', 'CleanCode', 'Architecture'],
    likes: 247,
    hasLiked: true,
    reposts: 58,
    isSaved: false,
    toolAttachment: CURATED_TOOLS[0], // Cursor
    codeSnippet: {
      language: 'typescript',
      filename: 'vibe-system-prompt.ts',
      code: `// Zubair WebsiteWala: Vibe Coding System Anchor
export const SYSTEM_VIBE_CONFIG = {
  mode: 'autonomous-architect',
  principles: [
    'zero-bloat: no unused dependencies',
    'fail-fast: explicit types over loose any',
    'delightful-ui: smooth transitions & high contrast'
  ],
  iterationLoop: async (goal: string) => {
    const spec = await generateTechnicalSpec(goal);
    return scaffoldWithConfidence(spec);
  }
};`
    },
    comments: [
      {
        id: 'c-3',
        author: CURRENT_USERS[3],
        content: 'Rule #2 saved my life yesterday. Keeping files under 200 lines avoids the multi-turn context drift completely.',
        createdAt: '42m ago',
        likes: 12
      }
    ]
  },
  {
    id: 'post-3',
    author: CURRENT_USERS[1], // Alex Chen
    content: `🔥 Just tested **Gemini 2.0 Flash** for live audio-driven web development. 

The latency is mind-boggling (<300ms round trip). I was literally talking to the model:
"Alex: Change the hero gradient to electric violet, add a live follower counter, and wire up localStorage."
Before I finished speaking, the code was updated and the dev preview refreshed. 

This changes the entire feedback loop of coding! Who else is building with multimodal WebSockets? 🎧⚡`,
    createdAt: '3h ago',
    category: 'AI Tools',
    tags: ['Gemini2', 'Multimodal', 'DevTools', 'FutureTech'],
    likes: 165,
    hasLiked: false,
    reposts: 31,
    isSaved: true,
    toolAttachment: CURATED_TOOLS[1], // Gemini 2.0 Flash
    comments: [
      {
        id: 'c-4',
        author: CURRENT_USERS[0],
        content: 'The multimodal streaming on Gemini 2.0 is a game changer! Zubair WebsiteWala is experimenting with a live voice-assistant prompt enhancer next! 🎙️💜',
        createdAt: '2h ago',
        likes: 22
      }
    ]
  },
  {
    id: 'post-4',
    author: CURRENT_USERS[2], // Elena Rostova
    content: `✨ **Generative UI Design Checklist: How to prevent "AI Slop" in your interfaces:**

As AI builders, it is tempting to generate 50 buttons and 10 nested modals in 2 minutes. But great software has restraint:

1. **Hierarchy First**: 1 dominant primary action per viewport. Everything else is secondary or ghost.
2. **Color Restraint**: Pick one rich accent (like Zubair's electric violet \`#7c3aed\`) and pair with deep neutrals.
3. **Intentional Spacing**: 4px/8px rhythm. Give elements breathing room.
4. **Haptic & Visual Feedback**: Animated state transitions with spring physics.

What do you think makes an AI interface feel premium vs sloppy? Let me know! 🎨`,
    createdAt: '5h ago',
    category: 'Showcase',
    tags: ['DesignAI', 'UIUX', 'FrontendCraft', 'WebDesign'],
    likes: 319,
    hasLiked: false,
    reposts: 74,
    isSaved: false,
    comments: []
  }
];

export const TRENDING_TAGS = [
  { category: 'Trending in Pakistan 🇵🇰', tag: 'JinnahAndEdhi', count: '42.1K posts' },
  { category: 'Technology · Trending', tag: 'ZubairWebsiteWala', count: '38.4K posts' },
  { category: 'Coding · Trending', tag: 'VibeCoding', count: '29.2K posts' },
  { category: 'Artificial Intelligence', tag: 'Cursor', count: '18.5K posts' },
  { category: 'Google AI · Trending', tag: 'Gemini2', count: '14.1K posts' },
  { category: 'Education · Trending', tag: 'FutureLeaders', count: '9.8K posts' }
];

export const VIBE_CODING_PRINCIPLES = [
  {
    title: '1. High Context, Clear Constraints',
    desc: 'Never give vague goals. Provide exact framework versions, preferred icon sets (Lucide), and styling patterns before asking for code.'
  },
  {
    title: '2. The Taste Authority',
    desc: 'The AI writes the syntax, but you are the creative director. Judge spacing, typography, edge cases, and user delight ruthlessly.'
  },
  {
    title: '3. Modular Chunking',
    desc: 'Decompose complex features into autonomous units: schema first, mock seed data second, components third, integrations last.'
  },
  {
    title: '4. Continuous Rapid Feedback Loops',
    desc: 'Keep the preview visible at all times. Test immediately after each generation so minor drifts are caught before snowballing.'
  }
];

export const READY_PROMPTS = [
  {
    title: 'Component Polisher Prompt',
    category: 'UI/UX',
    prompt: `Review this component for production craft. Ensure strict TypeScript types, accessible keyboard navigation, Lucide icons, smooth motion transitions, responsive layout from 320px to 4K, and zero generic styling.`
  },
  {
    title: 'Agentic Architect Spec Prompt',
    category: 'System Design',
    prompt: `Act as a principal architect. Before writing any code, draft a 3-bullet technical specification, define the exact data structures and state transitions, and flag any edge cases regarding offline support or rate limits.`
  },
  {
    title: 'Full-Stack Vibe Coding Prompt',
    category: 'Workflow',
    prompt: `We are building a responsive web feature. Use modern Tailwind CSS, standard enums, modular React hooks, and persistent localStorage sync so user data survives browser refreshes.`
  }
];
