import React from 'react';
import { Search, Image as ImageIcon, Sparkles, Menu } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass h-16 flex items-center px-6 md:px-12 justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center">
          <ImageIcon className="text-white w-5 h-5" />
        </div>
        <span className="font-display font-bold text-xl tracking-tight">WallCraft</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#" className="hover:text-accent transition-colors">Explore</a>
        <a href="#" className="hover:text-accent transition-colors">Categories</a>
        <a href="#" className="hover:text-accent transition-colors">About</a>
        <button className="flex items-center gap-2 bg-ink text-white px-4 py-2 rounded-full hover:bg-ink/90 transition-all">
          <Sparkles className="w-4 h-4" />
          <span>Generate AI</span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors">
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};
