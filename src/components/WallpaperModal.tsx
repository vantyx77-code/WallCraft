import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Share2, Info } from 'lucide-react';
import { Wallpaper } from '../types';

interface WallpaperModalProps {
  wallpaper: Wallpaper | null;
  onClose: () => void;
}

export const WallpaperModal: React.FC<WallpaperModalProps> = ({ wallpaper, onClose }) => {
  if (!wallpaper) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-ink/90 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-6xl bg-bg rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex-1 bg-black flex items-center justify-center min-h-[300px]">
            <img
              src={wallpaper.url}
              alt={wallpaper.title}
              className="max-w-full max-h-[80vh] object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="w-full md:w-80 p-8 flex flex-col gap-8">
            <div>
              <h2 className="font-display text-3xl font-bold mb-2">{wallpaper.title}</h2>
              <p className="text-ink/60">Uploaded by <span className="text-ink font-medium">{wallpaper.author}</span></p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-black/5 rounded-2xl">
                <p className="text-[10px] uppercase tracking-wider text-ink/40 font-bold mb-1">Dimensions</p>
                <p className="font-mono text-sm">{wallpaper.dimensions}</p>
              </div>
              <div className="p-4 bg-black/5 rounded-2xl">
                <p className="text-[10px] uppercase tracking-wider text-ink/40 font-bold mb-1">Category</p>
                <p className="font-medium text-sm">{wallpaper.category}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-auto">
              <button className="w-full py-4 bg-ink text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                <Download className="w-5 h-5" />
                Download Original
              </button>
              <div className="flex gap-3">
                <button className="flex-1 py-3 border border-ink/10 rounded-2xl flex items-center justify-center gap-2 hover:bg-ink/5 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="p-3 border border-ink/10 rounded-2xl hover:bg-ink/5 transition-colors">
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
