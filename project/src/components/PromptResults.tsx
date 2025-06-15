import React, { useState } from 'react';
import { Copy, Check, Star, Download, RefreshCw, Share2, Bookmark, ChevronDown, ChevronUp } from 'lucide-react';
import { EnhancedPrompt } from '../types';
import * as Icons from 'lucide-react';

interface PromptResultsProps {
  results: EnhancedPrompt[];
  originalPrompt: string;
  onRegenerate: () => void;
}

const PromptResults: React.FC<PromptResultsProps> = ({ results, originalPrompt, onRegenerate }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'tool' | 'length' | 'recent'>('tool');

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

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
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

  const sortedResults = [...results].sort((a, b) => {
    switch (sortBy) {
      case 'length':
        return b.enhanced.length - a.enhanced.length;
      case 'recent':
        return b.timestamp.getTime() - a.timestamp.getTime();
      default:
        return a.tool.name.localeCompare(b.tool.name);
    }
  });

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Enhanced Prompts</h2>
          <p className="text-slate-400">AI-optimized versions of your prompt for different tools</p>
          <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
            <span>{results.length} enhanced prompts generated</span>
            <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
            <span>{favorites.size} favorites</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'tool' | 'length' | 'recent')}
            className="px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="tool">Sort by Tool</option>
            <option value="length">Sort by Length</option>
            <option value="recent">Sort by Recent</option>
          </select>
          
          <button
            onClick={onRegenerate}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-200"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Regenerate</span>
          </button>
          
          <button
            onClick={exportResults}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200"
          >
            <Download className="h-4 w-4" />
            <span>Export All</span>
          </button>
        </div>
      </div>

      <div className="mb-8 p-6 bg-slate-800/30 border border-slate-600 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-slate-300">Original Prompt</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => copyToClipboard(originalPrompt, 'original')}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button
              onClick={() => sharePrompt(originalPrompt)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <p className="text-white leading-relaxed">{originalPrompt}</p>
        <div className="mt-3 text-sm text-slate-500">
          {originalPrompt.length} characters • Generated {results.length} enhanced versions
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedResults.map((result) => {
          const Icon = Icons[result.tool.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
          const isCopied = copiedId === result.id;
          const isFavorite = favorites.has(result.id);
          const isExpanded = expandedCards.has(result.id);
          const isLongPrompt = result.enhanced.length > 500;

          return (
            <div
              key={result.id}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${result.tool.color} shadow-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{result.tool.name}</h3>
                      <p className="text-xs text-slate-400">{result.enhancementType}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleFavorite(result.id)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        isFavorite
                          ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                          : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50 hover:text-yellow-400'
                      }`}
                    >
                      <Star className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    
                    <button
                      onClick={() => sharePrompt(result.enhanced)}
                      className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-600/50 hover:text-blue-400 transition-all duration-200"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => copyToClipboard(result.enhanced, result.id)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        isCopied
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50 hover:text-white'
                      }`}
                    >
                      {isCopied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className={`text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-900/30 p-4 rounded-lg border border-slate-700/50 ${
                    isLongPrompt && !isExpanded ? 'max-h-32 overflow-hidden' : ''
                  }`}>
                    {result.enhanced}
                  </div>
                  
                  {isLongPrompt && (
                    <div className="mt-2">
                      <button
                        onClick={() => toggleExpanded(result.id)}
                        className="flex items-center space-x-1 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-4 w-4" />
                            <span>Show less</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            <span>Show more</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center space-x-4">
                    <span>Enhanced for {result.tool.name}</span>
                    <span>{result.enhanced.length} characters</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isFavorite && <Bookmark className="h-3 w-3 text-yellow-400" />}
                    <span>{result.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {favorites.size > 0 && (
        <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <div className="flex items-center space-x-2 text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">
              You have {favorites.size} favorite{favorites.size !== 1 ? 's' : ''} saved
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptResults;