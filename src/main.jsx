import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
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
