
import React, { useState } from 'react';
import { Send, Sparkles, Loader2, Bot } from 'lucide-react';
import { getJerseyAdvice } from '../services/geminiService.ts';
import { Product } from '../types.ts';

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
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F26722]/10 rounded-3xl text-[#F26722] mb-8">
          <Sparkles size={40} />
        </div>
        <h1 className="text-6xl font-black text-[#243763] uppercase mb-6 tracking-tighter">Styliste IA</h1>
        <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
          Décrivez-nous votre humeur, votre style ou votre club de cœur, et notre intelligence artificielle dénichera la pièce maîtresse de votre collection.
        </p>
      </div>

      <div className="bg-white rounded-[40px] shadow-[0_40px_100px_rgba(36,55,99,0.08)] border border-gray-100 overflow-hidden mb-20">
        <div className="p-8 md:p-16">
          <form onSubmit={handleSubmit} className="mb-12">
            <label className="block font-black uppercase text-[10px] tracking-[0.3em] mb-6 text-[#243763]/50">
              Quelle est votre préférence aujourd'hui ?
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ex: Un maillot rétro aux couleurs vives..."
                className="flex-grow bg-gray-50 border-2 border-transparent focus:border-[#F26722] focus:bg-white rounded-2xl px-8 py-5 outline-none transition-all font-semibold text-[#243763]"
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-[#243763] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#F26722] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-navy/20"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                Analyser
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
               {["Vintage 90s", "Équipes Nationales", "Full Black", "Look Entraînement"].map(tag => (
                 <button 
                  key={tag}
                  type="button"
                  onClick={() => setInput(tag)}
                  className="text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2.5 bg-[#F8F9FA] text-[#243763]/60 rounded-full hover:bg-[#F26722] hover:text-white transition-all border border-gray-100"
                 >
                   {tag}
                 </button>
               ))}
            </div>
          </form>

          {loading && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
               <div className="relative mb-8">
                 <div className="w-24 h-24 border-[6px] border-[#F26722]/10 border-t-[#F26722] rounded-full animate-spin"></div>
                 <Bot className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#243763]" size={32} />
               </div>
               <p className="font-black uppercase tracking-[0.3em] text-sm text-[#243763]/40 animate-pulse">
                 Exploration des archives...
               </p>
            </div>
          )}

          {advice && (
            <div className="bg-[#243763] text-white p-10 md:p-16 rounded-[32px] relative animate-reveal">
              <div className="absolute -top-6 -left-6 bg-[#F26722] w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                <Bot size={28} />
              </div>
              <h3 className="text-2xl font-black uppercase mb-8 border-b border-white/10 pb-6 tracking-tight">Le Verdict du Styliste</h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-xl leading-relaxed whitespace-pre-wrap font-medium text-gray-200 italic">
                  "{advice}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { title: "Smart", desc: "Analyse sémantique de vos envies de style." },
          { title: "Curated", desc: "Sélection exclusive parmi nos meilleurs drops." },
          { title: "Unique", desc: "Des conseils personnalisés pour chaque membre." }
        ].map((item, idx) => (
          <div key={idx} className="p-10 bg-white rounded-[32px] border border-gray-100">
            <h4 className="font-black uppercase tracking-tighter text-3xl text-[#F26722] mb-4">{item.title}</h4>
            <p className="text-[#243763]/60 font-semibold leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AIStylist;
