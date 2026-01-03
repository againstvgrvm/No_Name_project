
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import ProductCard from './components/ProductCard.tsx';
import Cart from './components/Cart.tsx';
import AIStylist from './components/AIStylist.tsx';
import Logo from './components/Logo.tsx';
import { MOCK_PRODUCTS } from './constants.ts';
import { Product, CartItem, View } from './types.ts';

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

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Navbar 
        onNavigate={setCurrentView} 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-grow pt-20">
        {currentView === 'home' && (
          <div className="animate-reveal">
            <Hero onShopNow={() => setCurrentView('shop')} />
            
            <section className="max-w-7xl mx-auto px-6 py-24">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <span className="text-[#F26722] font-black uppercase tracking-[0.3em] text-[10px] block mb-2">Drop actuel</span>
                  <h2 className="text-5xl font-black text-[#243763] uppercase tracking-tighter">La Sélection Elite</h2>
                </div>
                <button 
                  onClick={() => setCurrentView('shop')}
                  className="hidden md:block text-[#243763] font-black uppercase text-xs tracking-widest border-b-2 border-[#F26722] pb-1 hover:text-[#F26722] transition-colors"
                >
                  Explorer tout le vestiaire
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {MOCK_PRODUCTS.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
              
              <div className="mt-16 text-center md:hidden">
                <button 
                  onClick={() => setCurrentView('shop')}
                  className="w-full bg-[#243763] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs"
                >
                  Voir tout le shop
                </button>
              </div>
            </section>

            <section className="bg-[#243763] py-24 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F26722]/5 skew-x-12 translate-x-32"></div>
               <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
                  <div className="md:w-1/2">
                    <h2 className="text-6xl font-black text-white uppercase mb-8 leading-none">Votre Styliste <br/><span className="text-[#F26722]">Personnel</span></h2>
                    <p className="text-gray-300 mb-10 text-lg leading-relaxed">
                      Notre intelligence artificielle analyse les tendances du football pour vous proposer le maillot qui match parfaitement votre identité.
                    </p>
                    <button 
                      onClick={() => setCurrentView('ai-stylist')}
                      className="bg-white text-[#243763] px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#F26722] hover:text-white transition-all transform hover:scale-105"
                    >
                      Essayer le Styliste IA
                    </button>
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    <div className="relative w-64 h-64 bg-[#F26722] rounded-full flex items-center justify-center animate-pulse shadow-[0_0_100px_rgba(242,103,34,0.3)]">
                       <span className="text-white text-9xl font-black">AI</span>
                    </div>
                  </div>
               </div>
            </section>
          </div>
        )}

        {currentView === 'shop' && (
          <section className="max-w-7xl mx-auto px-6 py-20 animate-reveal">
            <div className="mb-16">
               <span className="text-[#F26722] font-black uppercase tracking-[0.3em] text-[12px] block mb-4">Collection 24/25</span>
               <h1 className="text-7xl font-black text-[#243763] uppercase tracking-tighter leading-none mb-12">Le Vestiaire</h1>
               
               <div className="flex flex-wrap gap-4">
                {['Tous', 'Clubs', 'National', 'Retro', 'Training'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat === 'Tous' ? null : cat)}
                    className={`px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all ${
                      (cat === 'Tous' && !selectedCategory) || selectedCategory === cat
                        ? 'bg-[#F26722] text-white shadow-xl shadow-orange-500/20'
                        : 'bg-white text-[#243763] border border-gray-200 hover:border-[#F26722]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </section>
        )}

        {currentView === 'ai-stylist' && (
          <div className="animate-reveal">
            <AIStylist products={MOCK_PRODUCTS} />
          </div>
        )}
      </main>

      <footer className="bg-[#243763] py-24 border-t border-white/5 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-20 mb-20">
            <div className="col-span-1 lg:col-span-2">
              <Logo className="h-14 mb-10" variant="light" />
              <p className="text-gray-400 max-w-sm text-lg font-medium leading-relaxed">
                Rejoignez l'élite du football. NO NAME n'est pas qu'une marque, c'est un collectif de passionnés.
              </p>
            </div>
            <div>
              <h4 className="font-black uppercase text-xs tracking-[0.3em] text-[#F26722] mb-10">Navigation</h4>
              <ul className="space-y-6 text-sm font-black uppercase tracking-widest">
                <li><button onClick={() => setCurrentView('home')} className="hover:text-[#F26722] transition-colors">Accueil</button></li>
                <li><button onClick={() => setCurrentView('shop')} className="hover:text-[#F26722] transition-colors">La Boutique</button></li>
                <li><button onClick={() => setCurrentView('ai-stylist')} className="hover:text-[#F26722] transition-colors">Styliste IA</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-xs tracking-[0.3em] text-[#F26722] mb-10">Suivez l'Héritage</h4>
              <ul className="space-y-6 text-sm font-black uppercase tracking-widest">
                <li className="hover:text-[#F26722] cursor-pointer">Instagram</li>
                <li className="hover:text-[#F26722] cursor-pointer">TikTok</li>
                <li className="hover:text-[#F26722] cursor-pointer">Discord Collective</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em]">
              &copy; 2025 NO NAME FOOTBALL COLLECTIVE.
            </p>
            <div className="flex gap-10 text-[10px] text-gray-500 font-black uppercase tracking-[0.4em]">
              <span className="cursor-pointer hover:text-white">Mentions</span>
              <span className="cursor-pointer hover:text-white">Confidentialité</span>
            </div>
          </div>
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
