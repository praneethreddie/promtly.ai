import React from 'react';
import { Sparkles, Github, Heart, Star, Zap, Rocket } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-cyan-900 to-teal-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-60 h-60 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-2xl opacity-60 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 p-5 rounded-full shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-12 w-12 text-white animate-spin-slow" />
              </div>
            </div>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-8 tracking-tight leading-none">
            Promtly.AI
          </h1>
          
          <div className="flex items-center justify-center mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
            <Zap className="h-6 w-6 text-yellow-400 mx-4 animate-pulse" />
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          
          <p className="text-2xl md:text-3xl text-cyan-100 mb-10 max-w-5xl mx-auto leading-relaxed font-light">
            Transform your prompts with <span className="font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">AI-powered enhancement</span> using proven prompt engineering techniques from industry leaders
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-cyan-300 mb-12">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30">
              <Heart className="h-5 w-5 text-pink-400 animate-pulse" />
              <span className="text-sm font-medium">Built with passion</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/30">
              <Github className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium">Open Source</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/30">
              <Rocket className="h-5 w-5 text-purple-400" />
              <span className="text-sm font-medium">50+ AI Tools Supported</span>
            </div>
          </div>

          {/* Enhanced stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="group bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="text-4xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-2">50+</div>
              <div className="text-cyan-300 font-medium">AI Tools</div>
              <div className="w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="text-4xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-2">7</div>
              <div className="text-blue-300 font-medium">Categories</div>
              <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="text-4xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">∞</div>
              <div className="text-purple-300 font-medium">Possibilities</div>
              <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
    </header>
  );
};

export default Header;