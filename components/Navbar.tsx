
import React from 'react';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';
import { View } from '../types';
import Logo from './Logo';

interface NavbarProps {
  onNavigate: (view: View) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, cartCount, onOpenCart }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo at the same place as 2fam.shop (Left) */}
        <div className="flex-shrink-0">
          <button 
            onClick={() => onNavigate('home')} 
            className="group transition-all hover:opacity-80 active:scale-95"
          >
            <Logo className="h-10 sm:h-12" />
          </button>
        </div>

        {/* Navigation and Icons shifted to the right like 2fam.shop */}
        <div className="flex items-center gap-10">
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => onNavigate('shop')} 
              className="text-sm font-medium text-black hover:text-[#F26722] transition-colors"
            >
              Vêtements
            </button>
            <button 
              onClick={() => onNavigate('ai-stylist')} 
              className="text-sm font-medium text-black hover:text-[#F26722] transition-colors"
            >
              Styliste IA
            </button>
            <button className="text-sm font-medium text-black hover:text-[#F26722] transition-colors">
              À propos
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block p-2 text-gray-800 hover:text-black">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button 
              onClick={onOpenCart}
              className="flex items-center gap-2 text-black hover:text-[#F26722] transition-colors"
            >
              <span className="text-sm font-bold">{cartCount} CFA</span>
              <ShoppingBag size={20} strokeWidth={1.5} />
            </button>
            <button className="md:hidden p-2">
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
