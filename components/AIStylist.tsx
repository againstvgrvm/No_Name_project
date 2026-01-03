
import React, { useState } from 'react';
import { Send, Sparkles, Loader2, Bot } from 'lucide-react';
import { getJerseyAdvice } from '../services/geminiService';
import { Product } from '../types';

interface AIStylistProps {
  products: Product[];
}

const AIStylist: React.FC<AIStylistProps> = ({ products }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    setAdvice(null);
    try {
      const result = await getJerseyAdvice(input, products);
      setAdvice(result || "Désolé, je ne peux pas vous aider pour le moment.");
    } catch (error) {
      console.error(error);
      setAdvice("Une erreur est survenue lors de la consultation de nos experts IA.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-[#F26722]/10 rounded-2xl text-[#F26722] mb-6">
          <Sparkles size={32} />
        </div>
        <h1 className="text-5xl font-black text-black uppercase mb-4 tracking-tighter">Styliste IA</h1>
        <p className="text-xl text-gray-500 font-medium">
          Décris-nous ton style ou ton équipe préférée, et notre IA dénichera le maillot parfait pour toi.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-8 md:p-12">
          <form onSubmit={handleSubmit} className="mb-12">
            <label className="block font-black uppercase text-xs tracking-widest mb-4 text-gray-400">
              Quel genre de maillot cherches-tu ?
            </label>
            <div className="flex gap-4">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ex: Un maillot vintage coloré pour l'été..."
                className="flex-grow bg-gray-50 border-2 border-transparent focus:border-[#F26722] focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium"
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-black text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#F26722] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                Conseiller
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
               {["Style Retro", "Équipe de France", "Confort entraînement", "Maillot de ville"].map(tag => (
                 <button 
                  key={tag}
                  type="button"
                  onClick={() => setInput(tag)}
                  className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200"
                 >
                   {tag}
                 </button>
               ))}
            </div>
          </form>

          {loading && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
               <div className="relative">
                 <div className="w-16 h-16 border-4 border-[#F26722]/20 border-t-[#F26722] rounded-full animate-spin"></div>
                 <Bot className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#243763]" size={24} />
               </div>
               <p className="mt-6 font-bold uppercase tracking-widest text-sm text-gray-400 animate-pulse">
                 Analyse de la collection en cours...
               </p>
            </div>
          )}

          {advice && (
            <div className="bg-[#243763] text-white p-8 rounded-3xl relative animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="absolute -top-4 -left-4 bg-[#F26722] p-3 rounded-2xl">
                <Bot size={24} />
              </div>
              <h3 className="text-xl font-black uppercase mb-4 border-b border-white/10 pb-4">La sélection du Styliste</h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed whitespace-pre-wrap font-medium">
                  {advice}
                </p>
              </div>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-8 bg-white text-black px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-[#F26722] hover:text-white transition-all"
              >
                Aller voir les maillots
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-[#F1F1F1] rounded-3xl">
          <h4 className="font-black uppercase tracking-tighter text-2xl mb-4">Rapide</h4>
          <p className="text-gray-500 font-medium">Analyse instantanée de centaines de références.</p>
        </div>
        <div className="p-8 bg-[#F1F1F1] rounded-3xl">
          <h4 className="font-black uppercase tracking-tighter text-2xl mb-4">Précis</h4>
          <p className="text-gray-500 font-medium">Se base sur vos goûts personnels et l'historique du football.</p>
        </div>
        <div className="p-8 bg-[#F1F1F1] rounded-3xl">
          <h4 className="font-black uppercase tracking-tighter text-2xl mb-4">Gratuit</h4>
          <p className="text-gray-500 font-medium">Le service de stylisme est offert à tous les membres NO NAME.</p>
        </div>
      </div>
    </section>
  );
};

export default AIStylist;
