import { PromptTool, ProductRequirement } from '../types';

export const promptBibles = {
  // Text Generation Tools
  chatgpt: {
    strategies: [
      'Be specific and detailed',
      'Use clear context and examples',
      'Ask for step-by-step reasoning',
      'Request specific formats or structures',
      'Include role-playing instructions'
    ],
    enhancePrompt: (prompt: string): string[] => {
      const enhancements = [
        `Act as an expert in the subject matter. ${prompt} Please provide a detailed, step-by-step explanation with examples and actionable insights.`,
        `${prompt}\n\nPlease structure your response with:\n1. Executive Summary\n2. Detailed Analysis\n3. Practical Examples\n4. Implementation Steps\n5. Key Takeaways`,
        `You are a world-class consultant with 20+ years of experience. ${prompt} Provide comprehensive insights with multiple perspectives, potential challenges, and strategic recommendations.`,
        `${prompt}\n\nThink through this systematically:\n- Break down the problem\n- Analyze each component\n- Provide evidence-based solutions\n- Include real-world examples\n- Suggest next steps`
      ];
      return enhancements;
    }
  },

  claude: {
    strategies: [
      'Provide clear context and constraints',
      'Use structured thinking approaches',
      'Request specific reasoning chains',
      'Include examples and counterexamples',
      'Ask for balanced perspectives'
    ],
    enhancePrompt: (prompt: string): string[] => {
      const enhancements = [
        `Please approach this systematically and thoughtfully: ${prompt}\n\nConsider multiple angles, potential challenges, ethical implications, and provide balanced reasoning with supporting evidence.`,
        `${prompt}\n\nPlease structure your analysis using:\n- Context and Background\n- Key Considerations and Constraints\n- Multi-perspective Analysis\n- Potential Risks and Mitigation\n- Balanced Conclusions and Recommendations`,
        `I need comprehensive help with: ${prompt}\n\nPlease provide thorough analysis including:\n- Different viewpoints and approaches\n- Potential limitations or considerations\n- Evidence-based reasoning\n- Practical implications`,
        `${prompt}\n\nPlease think through this carefully, considering:\n- Historical context and precedents\n- Different stakeholder perspectives\n- Potential unintended consequences\n- Long-term implications\n- Actionable recommendations with reasoning`
      ];
      return enhancements;
    }
  },

  gemini: {
    strategies: [
      'Use multi-modal thinking approaches',
      'Request comprehensive analysis',
      'Include creative and analytical perspectives',
      'Ask for innovative solutions',
      'Combine different knowledge domains'
    ],
    enhancePrompt: (prompt: string): string[] => {
      const enhancements = [
        `Analyze this from multiple perspectives and domains: ${prompt}\n\nCombine creative, analytical, technical, and practical approaches. Provide innovative solutions with interdisciplinary insights.`,
        `${prompt}\n\nPlease provide a comprehensive response that integrates:\n- Multi-disciplinary analysis\n- Creative and innovative approaches\n- Data-driven insights\n- Future trends and implications\n- Actionable strategies`,
        `Think holistically and creatively about: ${prompt}\n\nExplore unconventional solutions, draw connections between different fields, consider emerging technologies, and provide fresh perspectives with practical applications.`,
        `${prompt}\n\nApproach this with systems thinking, considering:\n- Interconnected relationships\n- Cross-domain applications\n- Innovative methodologies\n- Future scenarios and adaptability\n- Scalable solutions`
      ];
      return enhancements;
    }
  },

  perplexity: {
    strategies: [
      'Request research-backed information',
      'Ask for current data and trends',
      'Include source citations',
      'Combine multiple perspectives',
      'Focus on factual accuracy'
    ],
    enhancePrompt: (prompt: string): string[] => {
      const enhancements = [
        `Research and analyze: ${prompt}\n\nProvide comprehensive information with current data, statistics, expert opinions, and credible sources. Include recent developments and trends.`,
        `${prompt}\n\nPlease provide:\n- Current market data and statistics\n- Expert opinions and analysis\n- Recent developments and news\n- Comparative analysis\n- Source citations and references`,
        `I need well-researched information about: ${prompt}\n\nInclude:\n- Latest industry reports and studies\n- Expert insights and commentary\n- Historical context and trends\n- Data-driven conclusions\n- Reliable source references`,
        `${prompt}\n\nProvide a research-backed analysis including:\n- Current state of the field\n- Key players and stakeholders\n- Recent innovations and changes\n- Future projections\n- Credible sources and citations`
      ];
      return enhancements;
    }
  },

  // Image Generation Tools
  midjourney: {
    strategies: [
      'Use descriptive visual language',
      'Include style and mood keywords',
      'Specify camera angles and lighting',
      'Add artistic references and techniques',
      'Include quality and aspect ratio parameters'
    ],
    enhancePrompt: (prompt: string): string[] => {
      const enhancements = [
        `${prompt}, hyperrealistic, cinematic lighting, ultra-detailed, 8k resolution, professional photography, dramatic composition, vibrant colors, depth of field --ar 16:9 --v 6 --style raw`,
        `${prompt}, artistic masterpiece, golden hour lighting, atmospheric perspective, award-winning composition, bokeh effect, film grain, color grading --ar 3:2 --v 6 --stylize 750`,
        `${prompt}, studio quality, perfect lighting setup, commercial photography, sharp focus, beautiful bokeh, professional color correction, trending on artstation --ar 1:1 --v 6 --quality 2`,
        `${prompt}, cinematic scene, dramatic lighting, atmospheric mood, epic composition, photorealistic details, dynamic perspective, rich textures --ar 21:9 --v 6 --chaos 25`
      ];
      return enhancements;
    }
  },

  'dalle3': {
    strategies: [
      'Use natural language descriptions',
      'Focus on composition and style',
      'Include mood and atmosphere',
      'Specify artistic techniques',
      'Add contextual details'
    ],
    enhancePrompt: (prompt: string): string[] => {
      const enhancements = [
        `Create a highly detailed and photorealistic image of ${prompt}. The composition should be visually striking with professional lighting, rich colors, and sharp focus. Style: contemporary photography with cinematic quality.`,
        `Generate an artistic interpretation of ${prompt}. The image should have a sophisticated composition with dramatic lighting, beautiful color palette, and fine artistic details. Style: modern digital art with painterly qualities.`,
        `Produce a professional-quality image showing ${prompt}. Focus on creating a compelling visual narrative with excellent composition, natural lighting, and realistic textures. Style: high-end commercial photography.`,
        `Design a creative and visually appealing representation of ${prompt}. The image should have strong visual impact with thoughtful composition, atmospheric lighting, and rich detail. Style: contemporary illustration with photographic elements.`
      ];
      return enhancements;
    }
  },

  'stable-diffusion': {
    strategies: [
      'Include technical parameters',
      'Specify artistic styles',
      'Add negative prompts',
      'Use quality modifiers',
      'Include sampling methods'
    ],
    enhancePrompt: (prompt: string): string[] => {
      const enhancements = [
        `${prompt}, masterpiece, best quality, ultra-detailed, photorealistic, 8k uhd, professional photography, perfect lighting, vivid colors, sharp focus, depth of field, bokeh, film grain`,
        `${prompt}, highly detailed, artistic masterpiece, dramatic lighting, cinematic composition, trending on artstation, concept art, digital painting, smooth, sharp focus, illustration`,
        `${prompt}, award-winning photography, professional lighting setup, perfect composition, hyperrealistic, ultra-high resolution, stunning visual quality, rich textures, vibrant colors`,
        `${prompt}, epic composition, dramatic atmosphere, cinematic lighting, photorealistic rendering, intricate details, perfect anatomy, flawless execution, museum quality artwork`
      ];
      return enhancements;
    }
  },

  // Video Generation Tools
  sora: {
    strategies: [
      'Describe camera movements',
      'Include temporal elements',
      'Specify visual style',
      'Add narrative structure',
      'Include technical specifications'
    ],
    enhancePrompt: (prompt: string): string[] => {
      const enhancements = [
        `Create a cinematic video sequence: ${prompt}. Camera movement: smooth tracking shot with dynamic angles. Lighting: natural, cinematic quality. Duration: 10-15 seconds. Style: photorealistic with film-like quality and professional color grading.`,
        `Generate a high-quality video showing: ${prompt}. Include smooth camera transitions, dramatic lighting changes, and realistic motion. Style: documentary-style cinematography with 4K resolution and professional post-production effects.`,
        `Produce a visually stunning video of: ${prompt}. Camera work: establishing shot transitioning to close-up details. Lighting: golden hour with atmospheric effects. Style: commercial-quality production with cinematic depth of field.`,
        `Create an engaging video narrative: ${prompt}. Include multiple camera angles, smooth transitions, and dynamic lighting. Style: high-end commercial production with professional color correction and visual effects.`
      ];
      return enhancements;
    }
  },

  // Audio Generation Tools
  elevenlabs: {
    strategies: [
      'Specify voice characteristics',
      'Include emotional tone',
      'Add pacing instructions',
      'Specify pronunciation',
      'Include context for delivery'
    ],
    enhancePrompt: (prompt: string): string[] => {
      const enhancements = [
        `Generate professional voiceover: "${prompt}". Voice characteristics: clear, confident, and engaging. Tone: professional yet approachable. Pacing: moderate with natural pauses. Emotion: enthusiastic and informative. Style: broadcast quality narration.`,
        `Create high-quality speech synthesis: "${prompt}". Voice: warm and authoritative. Delivery: conversational yet polished. Emphasis: highlight key points naturally. Style: podcast-quality audio with professional intonation.`,
        `Produce natural-sounding voice: "${prompt}". Characteristics: articulate and expressive. Tone: friendly and professional. Pacing: well-timed with appropriate emphasis. Style: audiobook narrator quality with emotional nuance.`,
        `Generate compelling audio: "${prompt}". Voice: clear and engaging. Delivery: dynamic with natural rhythm. Emotion: appropriate to content context. Style: commercial-grade voiceover with professional polish.`
      ];
      return enhancements;
    }
  },

  // Code Generation Tools
  copilot: {
    strategies: [
      'Specify programming language and framework',
      'Include context about the codebase',
      'Request explanations with code',
      'Ask for best practices and optimization',
      'Include error handling requirements'
    ],
    enhancePrompt: (prompt: string): string[] => {
      const enhancements = [
        `${prompt}\n\nRequirements:\n- Write clean, production-ready code with comprehensive comments\n- Follow industry best practices and design patterns\n- Include proper error handling and edge case management\n- Provide type safety and validation\n- Add unit tests and documentation\n- Optimize for performance and maintainability`,
        `As a senior software engineer, implement: ${prompt}\n\nPlease provide:\n- Complete, working code solution\n- Detailed code comments explaining logic\n- Error handling and validation\n- Performance optimization considerations\n- Testing strategy and examples\n- Documentation and usage instructions`,
        `${prompt}\n\nDeliverables:\n- Full implementation with modular architecture\n- Comprehensive error handling\n- Input validation and sanitization\n- Performance optimizations\n- Unit tests with good coverage\n- Clear documentation and examples\n- Security best practices`,
        `Help me build: ${prompt}\n\nProvide:\n- Step-by-step implementation guide\n- Production-quality code with comments\n- Best practices and design patterns\n- Error handling and edge cases\n- Testing approach and examples\n- Performance considerations\n- Deployment and maintenance notes`
      ];
      return enhancements;
    }
  },

  // Development Platforms
  lovable: {
    strategies: [
      'Create comprehensive PRD',
      'Include user stories',
      'Specify technical requirements',
      'Add design specifications',
      'Include success metrics'
    ],
    enhancePrompt: (prompt: string): string[] => {
      const productRequirement = generateProductRequirement(prompt);
      const enhancements = [
        `Build a full-stack application: ${prompt}\n\n## Product Requirements Document\n\n### Overview\n${productRequirement.description}\n\n### Core Features\n${productRequirement.features.map(f => `- ${f}`).join('\n')}\n\n### Technical Specifications\n${productRequirement.technicalSpecs.map(t => `- ${t}`).join('\n')}\n\n### User Stories\n${productRequirement.userStories.map(u => `- ${u}`).join('\n')}\n\n### Success Metrics\n- User engagement and retention\n- Performance benchmarks\n- Accessibility compliance\n- Mobile responsiveness`,
        
        `Create a modern web application: ${prompt}\n\n## Detailed Requirements\n\n### User Experience\n- Intuitive and responsive design\n- Smooth animations and interactions\n- Accessibility (WCAG 2.1 AA compliance)\n- Mobile-first responsive layout\n- Fast loading times (<3 seconds)\n\n### Technical Stack\n- Frontend: React/Next.js with TypeScript\n- Styling: Tailwind CSS with custom components\n- State Management: Context API or Zustand\n- Backend: Node.js/Express or serverless functions\n- Database: PostgreSQL or MongoDB\n- Authentication: JWT or OAuth integration\n\n### Features to Implement\n${productRequirement.features.map(f => `- ${f}`).join('\n')}`,
        
        `Develop a production-ready application: ${prompt}\n\n## Implementation Plan\n\n### Phase 1: Core Functionality\n- User authentication and authorization\n- Main feature implementation\n- Basic UI/UX design\n- Data persistence layer\n\n### Phase 2: Enhanced Features\n- Advanced user interactions\n- Real-time updates (if applicable)\n- Search and filtering capabilities\n- Performance optimizations\n\n### Phase 3: Polish & Deploy\n- Comprehensive testing suite\n- Error handling and logging\n- SEO optimization\n- Production deployment setup\n\n### Quality Standards\n- Clean, maintainable code architecture\n- Comprehensive error handling\n- Security best practices\n- Performance optimization\n- Thorough testing coverage`,
        
        `Build an enterprise-grade solution: ${prompt}\n\n## Comprehensive Specification\n\n### Business Requirements\n- Clear value proposition and user benefits\n- Scalable architecture for growth\n- Security and compliance considerations\n- Integration capabilities\n\n### Technical Architecture\n- Microservices or modular monolith\n- API-first design approach\n- Database optimization and indexing\n- Caching strategy implementation\n- Monitoring and logging setup\n\n### User Experience Design\n- User research and persona development\n- Wireframes and prototyping\n- Design system and component library\n- Usability testing and iteration\n\n### Development Standards\n- Code review processes\n- Automated testing pipeline\n- CI/CD implementation\n- Documentation standards\n- Performance monitoring`
      ];
      return enhancements;
    }
  },

  bolt: {
    strategies: [
      'Focus on rapid prototyping',
      'Include interactive elements',
      'Specify modern frameworks',
      'Add real-time features',
      'Include deployment considerations'
    ],
    enhancePrompt: (prompt: string): string[] => {
      const productRequirement = generateProductRequirement(prompt);
      const enhancements = [
        `Rapidly prototype: ${prompt}\n\n## Quick Development Brief\n\n### MVP Features\n${productRequirement.features.slice(0, 5).map(f => `- ${f}`).join('\n')}\n\n### Tech Stack\n- React with TypeScript\n- Tailwind CSS for styling\n- Vite for fast development\n- Modern ES6+ features\n- Responsive design patterns\n\n### Interactive Elements\n- Smooth animations and transitions\n- Real-time user feedback\n- Intuitive navigation\n- Mobile-optimized interactions\n\n### Deployment Ready\n- Optimized build configuration\n- Environment variable setup\n- Static hosting compatibility\n- Performance optimizations`,
        
        `Create interactive prototype: ${prompt}\n\n## Development Specifications\n\n### Core Functionality\n- Clean, modern interface design\n- Responsive layout for all devices\n- Fast loading and smooth interactions\n- Intuitive user experience flow\n\n### Technical Implementation\n- Component-based architecture\n- State management with hooks\n- API integration capabilities\n- Error boundary implementation\n- Loading states and feedback\n\n### Visual Design\n- Modern UI/UX principles\n- Consistent design system\n- Accessible color schemes\n- Typography hierarchy\n- Micro-interactions and animations`,
        
        `Build modern web app: ${prompt}\n\n## Rapid Development Plan\n\n### Immediate Goals\n- Working prototype in minimal time\n- Core user journey implementation\n- Essential features only\n- Clean, professional appearance\n\n### Technical Approach\n- Single-page application architecture\n- Component reusability\n- Efficient state management\n- Optimized performance\n- Cross-browser compatibility\n\n### User Experience Focus\n- Intuitive interface design\n- Smooth user interactions\n- Clear visual hierarchy\n- Responsive across devices\n- Fast feedback loops`,
        
        `Develop interactive solution: ${prompt}\n\n## Implementation Strategy\n\n### MVP Development\n- Focus on core user needs\n- Minimal viable feature set\n- Quick iteration capability\n- User feedback integration\n\n### Modern Web Standards\n- Progressive web app features\n- Accessibility compliance\n- SEO optimization\n- Performance best practices\n- Security considerations\n\n### Deployment Strategy\n- Static site generation\n- CDN optimization\n- Environment configuration\n- Monitoring and analytics\n- Continuous deployment setup`
      ];
      return enhancements;
    }
  }
};

