
import React from 'react';

interface HeroProps {
  onShopNow: () => void;
}

const images = [
  { src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600", size: "large", anim: "animate-float" },
  { src: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=600", size: "medium", anim: "animate-float-delayed" },
  { src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=600", size: "small", anim: "animate-float-slow" },
  { src: "https://images.unsplash.com/photo-1518005020410-d988417619d8?auto=format&fit=crop&q=80&w=600", size: "medium", anim: "animate-float" },
  { src: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=600", size: "large", anim: "animate-float-slow" },
  { src: "https://images.unsplash.com/photo-1516515429572-11910609363a?auto=format&fit=crop&q=80&w=600", size: "small", anim: "animate-float-delayed" }
];

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <div className="relative pt-32 pb-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h1 className="reveal-item text-6xl md:text-8xl lg:text-9xl font-black text-black leading-tight mb-8 tracking-tighter uppercase">
          Welcome to the<br/>
          nonameverse
        </h1>
        
        <p className="reveal-item [animation-delay:200ms] text-gray-500 text-sm md:text-base max-w-2xl mx-auto mb-12 font-medium">
          L'essence du football capturée dans des pièces uniques. Rejoignez le mouvement No Name et portez l'héritage du jeu.
        </p>
        
        <div className="reveal-item [animation-delay:400ms] flex flex-wrap justify-center gap-4 mb-24">
          <button 
            onClick={onShopNow}
            className="bg-black text-white px-10 py-4 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-[#F26722] transition-all transform hover:scale-105 active:scale-95 group shadow-2xl"
          >
            Découvrir la Boutique
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <button 
            className="bg-gray-100 text-black px-10 py-4 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-black hover:text-white transition-all transform hover:scale-105 active:scale-95 group"
          >
            Le Collectif
          </button>
        </div>
      </div>

      {/* Mosaïque Dynamique Flottante */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {images.map((img, i) => (
            <div 
              key={i}
              className={`reveal-item relative group ${img.anim}`}
              style={{ animationDelay: `${600 + (i * 150)}ms` }}
            >
              <div className={`
                overflow-hidden rounded-2xl shadow-xl transition-all duration-700 
                group-hover:shadow-2xl group-hover:scale-[1.03] group-hover:rotate-1
                ${img.size === 'large' ? 'aspect-[3/4]' : img.size === 'medium' ? 'aspect-square' : 'aspect-[4/3]'}
              `}>
                <img 
                  src={img.src} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt={`Collection NN ${i}`} 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                
                {/* Badge au survol */}
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white/90 backdrop-blur text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                    Shop now
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Décorations d'arrière-plan subtiles */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#F26722]/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#243763]/5 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default Hero;
