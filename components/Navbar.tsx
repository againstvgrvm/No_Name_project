
import React from 'react';
import { ShoppingBag, User, Search } from 'lucide-react';
import { View } from '../types';
import Logo from './Logo';

interface NavbarProps {
  onNavigate: (view: View) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, cartCount, onOpenCart }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo à gauche comme sur 2fam.shop */}
        <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
          <Logo className="h-10" />
        </div>

        {/* Navigation centrale discrète */}
        <div className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => onNavigate('shop')} 
            className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-[#243763] transition-colors"
          >
            La Boutique
          </button>
          <button 
            onClick={() => onNavigate('ai-stylist')} 
            className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-[#F26722] transition-colors"
          >
            Styliste IA
          </button>
        </div>

        {/* Actions à droite */}
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-black transition-colors">
            <Search size={20} strokeWidth={2} />
          </button>
          <button className="hidden sm:block text-gray-400 hover:text-black transition-colors">
            <User size={20} strokeWidth={2} />
          </button>
          <button 
            onClick={onOpenCart}
            className="group flex items-center gap-2 bg-[#243763] text-white px-4 py-2 rounded-full hover:bg-[#F26722] transition-all"
          >
            <ShoppingBag size={18} strokeWidth={2} />
            <span className="text-xs font-black uppercase tracking-widest">{cartCount}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
