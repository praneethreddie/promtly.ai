import React, { useState, useRef, useEffect } from 'react';
import { Send, Wand2, Lightbulb, Zap, Sparkles } from 'lucide-react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const suggestions = [
    "Create a modern e-commerce website with user authentication",
    "Design a mobile app for task management and productivity",
    "Build a social media dashboard with analytics",
    "Generate a logo for a sustainable tech startup",
    "Write marketing copy for a new AI product launch",
    "Create a video script for a product demonstration"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [prompt]);

  const charCount = prompt.length;
  const maxChars = 2000;
  const isNearLimit = charCount > maxChars * 0.8;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl border border-cyan-500/30 shadow-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="prompt" className="block text-lg font-semibold text-cyan-100 flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-cyan-400" />
                <span>Enter your prompt</span>
              </label>
              <button
                type="button"
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="flex items-center space-x-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-500/30 hover:border-cyan-400/50"
              >
                <Lightbulb className="h-4 w-4" />
                <span>Need inspiration?</span>
              </button>
            </div>
            
            <div className="relative">
              <textarea
                ref={textareaRef}
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create, ask, or accomplish..."
                className="w-full min-h-[140px] max-h-[200px] px-6 py-4 bg-slate-900/60 border-2 border-slate-700/50 rounded-2xl text-white placeholder-cyan-300/60 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 transition-all duration-200 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent backdrop-blur-sm"
                maxLength={maxChars}
                rows={4}
              />
              <div className="absolute bottom-4 right-4 flex items-center space-x-3">
                <span className={`text-sm font-medium ${isNearLimit ? 'text-orange-400' : 'text-cyan-400'}`}>
                  {charCount}/{maxChars}
                </span>
              </div>
            </div>

            {/* Suggestions dropdown */}
            {showSuggestions && (
              <div className="mt-4 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 space-y-3 shadow-2xl">
                <div className="text-sm text-cyan-300 mb-4 font-semibold flex items-center space-x-2">
                  <Lightbulb className="h-4 w-4" />
                  <span>Try these examples:</span>
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left p-4 text-sm text-cyan-200 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 rounded-xl transition-all duration-200 border border-transparent hover:border-cyan-500/30 backdrop-blur-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center text-cyan-300 text-sm bg-cyan-500/20 px-4 py-2 rounded-full border border-cyan-500/30">
              <Wand2 className="h-4 w-4 mr-2 flex-shrink-0 animate-pulse" />
              <span>AI will enhance your prompt using proven techniques</span>
            </div>
            
            <button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 text-white rounded-2xl font-semibold transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100 shadow-2xl hover:shadow-cyan-500/25 disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Enhancing...</span>
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  <span>Enhance Prompt</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromptInput;