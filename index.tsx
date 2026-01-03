import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Système de diagnostic en cas d'erreur fatale au chargement
window.onerror = function(message, source, lineno, colno, error) {
  console.error("ERREUR CRITIQUE : ", message);
  const root = document.getElementById('root');
  if (root && root.innerHTML === '') {
    root.innerHTML = `<div style="padding: 40px; color: #243763; font-family: 'Inter', sans-serif; text-align: center;">
      <h2 style="font-weight: 900; text-transform: uppercase;">Erreur de chargement</h2>
      <p style="opacity: 0.7;">${message}</p>
      <button onclick="window.location.reload()" style="margin-top: 20px; background: #F26722; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer;">Réessayer</button>
    </div>`;
  }
  return false;
};

const container = document.getElementById('root');
if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Erreur lors du montage de l'application :", error);
  }
} else {
  console.error("L'élément racine #root n'a pas été trouvé.");
}