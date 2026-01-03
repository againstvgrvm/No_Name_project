
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'color';
}

const Logo: React.FC<LogoProps> = ({ className = "h-10", variant = 'color' }) => {
  const isLight = variant === 'light';
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* 
        Si l'image logo_no_name.jpg est absente, on affiche un logo typographique 
        robuste qui respecte l'identité No Name.
      */}
      <div className="flex flex-col justify-center items-start">
        <div className="flex items-center gap-1.5">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center font-black text-white"
            style={{ backgroundColor: isLight ? '#FFFFFF' : '#243763', color: isLight ? '#243763' : '#FFFFFF' }}
          >
            N
          </div>
          <span className={`text-2xl font-black tracking-tighter uppercase leading-none ${isLight ? 'text-white' : 'text-[#243763]'}`}>
            No Name
          </span>
        </div>
        <span className={`text-[8px] font-bold tracking-[0.4em] uppercase leading-none mt-1 ${isLight ? 'text-white/70' : 'text-[#F26722]'}`}>
          Football Collective
        </span>
      </div>
    </div>
  );
};

export default Logo;
