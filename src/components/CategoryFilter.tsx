import React from 'react';
import { Category } from '../types';
import { CATEGORIES } from '../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CategoryFilterProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ selected, onSelect }) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-4 px-6 md:px-12 no-scrollbar">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
            selected === category
              ? "bg-ink text-white shadow-lg"
              : "bg-white border border-ink/10 hover:border-ink/30"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