function generateProductRequirement(prompt: string): ProductRequirement {
  // This is a simplified PRD generator - in a real implementation, 
  // this could use AI to generate more sophisticated requirements
  const baseFeatures = [
    'User authentication and profile management',
    'Responsive design for mobile and desktop',
    'Real-time data updates and synchronization',
    'Search and filtering capabilities',
    'Data export and import functionality',
    'User preferences and customization',
    'Notification system',
    'Analytics and reporting dashboard',
    'Integration with third-party services',
    'Offline functionality support'
  ];

  const baseTechnicalSpecs = [
    'React/Next.js frontend with TypeScript',
    'RESTful API with proper error handling',
    'PostgreSQL database with optimized queries',
    'JWT-based authentication system',
    'Responsive CSS with Tailwind framework',
    'Unit and integration testing suite',
    'CI/CD pipeline for automated deployment',
    'Performance monitoring and logging',
    'Security best practices implementation',
    'Scalable cloud infrastructure'
  ];

  const baseUserStories = [
    'As a user, I want to easily sign up and log in to access the platform',
    'As a user, I want a clean and intuitive interface that works on my mobile device',
    'As a user, I want to quickly find and access the information I need',
    'As a user, I want my data to be secure and backed up automatically',
    'As a user, I want to customize my experience based on my preferences',
    'As a user, I want to receive notifications about important updates',
    'As a user, I want to export my data when needed',
    'As a user, I want the application to load quickly and work reliably'
  ];

  return {
    title: `Product Requirements for ${prompt}`,
    description: `A comprehensive solution that addresses user needs through ${prompt}. The application will provide an intuitive, scalable, and secure platform that delivers exceptional user experience while maintaining high performance standards.`,
    features: baseFeatures,
    technicalSpecs: baseTechnicalSpecs,
    userStories: baseUserStories
  };
}

export const enhancePrompt = (originalPrompt: string, tool: PromptTool): string[] => {
  const bible = promptBibles[tool.id as keyof typeof promptBibles];
  if (!bible) {
    // Fallback enhancement for tools without specific bibles
    return [
      `${originalPrompt}\n\nPlease provide a comprehensive and detailed response optimized for ${tool.name}. Include relevant examples, best practices, and actionable insights.`,
      `Act as an expert user of ${tool.name}. ${originalPrompt} Provide detailed guidance with specific techniques and proven strategies.`,
      `${originalPrompt}\n\nOptimize this request for ${tool.name} by including:\n- Clear objectives and context\n- Specific requirements and constraints\n- Expected output format\n- Quality standards and criteria`,
      `Help me achieve the best results with ${tool.name}: ${originalPrompt}\n\nProvide expert-level guidance with practical examples and implementation details.`
    ];
  }
  return bible.enhancePrompt(originalPrompt);
};