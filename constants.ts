
import { Product } from './types';

export const COLORS = {
  primary: '#F26722', // The vibrant orange from the jersey
  secondary: '#243763', // The deep navy from the collar
  accent: '#000000',    // Black from the text
  background: '#F1F1F1', // Light grey from the logo backdrop
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Maillot Authentique NN Home',
    category: 'Clubs',
    price: 85,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    description: 'Le maillot domicile officiel arborant les couleurs iconiques de la marque NO NAME.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Orange/Navy'],
    isNew: true
  },
  {
    id: '2',
    name: 'Kit Retro France 1998',
    category: 'Retro',
    price: 95,
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800',
    description: 'Une édition légendaire pour les passionnés d’histoire du football.',
    sizes: ['M', 'L', 'XL'],
    colors: ['Bleu'],
  },
  {
    id: '3',
    name: 'Maillot Entraînement Elite',
    category: 'Training',
    price: 45,
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800',
    description: 'Technologie respirante pour des performances optimales sur le terrain.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gris/Orange'],
  },
  {
    id: '4',
    name: 'Maillot National Team 2024',
    category: 'National',
    price: 90,
    image: 'https://images.unsplash.com/photo-1518005020410-d988417619d8?auto=format&fit=crop&q=80&w=800',
    description: 'Portez haut les couleurs de votre nation avec ce maillot officiel.',
    sizes: ['S', 'M', 'L'],
    colors: ['Blanc/Bleu'],
    isNew: true
  },
  {
    id: '5',
    name: 'Jersey Urban Street NN',
    category: 'Retro',
    price: 120,
    image: 'https://images.unsplash.com/photo-1516515429572-11910609363a?auto=format&fit=crop&q=80&w=800',
    description: 'Un mélange parfait entre style urbain et passion footballistique.',
    sizes: ['M', 'L'],
    colors: ['Noir/Gris'],
  },
  {
    id: '6',
    name: 'Maillot Vintage South America',
    category: 'Retro',
    price: 110,
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800',
    description: 'Le classique du football sud-américain revisité.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Jaune/Vert'],
  }
];
