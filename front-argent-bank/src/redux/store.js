import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slice';

// récupére le token stocké dans le localStorage et seesionStorage
const tokenFromStorage = localStorage.getItem('token');
const tokenFromSession = sessionStorage.getItem('token'); 

// Utilise sessionStorage si localStorage est vide
const token = tokenFromStorage || tokenFromSession;  

// Définir l'état initial en fonction du token récupéré
const preloadedState = {
  auth: {
    token: token,
    isAuthenticated: !!token,
    error: null
  }
}

// Création et configuration du Redux store avec l'état préchargé
const store = configureStore({
    reducer: rootReducer,
    // Passer l'état initial ici
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production'  
});

export default store;
