import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ImageCard } from './components/ImageCard';
import { WallpaperModal } from './components/WallpaperModal';
import { AISection } from './components/AISection';
import { ImageUpload } from './components/ImageUpload';
import { INITIAL_WALLPAPERS } from './constants';
import { Wallpaper, Category } from './types';
import { Github, Twitter, Instagram, Heart } from 'lucide-react';

export default function App() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>(INITIAL_WALLPAPERS);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);

  const filteredWallpapers = useMemo(() => {
    if (selectedCategory === 'All') return wallpapers;
    return wallpapers.filter(w => w.category === selectedCategory);
  }, [wallpapers, selectedCategory]);

  const handleAIGenerated = (newWallpaper: Wallpaper) => {
    setWallpapers(prev => [newWallpaper, ...prev]);
    setSelectedWallpaper(newWallpaper);
  };

  const handleUserUpload = (newWallpaper: Wallpaper) => {
    setWallpapers(prev => [newWallpaper, ...prev]);
    setSelectedWallpaper(newWallpaper);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <div className="sticky top-16 z-40 bg-bg/80 backdrop-blur-md py-4">
          <CategoryFilter 
            selected={selectedCategory} 
            onSelect={setSelectedCategory} 
          />
        </div>

        <section className="px-6 md:px-12 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredWallpapers.map((wallpaper) => (
                <ImageCard 
                  key={wallpaper.id} 
                  wallpaper={wallpaper} 
                  onClick={setSelectedWallpaper}
                />
              ))}
            </AnimatePresence>
          </div>
          
          {filteredWallpapers.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-ink/40 font-medium">No wallpapers found in this category.</p>
            </div>
          )}
        </section>

        <AISection onGenerated={handleAIGenerated} />
        <ImageUpload onUpload={handleUserUpload} />
      </main>

      <footer className="bg-white border-t border-ink/5 px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-ink rounded flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">W</span>
              </div>
              <span className="font-display font-bold text-lg">WallCraft</span>
            </div>
            <p className="text-sm text-ink/40 max-w-xs text-center md:text-left">
              The ultimate destination for high-quality wallpapers and AI-driven creativity.
            </p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="p-2 hover:bg-black/5 rounded-full transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="p-2 hover:bg-black/5 rounded-full transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="p-2 hover:bg-black/5 rounded-full transition-colors"><Github className="w-5 h-5" /></a>
          </div>

          <div className="flex items-center gap-2 text-sm text-ink/40">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-accent fill-accent" />
            <span>by WallCraft Team</span>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-ink/5 text-center text-[10px] uppercase tracking-widest text-ink/20 font-bold">
          © 2024 WallCraft. All rights reserved.
        </div>
      </footer>

      <WallpaperModal 
        wallpaper={selectedWallpaper} 
        onClose={() => setSelectedWallpaper(null)} 
      />
    </div>
  );
}
