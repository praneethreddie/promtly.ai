import { PromptTool } from '../types';

export const promptTools: PromptTool[] = [
  // Text Generation Tools
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI\'s conversational AI - optimized for detailed explanations and reasoning',
    icon: 'MessageSquare',
    color: 'bg-emerald-500',
    category: 'text'
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic\'s AI assistant - excellent for analysis and balanced perspectives',
    icon: 'Brain',
    color: 'bg-orange-500',
    category: 'text'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Google\'s multimodal AI - great for comprehensive analysis',
    icon: 'Sparkles',
    color: 'bg-indigo-500',
    category: 'text'
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    description: 'Research-focused AI with real-time web access and citations',
    icon: 'Search',
    color: 'bg-cyan-500',
    category: 'text'
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: 'Productivity-focused AI for writing, brainstorming, and organization',
    icon: 'FileText',
    color: 'bg-gray-600',
    category: 'text'
  },
  {
    id: 'writesonic',
    name: 'Writesonic',
    description: 'AI writing assistant for marketing copy and content creation',
    icon: 'Edit',
    color: 'bg-blue-600',
    category: 'text'
  },
  {
    id: 'jasper',
    name: 'Jasper AI',
    description: 'Enterprise AI writing platform for marketing and business content',
    icon: 'Briefcase',
    color: 'bg-purple-600',
    category: 'text'
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    description: 'AI copywriting tool for sales and marketing content',
    icon: 'Copy',
    color: 'bg-green-600',
    category: 'text'
  },
  {
    id: 'scalenut',
    name: 'Scalenut',
    description: 'AI-powered SEO and content marketing platform',
    icon: 'TrendingUp',
    color: 'bg-yellow-600',
    category: 'text'
  },
  {
    id: 'anyword',
    name: 'Anyword',
    description: 'Performance-driven AI copywriting with predictive analytics',
    icon: 'BarChart3',
    color: 'bg-red-600',
    category: 'text'
  },

  // Image Generation Tools
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'AI image generation - perfect for creative visual prompts',
    icon: 'Palette',
    color: 'bg-purple-500',
    category: 'image'
  },
  {
    id: 'dalle3',
    name: 'DALL·E 3',
    description: 'OpenAI\'s advanced image generator with natural language understanding',
    icon: 'Image',
    color: 'bg-emerald-600',
    category: 'image'
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    description: 'Open-source image generation - detailed artistic prompts',
    icon: 'Brush',
    color: 'bg-pink-500',
    category: 'image'
  },
  {
    id: 'leonardo-ai',
    name: 'Leonardo AI',
    description: 'AI art generator with fine-tuned models for different styles',
    icon: 'Paintbrush',
    color: 'bg-orange-600',
    category: 'image'
  },
  {
    id: 'adobe-firefly',
    name: 'Adobe Firefly',
    description: 'Adobe\'s AI image generator integrated with Creative Cloud',
    icon: 'Flame',
    color: 'bg-red-500',
    category: 'image'
  },
  {
    id: 'canva-ai',
    name: 'Canva AI',
    description: 'AI-powered design tool for marketing and social media graphics',
    icon: 'Layout',
    color: 'bg-blue-500',
    category: 'image'
  },
  {
    id: 'bing-image',
    name: 'Bing Image Creator',
    description: 'Microsoft\'s AI image generator powered by DALL-E',
    icon: 'Globe',
    color: 'bg-blue-700',
    category: 'image'
  },
  {
    id: 'dream-wombo',
    name: 'Dream by Wombo',
    description: 'Mobile-first AI art generator with artistic styles',
    icon: 'Smartphone',
    color: 'bg-pink-600',
    category: 'image'
  },
  {
    id: 'playground-ai',
    name: 'Playground AI',
    description: 'User-friendly AI image generator with editing capabilities',
    icon: 'Gamepad2',
    color: 'bg-violet-600',
    category: 'image'
  },

  // Video Generation Tools
  {
    id: 'sora',
    name: 'Sora',
    description: 'OpenAI\'s text-to-video model for realistic video generation',
    icon: 'Video',
    color: 'bg-emerald-700',
    category: 'video'
  },
  {
    id: 'runway-ml',
    name: 'Runway ML',
    description: 'AI video generation and editing platform with Gen-2 technology',
    icon: 'Film',
    color: 'bg-green-700',
    category: 'video'
  },
  {
    id: 'pika-labs',
    name: 'Pika Labs',
    description: 'AI video generator focused on creative and artistic content',
    icon: 'Play',
    color: 'bg-purple-700',
    category: 'video'
  },
  {
    id: 'synthesia',
    name: 'Synthesia',
    description: 'AI avatar video creation for business and educational content',
    icon: 'Users',
    color: 'bg-blue-800',
    category: 'video'
  },
  {
    id: 'lumen5',
    name: 'Lumen5',
    description: 'AI-powered video creation from text content',
    icon: 'Monitor',
    color: 'bg-orange-700',
    category: 'video'
  },
  {
    id: 'kaiber-ai',
    name: 'Kaiber AI',
    description: 'AI video generation with music synchronization',
    icon: 'Music',
    color: 'bg-indigo-700',
    category: 'video'
  },

  // Audio Generation Tools
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'AI voice synthesis with realistic speech generation',
    icon: 'Mic',
    color: 'bg-slate-600',
    category: 'audio'
  },
  {
    id: 'play-ht',
    name: 'Play.ht',
    description: 'AI voice generator for podcasts and audiobooks',
    icon: 'Headphones',
    color: 'bg-green-800',
    category: 'audio'
  },
  {
    id: 'murf-ai',
    name: 'Murf AI',
    description: 'Professional AI voiceover generator for presentations',
    icon: 'Volume2',
    color: 'bg-blue-900',
    category: 'audio'
  },
  {
    id: 'descript-overdub',
    name: 'Descript Overdub',
    description: 'AI voice cloning and audio editing platform',
    icon: 'Edit',
    color: 'bg-purple-800',
    category: 'audio'
  },
  {
    id: 'lovo-ai',
    name: 'LOVO AI',
    description: 'AI voice generator with emotional expression',
    icon: 'Heart',
    color: 'bg-red-700',
    category: 'audio'
  },
  {
    id: 'resemble-ai',
    name: 'Resemble AI',
    description: 'Custom AI voice cloning and speech synthesis',
    icon: 'UserCheck',
    color: 'bg-teal-600',
    category: 'audio'
  },

  // Code Generation Tools
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    description: 'AI coding assistant - optimized for programming tasks',
    icon: 'Code',
    color: 'bg-gray-800',
    category: 'code'
  },
  {
    id: 'cursor',
    name: 'Cursor IDE',
    description: 'AI-powered code editor with intelligent suggestions',
    icon: 'MousePointer',
    color: 'bg-blue-600',
    category: 'code'
  },
  {
    id: 'codeium',
    name: 'Codeium Chat',
    description: 'Free AI coding assistant with chat interface',
    icon: 'MessageCircle',
    color: 'bg-green-600',
    category: 'code'
  },
  {
    id: 'replit-ghostwriter',
    name: 'Replit Ghostwriter',
    description: 'AI pair programmer integrated with online IDE',
    icon: 'Ghost',
    color: 'bg-orange-600',
    category: 'code'
  },
  {
    id: 'mutable-ai',
    name: 'Mutable.ai',
    description: 'AI-powered software development and refactoring',
    icon: 'RefreshCw',
    color: 'bg-purple-600',
    category: 'code'
  },
  {
    id: 'amazon-codewhisperer',
    name: 'Amazon CodeWhisperer',
    description: 'AWS AI coding companion with security scanning',
    icon: 'Shield',
    color: 'bg-orange-500',
    category: 'code'
  },
  {
    id: 'tabnine',
    name: 'Tabnine',
    description: 'AI code completion tool for multiple programming languages',
    icon: 'Zap',
    color: 'bg-indigo-600',
    category: 'code'
  },
  {
    id: 'codium-ai',
    name: 'CodiumAI',
    description: 'AI-powered test generation and code analysis',
    icon: 'TestTube',
    color: 'bg-cyan-600',
    category: 'code'
  },

  // Development Platforms
  {
    id: 'lovable',
    name: 'Lovable',
    description: 'AI-powered full-stack development platform',
    icon: 'Zap',
    color: 'bg-pink-600',
    category: 'development'
  },
  {
    id: 'bolt',
    name: 'Bolt',
    description: 'AI development environment for rapid prototyping',
    icon: 'Bolt',
    color: 'bg-yellow-500',
    category: 'development'
  },
  {
    id: 'v0',
    name: 'v0 by Vercel',
    description: 'AI-powered UI generation and development tool',
    icon: 'Layers',
    color: 'bg-black',
    category: 'development'
  },

  // Automation Tools
  {
    id: 'make',
    name: 'Make.com',
    description: 'Visual automation platform with AI modules',
    icon: 'Settings',
    color: 'bg-purple-500',
    category: 'automation'
  },
  {
    id: 'zapier-ai',
    name: 'Zapier AI',
    description: 'Workflow automation with AI-powered triggers',
    icon: 'Workflow',
    color: 'bg-orange-500',
    category: 'automation'
  },
  {
    id: 'pipedream',
    name: 'Pipedream',
    description: 'Serverless integration platform with AI capabilities',
    icon: 'GitBranch',
    color: 'bg-green-500',
    category: 'automation'
  },
  {
    id: 'flowise',
    name: 'Flowise AI',
    description: 'Visual LLM orchestration tool for building AI applications',
    icon: 'Network',
    color: 'bg-blue-500',
    category: 'automation'
  }
];