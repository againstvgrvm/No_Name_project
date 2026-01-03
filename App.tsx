import React, { useState, useMemo, useEffect } from 'react';
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

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
    <div className="min-h-screen flex flex-col bg-[#FDFDFD]">
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
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                  <span className="text-[#F26722] font-black uppercase tracking-[0.4em] text-[10px] block mb-3">Sélection Premium</span>
                  <h2 className="text-5xl md:text-7xl font-black text-[#243763] uppercase tracking-tighter leading-none">Les Incontournables</h2>
                </div>
                <button 
                  onClick={() => setCurrentView('shop')}
                  className="bg-[#243763] text-white px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#F26722] transition-all self-start"
                >
                  Voir toute la collection
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {MOCK_PRODUCTS.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </section>

            <section className="bg-[#243763] py-32 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#F26722] rounded-full blur-[150px]"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-[150px]"></div>
               </div>
               
               <div className="max-w-7xl mx-auto px-6 relative z-10">
                  <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="lg:w-1/2">
                      <h2 className="text-7xl font-black text-white uppercase mb-10 leading-[0.9] tracking-tighter">
                        L'IA au service de <br/><span className="text-[#F26722]">votre style</span>
                      </h2>
                      <p className="text-gray-300 mb-12 text-xl leading-relaxed max-w-lg">
                        Plus besoin de chercher. Notre Styliste IA analyse votre identité pour vous proposer le maillot No Name qui vous correspond.
                      </p>
                      <button 
                        onClick={() => setCurrentView('ai-stylist')}
                        className="group bg-[#F26722] text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-[#243763] transition-all transform hover:-translate-y-1 shadow-2xl shadow-orange-500/20"
                      >
                        Lancer l'expérience
                      </button>
                    </div>
                    <div className="lg:w-1/2 relative">
                      <div className="aspect-square w-full max-w-md bg-white/5 border border-white/10 rounded-[60px] flex items-center justify-center backdrop-blur-3xl animate-pulse">
                         <span className="text-white text-[150px] font-black opacity-20">NN</span>
                         <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 bg-[#F26722] rounded-full blur-3xl opacity-50"></div>
                         </div>
                      </div>
                    </div>
                  </div>
               </div>
            </section>
          </div>
        )}

        {currentView === 'shop' && (
          <section className="max-w-7xl mx-auto px-6 py-20 animate-reveal">
            <div className="mb-20">
               <div className="flex items-center gap-4 mb-6">
                  <div className="h-px bg-[#F26722] w-12"></div>
                  <span className="text-[#F26722] font-black uppercase tracking-[0.4em] text-[12px]">Collection 2025</span>
               </div>
               <h1 className="text-8xl font-black text-[#243763] uppercase tracking-tighter leading-none mb-16">Le Vestiaire</h1>
               
               <div className="flex flex-wrap gap-3">
                {['Tous', 'Clubs', 'National', 'Retro', 'Training'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat === 'Tous' ? null : cat)}
                    className={`px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border-2 ${
                      (cat === 'Tous' && !selectedCategory) || selectedCategory === cat
                        ? 'bg-[#F26722] border-[#F26722] text-white shadow-2xl shadow-orange-500/20'
                        : 'bg-transparent border-gray-100 text-[#243763] hover:border-[#243763]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
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

      <footer className="bg-[#1a1a1a] py-32 text-white mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-24 mb-24">
            <div className="col-span-1 lg:col-span-2">
              <Logo className="h-16 mb-12" variant="light" />
              <p className="text-gray-500 max-w-sm text-xl font-medium leading-relaxed">
                Le collectif No Name redéfinit l'esthétique du football moderne à travers des pièces exclusives et intemporelles.
              </p>
            </div>
            <div>
              <h4 className="font-black uppercase text-[10px] tracking-[0.4em] text-[#F26722] mb-12">Explore</h4>
              <ul className="space-y-8 text-sm font-black uppercase tracking-widest">
                <li><button onClick={() => setCurrentView('home')} className="hover:text-[#F26722] transition-colors">Accueil</button></li>
                <li><button onClick={() => setCurrentView('shop')} className="hover:text-[#F26722] transition-colors">Boutique</button></li>
                <li><button onClick={() => setCurrentView('ai-stylist')} className="hover:text-[#F26722] transition-colors">Styliste IA</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-[10px] tracking-[0.4em] text-[#F26722] mb-12">Collective</h4>
              <ul className="space-y-8 text-sm font-black uppercase tracking-widest">
                <li className="hover:text-[#F26722] cursor-pointer">Instagram</li>
                <li className="hover:text-[#F26722] cursor-pointer">Discord</li>
                <li className="hover:text-[#F26722] cursor-pointer">Manifeste</li>
              </ul>
            </div>
          </div>
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.5em]">
              &copy; 2025 NO NAME. TOUS DROITS RÉSERVÉS.
            </p>
            <div className="flex gap-12 text-[10px] text-gray-600 font-black uppercase tracking-[0.5em]">
              <span className="cursor-pointer hover:text-white">Conditions</span>
              <span className="cursor-pointer hover:text-white">Cookies</span>
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