
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import AIStylist from './components/AIStylist';
import { MOCK_PRODUCTS, COLORS } from './constants';
import { Product, CartItem, View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const addToCart = (product: Product, size: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size: string) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const updateQuantity = (id: string, size: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onNavigate={setCurrentView} 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-grow pt-20">
        {currentView === 'home' && (
          <>
            <Hero onShopNow={() => setCurrentView('shop')} />
            
            <section className="max-w-7xl mx-auto px-4 py-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <h2 className="text-3xl font-black text-black uppercase tracking-tighter">Nouveautés</h2>
                  <p className="text-gray-500 font-medium">Les derniers maillots de la collection NO NAME.</p>
                </div>
                <button 
                  onClick={() => setCurrentView('shop')}
                  className="group flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-[#F26722] hover:text-[#243763] transition-colors"
                >
                  Voir toute la boutique
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_PRODUCTS.slice(0, 3).map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </section>

            <section className="bg-[#243763] py-20">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-6">Besoin d'un conseil ?</h2>
                <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                  Notre intelligence artificielle experte en football vous aide à choisir le maillot parfait pour votre style.
                </p>
                <button 
                  onClick={() => setCurrentView('ai-stylist')}
                  className="bg-[#F26722] text-white px-10 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-white hover:text-[#F26722] transition-all transform hover:scale-105 shadow-xl"
                >
                  Démarrer le Styliste IA
                </button>
              </div>
            </section>
          </>
        )}

        {currentView === 'shop' && (
          <section className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-5xl font-black text-black uppercase mb-12">La Boutique</h1>
            
            <div className="flex flex-wrap gap-4 mb-12">
              {['Touts', 'Clubs', 'National', 'Retro', 'Training'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === 'Touts' ? null : cat)}
                  className={`px-6 py-2 rounded-full font-bold uppercase text-xs tracking-widest transition-all ${
                    (cat === 'Touts' && !selectedCategory) || selectedCategory === cat
                      ? 'bg-[#F26722] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </section>
        )}

        {currentView === 'ai-stylist' && (
          <AIStylist products={MOCK_PRODUCTS} />
        )}
      </main>

      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-[#F26722] p-2 rounded">
                 <span className="font-black text-white text-xl">NN</span>
              </div>
              <span className="text-2xl font-black tracking-tighter">NO NAME</span>
            </div>
            <p className="text-gray-400 max-w-md">
              La destination ultime pour les maillots de football d'exception. 
              Inspiré par le jeu, conçu pour la rue.
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest mb-6">Navigation</h4>
            <ul className="space-y-4 text-gray-400">
              <li><button onClick={() => setCurrentView('home')} className="hover:text-[#F26722]">Accueil</button></li>
              <li><button onClick={() => setCurrentView('shop')} className="hover:text-[#F26722]">Boutique</button></li>
              <li><button onClick={() => setCurrentView('ai-stylist')} className="hover:text-[#F26722]">Styliste IA</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest mb-6">Newsletter</h4>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Ton email" 
                className="bg-gray-900 border-none px-4 py-2 w-full focus:ring-1 focus:ring-[#F26722]"
              />
              <button className="bg-[#F26722] px-4 py-2 font-bold">→</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          &copy; 2024 NO NAME FOOTBALL COLLECTIVE. TOUS DROITS RÉSERVÉS.
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
};

export default App;
