import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// Remove splash screen after initial render
window.addEventListener('load', () => {
  const loader = document.getElementById('bevpedia-loader');
  if (loader) {
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.remove();
    }, 800);
  }
});
