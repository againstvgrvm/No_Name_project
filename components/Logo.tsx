
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'color';
}

const Logo: React.FC<LogoProps> = ({ className = "h-12", variant = 'color' }) => {
  // We use the image provided by the user. 
  // The 'variant' prop could be used to apply CSS filters (like brightness/invert) 
  // if a white version of the logo isn't available.
  
  const filterStyle = variant === 'light' ? 'brightness(0) invert(1)' : 'none';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-full aspect-square relative overflow-hidden rounded-lg">
        <img 
          src="logo_no_name.jpg" 
          alt="No Name Logo" 
          className="h-full w-full object-contain"
          style={{ filter: filterStyle }}
          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      {/* 
        The logo image already contains the text "NO NAME", 
        but we keep a subtle high-quality typography next to it 
        for UI consistency if it's used in the Navbar.
      */}
      <div className="hidden sm:flex flex-col leading-none">
        <span 
          className={`text-lg font-black tracking-tighter uppercase ${variant === 'light' ? 'text-white' : 'text-[#243763]'}`}
        >
          No Name
        </span>
        <span 
          className={`text-[9px] font-bold tracking-[0.3em] uppercase ${variant === 'light' ? 'text-white/80' : 'text-[#F26722]'}`}
        >
          Football Collective
        </span>
      </div>
    </div>
  );
};

export default Logo;
