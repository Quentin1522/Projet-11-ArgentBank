// Importation des utilitaires nécessaires
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slice';  // Importation du reducer combiné

// Création et configuration du Redux store
const store = configureStore({
    reducer: rootReducer,  // Définition du reducer racine
    devTools: process.env.NODE_ENV !== 'production'  // Activation de Redux DevTools uniquement en développement
});

export default store;
