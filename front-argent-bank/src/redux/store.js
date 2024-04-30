import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slice';

// Tentez de récupérer le token stocké dans le localStorage
const tokenFromStorage = localStorage.getItem('token');
const tokenFromSession = sessionStorage.getItem('token'); // Pour gérer également le sessionStorage

const token = tokenFromStorage || tokenFromSession;  // Utilise sessionStorage si localStorage est vide

// Définir l'état initial en fonction du token récupéré
const preloadedState = {
  auth: {
    token: token,
    isAuthenticated: !!token,  // Convertit la présence du token en valeur booléenne
    error: null
  }
}

// Création et configuration du Redux store avec l'état préchargé
const store = configureStore({
    reducer: rootReducer,
    preloadedState, // Passer l'état initial ici
    devTools: process.env.NODE_ENV !== 'production'  
});

export default store;
