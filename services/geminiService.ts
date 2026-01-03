
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getJerseyAdvice = async (userPreference: string, products: Product[]) => {
  const productContext = products.map(p => `${p.name} (${p.category}) - ${p.price}€`).join(', ');

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Tu es un expert en mode footballistique pour la boutique "NO NAME". 
    Voici nos produits disponibles: ${productContext}. 
    L'utilisateur dit: "${userPreference}". 
    Conseille-lui le meilleur maillot et explique pourquoi en restant cool et passionné. Réponds en français.`,
    config: {
      temperature: 0.7,
      maxOutputTokens: 500,
    }
  });

  return response.text;
};
