import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Loader2, Wand2 } from 'lucide-react';
import { generateWallpaper } from '../services/geminiService';
import { Wallpaper } from '../types';

interface AISectionProps {
  onGenerated: (wallpaper: Wallpaper) => void;
}

export const AISection: React.FC<AISectionProps> = ({ onGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    const imageUrl = await generateWallpaper(prompt);
    
    if (imageUrl) {
      const newWallpaper: Wallpaper = {
        id: `ai-${Date.now()}`,
        url: imageUrl,
        title: prompt.length > 20 ? prompt.substring(0, 20) + '...' : prompt,
        category: 'AI Generated',
        author: 'AI Artist',
        dimensions: '1920x1080',
        isAI: true
      };
      onGenerated(newWallpaper);
      setPrompt('');
    }
    setIsGenerating(false);
  };

  return (
    <section className="px-6 md:px-12 py-24">
      <div className="max-w-5xl mx-auto bg-ink rounded-[40px] p-8 md:p-16 text-white relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Can't find what you're looking for?
          </h2>
          <p className="text-white/60 text-lg mb-12 max-w-xl">
            Describe your dream wallpaper and let our AI bring it to life in seconds.
          </p>

          <div className="w-full max-w-2xl flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A futuristic city with neon lights and flying cars..."
              className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="px-8 py-4 bg-white text-ink rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
