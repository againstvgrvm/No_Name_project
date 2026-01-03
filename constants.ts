
import { Product } from './types';

export const COLORS = {
  primary: '#F26722',   // Orange vibrant du logo
  secondary: '#243763', // Navy profond du logo
  accent: '#000000',    // Noir pour le contraste
  background: '#F8F9FA', // Gris très clair pour le fond
  white: '#FFFFFF'
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Maillot "No Name" Domicile 24/25',
    category: 'Clubs',
    price: 89,
    image: 'https://images.unsplash.com/photo-1580087442627-6cbd6afdfbec?auto=format&fit=crop&q=80&w=800',
    description: 'Le maillot officiel de la collection No Name, alliant performance et style urbain.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Orange/Navy'],
    isNew: true
  },
  {
    id: '2',
    name: 'Édition Collector "Vintage 98"',
    category: 'Retro',
    price: 110,
    image: 'https://images.unsplash.com/photo-1622142514603-9e0c7050012f?auto=format&fit=crop&q=80&w=800',
    description: 'Un hommage aux légendes du football avec une finition premium.',
    sizes: ['M', 'L', 'XL'],
    colors: ['Bleu Classique'],
  },
  {
    id: '3',
    name: 'Veste de Pluie Training Elite',
    category: 'Training',
    price: 75,
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800',
    description: 'Conçue pour l\'entraînement intensif sous toutes les conditions.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy'],
  },
  {
    id: '4',
    name: 'Maillot National "Héritage"',
    category: 'National',
    price: 95,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    description: 'Les couleurs de la nation, portées avec fierté.',
    sizes: ['S', 'M', 'L'],
    colors: ['Blanc/Orange'],
    isNew: true
  },
  {
    id: '5',
    name: 'Jersey Street "Dark Mode"',
    category: 'Retro',
    price: 125,
    image: 'https://images.unsplash.com/photo-1516515429572-11910609363a?auto=format&fit=crop&q=80&w=800',
    description: 'L\'élégance du noir pour briller sur le bitume.',
    sizes: ['M', 'L'],
    colors: ['Noir'],
  },
  {
    id: '6',
    name: 'Maillot Training "Flash"',
    category: 'Training',
    price: 45,
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800',
    description: 'Léger, respirant, indispensable.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Orange'],
  }
];
