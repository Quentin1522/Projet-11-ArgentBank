import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slice';  // Importation du reducer combiné

// Création et configuration du Redux store
const store = configureStore({
    // Définition du reducer racine
    reducer: rootReducer,  
    // Activation de Redux DevTools uniquement en développement
    devTools: process.env.NODE_ENV !== 'production'  
});

export default store;
