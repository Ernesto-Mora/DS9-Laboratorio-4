import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa la API de root de React 
import App from './App';
import './index.css';
// Crea la raíz para la aplicación React
const root = ReactDOM.createRoot(document.getElementById('root'));
// Renderiza la aplicación usando la nueva API
root.render(
 <React.StrictMode>
 <App />
 </React.StrictMode>
);
