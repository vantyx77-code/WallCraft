export interface Wallpaper {
  id: string;
  url: string;
  title: string;
  category: string;
  author: string;
  dimensions: string;
  isAI?: boolean;
}

export type Category = 'All' | 'Nature' | 'Abstract' | 'Minimal' | 'Architecture' | 'Space' | 'AI Generated' | 'Anime' | 'User Uploads';
