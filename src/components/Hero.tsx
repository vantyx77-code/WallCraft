import React from 'react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-16 px-6 md:px-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
          Craft Your <span className="italic text-accent">Digital</span> Space
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-ink/60 mb-8">
          Discover a curated collection of high-resolution wallpapers or use our AI to generate a unique masterpiece for your screen.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-3 bg-ink text-white rounded-full font-medium hover:scale-105 transition-transform">
            Browse Gallery
          </button>
          <button className="px-8 py-3 border border-ink/20 rounded-full font-medium hover:bg-ink/5 transition-all">
            Try AI Generator
          </button>
        </div>
      </motion.div>
    </section>
  );
};
