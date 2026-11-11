export type MarketplacePlatform = 'shopee' | 'tokopedia' | 'tiktok';

export interface MarketplaceLink {
  platform: MarketplacePlatform;
  name: string;
  url: string;
  price?: number;
  isPrimary?: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'Tops' | 'Shirt' | 'Bottoms' | 'Footwear' | 'Outerwear' | 'Accessories';
  brand: string;
  color: string;
  wornSize: string;
  availableSizes?: string[];
  price: number;
  description: string;
  details?: string[];
  marketplaceLinks: MarketplaceLink[];
  imageUrl?: string;
}

export interface Look {
  id: string;
  slug: string;
  indexFormatted: string; // "01", "02", etc.
  title: string;
  subtitle: string;
  category: 'Casual' | 'Streetwear' | 'Minimal' | 'Smart Casual' | 'Chic' | 'Others';
  season?: string;
  year?: string;
  description: string;
  modelImage: string;
  modelImageWidth: number;
  modelImageHeight: number;
  accentColor?: string;
  moodTrack?: {
    title: string;
    artist: string;
  };
  items: ProductItem[];
}

export type CategoryFilter = 'All Looks' | 'Casual' | 'Streetwear' | 'Smart Casual' | 'Minimal' | 'Chic' | 'Others';
