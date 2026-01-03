
import React, { useState } from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all hover:shadow-[0_20px_50px_rgba(36,55,99,0.1)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-1000 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        {product.isNew && (
          <div className="absolute top-4 left-4 bg-[#F26722] text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
            Nouveau
          </div>
        )}

        <div className={`absolute inset-0 bg-[#243763]/40 backdrop-blur-[2px] flex flex-col justify-end p-6 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex gap-2 justify-center">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-[10px] transition-all ${
                    selectedSize === size 
                      ? 'bg-[#F26722] text-white scale-110' 
                      : 'bg-white text-[#243763] hover:bg-gray-100'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <button 
              onClick={() => onAddToCart(product, selectedSize)}
              className="w-full bg-white text-[#243763] py-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-[#F26722] hover:text-white transition-all"
            >
              <ShoppingCart size={14} />
              Ajouter
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-black text-sm text-[#243763] group-hover:text-[#F26722] transition-colors uppercase tracking-tight line-clamp-1">
            {product.name}
          </h3>
          <span className="font-black text-[#F26722] text-lg">{product.price}€</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F26722]"></span>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{product.category}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
