
import React from 'react';

interface HeroProps {
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-[#F8F9FA]">
      {/* Éléments de fond */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#F26722]/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#243763]/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 text-center z-10">
        <div className="inline-block mb-6 px-4 py-1.5 bg-[#243763]/5 rounded-full border border-[#243763]/10">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#243763]">
            Nouvelle Collection No Name 24/25
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-[#243763] leading-[0.9] mb-10 tracking-tighter uppercase">
          Plus qu'un <br/>
          <span className="text-[#F26722]">Maillot</span>
        </h1>
        
        <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto mb-12 font-medium leading-relaxed">
          Inspiré par le bitume, conçu pour le terrain. Rejoignez le collectif No Name et portez l'héritage du football moderne.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={onShopNow}
            className="bg-[#243763] text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#F26722] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-navy/20"
          >
            Découvrir le shop
          </button>
          <button 
            className="bg-white text-[#243763] border-2 border-[#243763] px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#243763] hover:text-white transition-all transform hover:scale-105"
          >
            Le Manifeste
          </button>
        </div>
      </div>

      {/* Images flottantes sur les côtés pour un effet premium */}
      <div className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl rotate-[-6deg] animate-float">
         <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Jersey 1" />
      </div>
      <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl rotate-[6deg] animate-float" style={{ animationDelay: '1s' }}>
         <img src="https://images.unsplash.com/photo-1580087442627-6cbd6afdfbec?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Jersey 2" />
      </div>
    </div>
  );
};

export default Hero;
