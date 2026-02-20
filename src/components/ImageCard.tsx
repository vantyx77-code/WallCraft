import React from 'react';
import { motion } from 'motion/react';
import { Download, Maximize2 } from 'lucide-react';
import { Wallpaper } from '../types';

interface ImageCardProps {
  wallpaper: Wallpaper;
  onClick: (wallpaper: Wallpaper) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ wallpaper, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative aspect-[16/9] overflow-hidden rounded-2xl bg-black/5 cursor-pointer"
      onClick={() => onClick(wallpaper)}
    >
      <img
        src={wallpaper.url}
        alt={wallpaper.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <div className="flex items-center justify-between text-white">
          <div>
            <h3 className="font-display font-bold text-xl">{wallpaper.title}</h3>
            <p className="text-sm text-white/70">by {wallpaper.author}</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors">
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {wallpaper.isAI && (
        <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
          AI Generated
        </div>
      )}
    </motion.div>
  );
};
