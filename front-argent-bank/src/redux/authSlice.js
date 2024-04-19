// authSlice.js

// Importe la fonction createSlice de Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Crée un slice nommé 'auth' avec un état initial
const authSlice = createSlice({
  name: 'auth', // Nom du slice
  initialState: { // État initial
    isAuthenticated: false, // Indique si l'utilisateur est authentifié
    user: null, // Contient les informations sur l'utilisateur actuellement connecté
    token: null, // Contient le token d'authentification de l'utilisateur
    error: null, // Contient les éventuelles erreurs lors de l'authentification
  },
  reducers: { // Définition des reducers, qui modifient l'état en réponse à des actions
    loginUserSuccess(state, action) { // Reducer pour gérer la connexion réussie
      state.isAuthenticated = true; // Met à jour l'état pour indiquer que l'utilisateur est authentifié
      state.user = action.payload.user; // Met à jour les informations de l'utilisateur avec celles fournies dans l'action
      state.token = action.payload.token; //Met à jour le token d'authentification avec celui fourni dans l'action
      state.error = null; // Efface les éventuelles erreurs précédentes
    },
    loginUserFailure(state, action) { // Reducer pour gérer l'échec de connexion
      state.isAuthenticated = false; // Met à jour l'état pour indiquer que l'utilisateur n'est pas authentifié
      state.user = null; // Efface les informations sur l'utilisateur
      state.token = null, // Efface le token d'aithentification
      state.error = action.payload; // Stocke le message d'erreur fourni dans l'action
    },
    logoutUser(state) { // Reducer pour gérer la déconnexion de l'utilisateur
      state.isAuthenticated = false; // Met à jour l'état pour indiquer que l'utilisateur n'est pas authentifié
      state.user = null; // Efface les informations sur l'utilisateur
      state.token = null; // Efface le token d'authentification
      state.error = null; // Efface les éventuelles erreurs précédentes
    },
  },
});

// Exporte les actions et le reducer du slice
export const { loginUserSuccess, loginUserFailure, logoutUser } = authSlice.actions;
export default authSlice.reducer;
