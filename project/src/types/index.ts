export interface PromptTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: 'text' | 'image' | 'code' | 'video' | 'audio' | 'development' | 'automation';
}

export interface EnhancedPrompt {
  id: string;
  original: string;
  enhanced: string;
  tool: PromptTool;
  enhancementType: string;
  timestamp: Date;
}

export interface PromptHistory {
  id: string;
  original: string;
  enhanced: EnhancedPrompt[];
  timestamp: Date;
  isFavorite: boolean;
}

export interface ProductRequirement {
  title: string;
  description: string;
  features: string[];
  technicalSpecs: string[];
  userStories: string[];
}