
import React from 'react';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';
import { View } from '../types';

interface NavbarProps {
  onNavigate: (view: View) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, cartCount, onOpenCart }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 group">
            <div className="bg-[#F26722] p-2 rounded transition-transform group-hover:rotate-12">
               <span className="font-black text-white text-lg">NN</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-black">NO NAME</span>
          </button>
          
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => onNavigate('shop')} className="text-sm font-bold uppercase tracking-widest hover:text-[#F26722] transition-colors">Boutique</button>
            <button onClick={() => onNavigate('ai-stylist')} className="text-sm font-bold uppercase tracking-widest hover:text-[#F26722] transition-colors">Styliste IA</button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search size={20} strokeWidth={2.5} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <User size={20} strokeWidth={2.5} />
          </button>
          <button 
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#243763] text-white px-4 py-2 rounded-full hover:bg-[#F26722] transition-all transform active:scale-95"
          >
            <ShoppingBag size={18} strokeWidth={2.5} />
            <span className="font-bold text-sm">{cartCount}</span>
          </button>
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
