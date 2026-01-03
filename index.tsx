import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("No Name App: Initializing...");

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("No Name App: Root element not found");
}