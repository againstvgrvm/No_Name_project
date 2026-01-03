
import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, size: string, delta: number) => void;
  onRemove: (id: string, size: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Votre Panier</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <ShoppingBag size={64} strokeWidth={1} className="mb-4" />
                <p className="font-bold uppercase tracking-widest text-sm">Votre panier est vide</p>
                <button 
                  onClick={onClose}
                  className="mt-6 text-[#F26722] font-bold underline"
                >
                  Commencer mes achats
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                  <div className="w-24 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-bold text-sm uppercase tracking-tight line-clamp-1">{item.name}</h4>
                      <button 
                        onClick={() => onRemove(item.id, item.selectedSize)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 font-bold mb-4 uppercase">Taille: {item.selectedSize}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)}
                          className="p-1 hover:bg-gray-100"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-1 font-bold text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)}
                          className="p-1 hover:bg-gray-100"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-black text-[#F26722]">{item.price * item.quantity}€</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-gray-500 uppercase tracking-widest text-xs">Total</span>
              <span className="text-3xl font-black">{total}€</span>
            </div>
            <button 
              className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all ${
                items.length > 0 
                  ? 'bg-black text-white hover:bg-[#F26722]' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={items.length === 0}
            >
              Commander maintenant
            </button>
            <p className="mt-4 text-center text-[10px] text-gray-400 uppercase tracking-widest">
              Paiement sécurisé par Stripe & Apple Pay
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
