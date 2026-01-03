
import React from 'react';

interface HeroProps {
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <div className="relative h-[85vh] overflow-hidden bg-[#E5E5E5]">
      {/* Background with abstract orange/navy shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[140%] bg-[#F26722]/10 rotate-12 blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[120%] bg-[#243763]/10 -rotate-12 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <span className="inline-block bg-[#F26722] text-white px-4 py-1 font-black text-xs uppercase tracking-widest mb-6 rounded">
            Nouvelle Collection 2024
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-black leading-none uppercase mb-8 tracking-tighter">
            NO NAME<br/>
            <span className="text-transparent border-t-2 border-b-2 border-black inline-block py-2">FOOTBALL</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-medium mb-10 max-w-xl">
            L'esthétique brute du football. Des maillots conçus pour ceux qui laissent leur talent parler pour eux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onShopNow}
              className="bg-black text-white px-10 py-5 font-bold uppercase tracking-widest hover:bg-[#F26722] transition-all transform hover:-translate-y-1"
            >
              Découvrir la boutique
            </button>
            <button className="border-2 border-black text-black px-10 py-5 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all transform hover:-translate-y-1">
              Notre concept
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 hidden xl:block">
        <div className="relative">
           <div className="w-80 h-96 bg-gray-300 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800" 
                alt="Maillot Vintage" 
                className="w-full h-full object-cover"
              />
           </div>
           <div className="absolute -bottom-4 -left-4 bg-[#F26722] text-white p-6 rounded-lg shadow-xl">
              <p className="font-black text-2xl uppercase italic">VINTAGE<br/>COLLECTION</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
