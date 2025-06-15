import React, { useState } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import ToolSelector from './components/ToolSelector';
import PromptResults from './components/PromptResults';
import PromptModal from './components/PromptModal';
import { PromptTool, EnhancedPrompt } from './types';
import { promptTools } from './data/tools';
import { enhancePrompt } from './utils/promptEnhancer';

function App() {
  const [selectedTools, setSelectedTools] = useState<PromptTool[]>([promptTools[0], promptTools[1]]);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [results, setResults] = useState<EnhancedPrompt[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleToolToggle = (tool: PromptTool) => {
    setSelectedTools(prev => {
      const isSelected = prev.some(t => t.id === tool.id);
      if (isSelected) {
        return prev.filter(t => t.id !== tool.id);
      } else {
        return [...prev, tool];
      }
    });
  };

  const handlePromptSubmit = async (prompt: string) => {
    if (selectedTools.length === 0) {
      alert('Please select at least one AI tool to enhance your prompt for.');
      return;
    }

    setCurrentPrompt(prompt);
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const enhancedPrompts: EnhancedPrompt[] = [];
    
    selectedTools.forEach(tool => {
      const enhanced = enhancePrompt(prompt, tool);
      enhanced.forEach((enhancedText, index) => {
        enhancedPrompts.push({
          id: `${tool.id}-${index}-${Date.now()}`,
          original: prompt,
          enhanced: enhancedText,
          tool,
          enhancementType: `Strategy ${index + 1}`,
          timestamp: new Date()
        });
      });
    });
    
    setResults(enhancedPrompts);
    setIsLoading(false);
    setShowModal(true); // Show modal when results are ready
  };

  const handleRegenerate = () => {
    if (currentPrompt) {
      setShowModal(false); // Close modal first
      handlePromptSubmit(currentPrompt);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-cyan-900 to-teal-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%2300D4FF%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <Header />
      
      <main className="relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          <section>
            <PromptInput onSubmit={handlePromptSubmit} isLoading={isLoading} />
          </section>

          <section>
            <ToolSelector
              selectedTools={selectedTools}
              onToolToggle={handleToolToggle}
            />
          </section>

          {isLoading && (
            <section>
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full mb-6 shadow-2xl">
                  <div className="animate-spin rounded-full h-10 w-10 border-3 border-white border-t-transparent"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">✨ Enhancing Your Prompt</h3>
                <p className="text-cyan-300 text-lg">AI is applying proven prompt engineering techniques...</p>
                <div className="mt-6 flex justify-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce animation-delay-200"></div>
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce animation-delay-400"></div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {results.length > 0 && !showModal && (
            <section>
              <PromptResults
                results={results}
                originalPrompt={currentPrompt}
                onRegenerate={handleRegenerate}
              />
            </section>
          )}
        </div>
      </main>

      {/* Modal for displaying results */}
      <PromptModal
        isOpen={showModal}
        onClose={handleCloseModal}
        results={results}
        originalPrompt={currentPrompt}
        onRegenerate={handleRegenerate}
      />

      <footer className="relative border-t border-cyan-500/20 bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-cyan-300 text-sm">
              Built with 💙 using modern web technologies • Powered by AI prompt engineering
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;