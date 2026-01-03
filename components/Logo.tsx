import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'color';
}

const Logo: React.FC<LogoProps> = ({ className = "h-10", variant = 'color' }) => {
  const isLight = variant === 'light';
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative group">
        <div 
          className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl transition-transform group-hover:rotate-12 ${
            isLight ? 'bg-white text-[#243763]' : 'bg-[#243763] text-white shadow-lg shadow-navy/20'
          }`}
        >
          N
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#F26722] rounded-full border-2 border-white"></div>
      </div>
      
      <div className="flex flex-col">
        <span className={`text-2xl font-black tracking-tighter uppercase leading-none ${isLight ? 'text-white' : 'text-[#243763]'}`}>
          No Name
        </span>
        <span className={`text-[9px] font-black tracking-[0.3em] uppercase leading-none mt-1 ${isLight ? 'text-white/60' : 'text-[#F26722]'}`}>
          Elite Collective
        </span>
      </div>
    </div>
  );
};

export default Logo;