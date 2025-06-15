import React, { useState } from 'react';
import { PromptTool } from '../types';
import { promptTools } from '../data/tools';
import * as Icons from 'lucide-react';
import { Search, Filter, X } from 'lucide-react';

interface ToolSelectorProps {
  selectedTools: PromptTool[];
  onToolToggle: (tool: PromptTool) => void;
}

const ToolSelector: React.FC<ToolSelectorProps> = ({ selectedTools, onToolToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = {
    text: promptTools.filter(tool => tool.category === 'text'),
    image: promptTools.filter(tool => tool.category === 'image'),
    video: promptTools.filter(tool => tool.category === 'video'),
    audio: promptTools.filter(tool => tool.category === 'audio'),
    code: promptTools.filter(tool => tool.category === 'code'),
    development: promptTools.filter(tool => tool.category === 'development'),
    automation: promptTools.filter(tool => tool.category === 'automation'),
  };

  const categoryLabels = {
    text: 'Text Generation & Writing',
    image: 'Image Generation & Design',
    video: 'Video Generation & Editing',
    audio: 'Audio & Voice Synthesis',
    code: 'Code Generation & Programming',
    development: 'Development Platforms',
    automation: 'Automation & Workflows'
  };

  const categoryIcons = {
    text: 'FileText',
    image: 'Image',
    video: 'Video',
    audio: 'Headphones',
    code: 'Code',
    development: 'Zap',
    automation: 'Settings'
  };

  const filteredTools = promptTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  const renderTool = (tool: PromptTool) => {
    const Icon = Icons[tool.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
    const isSelected = selectedTools.some(t => t.id === tool.id);

    return (
      <button
        key={tool.id}
        onClick={() => onToolToggle(tool)}
        className={`group relative p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${
          isSelected
            ? 'border-purple-400 bg-purple-500/20 shadow-lg shadow-purple-500/25'
            : 'border-slate-600 bg-slate-800/30 hover:border-slate-500 hover:bg-slate-700/40'
        }`}
      >
        <div className="flex items-center space-x-3 mb-2">
          <div className={`p-2 rounded-lg ${tool.color} ${isSelected ? 'shadow-lg' : ''} transition-all duration-200`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-semibold text-white text-left">{tool.name}</h3>
        </div>
        <p className="text-sm text-slate-400 text-left leading-relaxed">
          {tool.description}
        </p>
        
        {isSelected && (
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl pointer-events-none"></div>
      </button>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Choose Your AI Tools</h2>
        <p className="text-slate-400 text-lg">Select the tools you want to optimize your prompts for</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
          <span>{promptTools.length} AI tools available</span>
          <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
          <span>Multiple categories supported</span>
          <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
          <span>{selectedTools.length} selected</span>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search AI tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none"
              >
                <option value="all">All Categories</option>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-all duration-200"
              >
                <X className="h-4 w-4" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {filteredTools.length !== promptTools.length && (
          <div className="text-sm text-slate-400">
            Showing {filteredTools.length} of {promptTools.length} tools
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedCategory !== 'all' && ` in ${categoryLabels[selectedCategory as keyof typeof categoryLabels]}`}
          </div>
        )}
      </div>

      {/* Tools Grid */}
      {selectedCategory === 'all' ? (
        <div className="space-y-12">
          {Object.entries(categories).map(([category, tools]) => {
            const categoryTools = tools.filter(tool => filteredTools.includes(tool));
            if (categoryTools.length === 0) return null;
            
            const CategoryIcon = Icons[categoryIcons[category as keyof typeof categoryIcons] as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            
            return (
              <div key={category}>
                <div className="flex items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <CategoryIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </h3>
                      <p className="text-sm text-slate-400">{categoryTools.length} tools available</p>
                    </div>
                  </div>
                  <div className="flex-1 ml-6 h-px bg-gradient-to-r from-slate-600 to-transparent"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categoryTools.map(renderTool)}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTools.map(renderTool)}
        </div>
      )}

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">No tools found matching your criteria</div>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}

      {selectedTools.length > 0 && (
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
            <div>
              <h4 className="text-lg font-semibold text-blue-300 mb-1">Selected Tools</h4>
              <p className="text-blue-400">
                {selectedTools.length} tool{selectedTools.length !== 1 ? 's' : ''} selected for prompt enhancement
              </p>
            </div>
            <div className="flex -space-x-2">
              {selectedTools.slice(0, 8).map((tool, index) => {
                const Icon = Icons[tool.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                return (
                  <div
                    key={tool.id}
                    className={`p-2 rounded-full border-2 border-slate-700 ${tool.color} shadow-lg`}
                    style={{ zIndex: selectedTools.length - index }}
                    title={tool.name}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                );
              })}
              {selectedTools.length > 8 && (
                <div className="flex items-center justify-center w-10 h-10 bg-slate-600 rounded-full border-2 border-slate-700 text-xs text-white font-medium shadow-lg">
                  +{selectedTools.length - 8}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedTools.map(tool => (
              <span
                key={tool.id}
                className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm border border-slate-600 flex items-center space-x-2"
              >
                <span>{tool.name}</span>
                <button
                  onClick={() => onToolToggle(tool)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolSelector;