
import React from 'react';

interface HeroProps {
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <div className="relative pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Main Heading styled like 2fam.shop */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-black leading-tight mb-8 tracking-tighter">
          Welcome to the<br/>
          nonameverse
        </h1>
        
        {/* Subtext */}
        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mb-12 font-medium">
          Vous trouverez ici des maillots d'exception pour performer sur le terrain et des articles pour combiner vos meilleurs outfits.
        </p>
        
        {/* Pill buttons like 2fam.shop */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          <button 
            onClick={onShopNow}
            className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-[#F26722] transition-all group"
          >
            Boutique
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <button 
            className="bg-[#D1D5DB] text-black px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-black hover:text-white transition-all group"
          >
            Concept
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Image Grid inspired by 2fam.shop bottom gallery */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1518005020410-d988417619d8?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=400"
          ].map((src, i) => (
            <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
              <img src={src} className="w-full h-full object-cover" alt={`Lookbook ${i}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
