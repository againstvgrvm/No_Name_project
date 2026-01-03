
export interface Product {
  id: string;
  name: string;
  category: 'Clubs' | 'National' | 'Retro' | 'Training';
  price: number;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export type View = 'home' | 'shop' | 'product' | 'ai-stylist';
