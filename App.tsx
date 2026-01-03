
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import AIStylist from './components/AIStylist';
import Logo from './components/Logo';
import { MOCK_PRODUCTS } from './constants';
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

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar 
        onNavigate={setCurrentView} 
        cartCount={cartTotal} 
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero onShopNow={() => setCurrentView('shop')} />
            
            <section className="max-w-7xl mx-auto px-6 py-20">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-black uppercase tracking-tighter mb-4">Dernières pépites</h2>
                <div className="w-20 h-1 bg-[#F26722] mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {MOCK_PRODUCTS.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
              
              <div className="mt-16 text-center">
                <button 
                  onClick={() => setCurrentView('shop')}
                  className="inline-block border-2 border-black px-12 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-all"
                >
                  Voir tout le shop
                </button>
              </div>
            </section>

            <section className="bg-black py-24">
              <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-8">Le Styliste IA</h2>
                <p className="text-gray-400 mb-10 max-w-xl mx-auto">
                  Besoin d'aide pour matcher tes tenues ? Notre intelligence artificielle te conseille les meilleurs combos.
                </p>
                <button 
                  onClick={() => setCurrentView('ai-stylist')}
                  className="bg-white text-black px-12 py-4 rounded-full font-black uppercase tracking-widest hover:bg-[#F26722] hover:text-white transition-all"
                >
                  Essayer maintenant
                </button>
              </div>
            </section>
          </>
        )}

        {currentView === 'shop' && (
          <section className="max-w-7xl mx-auto px-6 py-32">
            <h1 className="text-7xl font-black text-black uppercase mb-12 tracking-tighter">Boutique</h1>
            
            <div className="flex flex-wrap gap-3 mb-16">
              {['Touts', 'Clubs', 'National', 'Retro', 'Training'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === 'Touts' ? null : cat)}
                  className={`px-8 py-3 rounded-full font-bold uppercase text-[10px] tracking-[0.2em] transition-all border ${
                    (cat === 'Touts' && !selectedCategory) || selectedCategory === cat
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </section>
        )}

        {currentView === 'ai-stylist' && (
          <div className="pt-20">
            <AIStylist products={MOCK_PRODUCTS} />
          </div>
        )}
      </main>

      <footer className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <Logo className="h-12 mb-8" />
              <p className="text-gray-500 max-w-sm font-medium">
                Le No Name Football Collective redéfinit le style sur et en dehors du terrain. 
                Une vision brute du football moderne.
              </p>
            </div>
            <div>
              <h4 className="font-black uppercase text-xs tracking-[0.2em] mb-8">Navigation</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><button onClick={() => setCurrentView('home')} className="hover:text-[#F26722]">Accueil</button></li>
                <li><button onClick={() => setCurrentView('shop')} className="hover:text-[#F26722]">Vêtements</button></li>
                <li><button onClick={() => setCurrentView('ai-stylist')} className="hover:text-[#F26722]">Styliste IA</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-xs tracking-[0.2em] mb-8">Suivez-nous</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-400">
                <li className="hover:text-black cursor-pointer">Instagram</li>
                <li className="hover:text-black cursor-pointer">TikTok</li>
                <li className="hover:text-black cursor-pointer">Twitter</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
              &copy; 2024 NO NAME FOOTBALL.
            </p>
            <div className="flex gap-8 text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
              <span className="cursor-pointer hover:text-black">Mentions Légales</span>
              <span className="cursor-pointer hover:text-black">CGV</span>
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
