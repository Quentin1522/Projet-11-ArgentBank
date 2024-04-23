// Importation des utilitaires nécessaires
import { createSlice, combineReducers } from '@reduxjs/toolkit';

// État initial pour l'authentification
const authInitialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null
};

// Création d'un slice pour l'authentification
const authSlice = createSlice({
    name: 'auth', // Nom du slice
    initialState: authInitialState, // État initial
    reducers: {  // Réducteurs pour gérer les actions
        loginUserSuccess(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
        },
        loginUserFailure(state, action) {
            state.error = action.payload;
        },
        logoutUser(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
        }
    }
});

// État initial pour le profil utilisateur
const profileInitialState = {
    profile: null,
    loading: false,
    error: null
};

// Création d'un slice pour la gestion du profil utilisateur
const profileSlice = createSlice({
    name: 'profile', // Nom du slice
    initialState: profileInitialState, // État initial
    reducers: { // Réducteurs pour gérer les actions
        fetchProfileStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProfileSuccess(state, action) {
            state.profile = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchProfileFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

// Exportation des actions de chaque slice pour utilisation dans les composants
export const { loginUserSuccess, loginUserFailure, logoutUser } = authSlice.actions;
export const { fetchProfileStart, fetchProfileSuccess, fetchProfileFailure } = profileSlice.actions;

// Combinaison des reducers des différents slices en un seul reducer racine
const rootReducer = combineReducers({
    auth: authSlice.reducer,
    profile: profileSlice.reducer
});

export default rootReducer;
