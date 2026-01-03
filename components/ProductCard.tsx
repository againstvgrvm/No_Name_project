
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
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        {product.isNew && (
          <div className="absolute top-4 left-4 bg-[#F26722] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            Nouveau
          </div>
        )}

        <div className={`absolute inset-0 bg-black/40 flex flex-col justify-end p-6 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="space-y-4">
            <div className="flex gap-2 justify-center">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${
                    selectedSize === size 
                      ? 'bg-[#F26722] text-white' 
                      : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <button 
              onClick={() => onAddToCart(product, selectedSize)}
              className="w-full bg-white text-black py-3 rounded-xl font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-[#F26722] hover:text-white transition-colors"
            >
              <ShoppingCart size={16} />
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-black group-hover:text-[#F26722] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <span className="font-black text-[#243763]">{product.price}€</span>
        </div>
        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{product.category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
