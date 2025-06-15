import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Star, Share2, Download, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { EnhancedPrompt } from '../types';
import * as Icons from 'lucide-react';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: EnhancedPrompt[];
  originalPrompt: string;
  onRegenerate: () => void;
}

const PromptModal: React.FC<PromptModalProps> = ({ 
  isOpen, 
  onClose, 
  results, 
  originalPrompt,
  onRegenerate 
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentIndex(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const sharePrompt = async (prompt: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Enhanced Prompt from Promtly.AI',
          text: prompt,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      copyToClipboard(prompt, 'share');
    }
  };

  const exportResults = () => {
    const exportData = {
      original: originalPrompt,
      enhanced: results.map(r => ({
        tool: r.tool.name,
        prompt: r.enhanced,
        type: r.enhancementType,
        timestamp: r.timestamp
      })),
      timestamp: new Date().toISOString(),
      totalResults: results.length
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `promtly-enhanced-prompts-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const nextPrompt = () => {
    setCurrentIndex((prev) => (prev + 1) % results.length);
  };

  const prevPrompt = () => {
    setCurrentIndex((prev) => (prev - 1 + results.length) % results.length);
  };

  if (!isOpen || results.length === 0) return null;

  const currentResult = results[currentIndex];
  const Icon = Icons[currentResult.tool.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
  const isCopied = copiedId === currentResult.id;
  const isFavorite = favorites.has(currentResult.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-indigo-900/95 to-cyan-900/95 backdrop-blur-xl"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl transition-all duration-300 ${
        isFullscreen 
          ? 'w-full h-full rounded-none' 
          : 'w-full max-w-6xl h-[90vh] rounded-3xl mx-4'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur-lg opacity-50"></div>
                <div className={`relative p-3 rounded-xl ${currentResult.tool.color} shadow-xl`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text flex items-center space-x-2">
                  <span>Enhanced Prompts Generated!</span>
                  <Sparkles className="h-6 w-6 text-cyan-400 animate-pulse" />
                </h2>
                <p className="text-cyan-300 font-medium">
                  {currentIndex + 1} of {results.length} • {currentResult.tool.name} • {currentResult.enhancementType}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-3 text-cyan-400 hover:text-white hover:bg-cyan-500/20 rounded-xl transition-all duration-200 border border-cyan-500/30 hover:border-cyan-400/50"
              title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>
            <button
              onClick={exportResults}
              className="p-3 text-cyan-400 hover:text-white hover:bg-cyan-500/20 rounded-xl transition-all duration-200 border border-cyan-500/30 hover:border-cyan-400/50"
              title="Export all results"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-3 text-cyan-400 hover:text-white hover:bg-red-500/20 rounded-xl transition-all duration-200 border border-cyan-500/30 hover:border-red-400/50"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Navigation */}
          {results.length > 1 && (
            <div className="flex items-center justify-center p-6 border-b border-cyan-500/20">
              <div className="flex items-center space-x-6">
                <button
                  onClick={prevPrompt}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-300 hover:text-white rounded-xl transition-all duration-200 border border-cyan-500/30 hover:border-cyan-400/50 font-medium"
                >
                  ← Previous
                </button>
                
                <div className="flex space-x-3">
                  {results.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-200 ${
                        index === currentIndex 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg' 
                          : 'bg-slate-600 hover:bg-slate-500 border border-cyan-500/30'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextPrompt}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-cyan-300 hover:text-white rounded-xl transition-all duration-200 border border-cyan-500/30 hover:border-cyan-400/50 font-medium"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 modal-scrollbar">
            {/* Original Prompt */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-300 flex items-center space-x-2">
                  <span>Original Prompt</span>
                </h3>
                <button
                  onClick={() => copyToClipboard(originalPrompt, 'original')}
                  className="p-2 text-cyan-400 hover:text-white hover:bg-cyan-500/20 rounded-lg transition-all duration-200 border border-cyan-500/30 hover:border-cyan-400/50"
                >
                  <Copy className="h-5 w-5" />
                </button>
              </div>
              <p className="text-white leading-relaxed text-lg">{originalPrompt}</p>
              <div className="mt-4 text-sm text-cyan-400 font-medium">
                {originalPrompt.length} characters
              </div>
            </div>

            {/* Enhanced Prompt */}
            <div className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${currentResult.tool.color} shadow-xl`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Enhanced for {currentResult.tool.name}</h3>
                    <p className="text-cyan-300 font-medium">{currentResult.enhancementType}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleFavorite(currentResult.id)}
                    className={`p-3 rounded-xl transition-all duration-200 ${
                      isFavorite
                        ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/50'
                        : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50 hover:text-yellow-400 border border-slate-600/50'
                    }`}
                  >
                    <Star className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    onClick={() => sharePrompt(currentResult.enhanced)}
                    className="p-3 bg-slate-700/50 text-slate-400 hover:bg-slate-600/50 hover:text-blue-400 rounded-xl transition-all duration-200 border border-slate-600/50 hover:border-blue-500/50"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={() => copyToClipboard(currentResult.enhanced, currentResult.id)}
                    className={`p-3 rounded-xl transition-all duration-200 ${
                      isCopied
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50 hover:text-white border border-slate-600/50 hover:border-cyan-500/50'
                    }`}
                  >
                    {isCopied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-6 mb-6 backdrop-blur-sm">
                <pre className="text-cyan-100 leading-relaxed whitespace-pre-wrap font-sans text-base">
                  {currentResult.enhanced}
                </pre>
              </div>
              
              <div className="flex items-center justify-between text-sm text-cyan-400">
                <div className="flex items-center space-x-6">
                  <span className="font-medium">{currentResult.enhanced.length} characters</span>
                  <span>•</span>
                  <span>Generated at {currentResult.timestamp.toLocaleTimeString()}</span>
                </div>
                {isFavorite && (
                  <div className="flex items-center space-x-2 text-yellow-400 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-medium">Favorited</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-cyan-500/30 p-8 bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-cyan-300 font-medium">
              {favorites.size > 0 && (
                <span className="bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30 mr-4">
                  {favorites.size} prompt{favorites.size !== 1 ? 's' : ''} favorited
                </span>
              )}
              Use these enhanced prompts in your AI tools for better results
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={onRegenerate}
                className="px-6 py-3 bg-gradient-to-r from-slate-700/80 to-slate-600/80 hover:from-slate-600/80 hover:to-slate-500/80 text-cyan-300 hover:text-white rounded-xl transition-all duration-200 border border-slate-600/50 hover:border-cyan-500/50 font-medium"
              >
                Regenerate All
              </button>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-xl hover:shadow-cyan-500/25 transform hover:scale-105"
              >
                Continue Editing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;