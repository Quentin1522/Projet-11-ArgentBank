// Importation des utilitaires nécessaires
import { createSlice, combineReducers } from '@reduxjs/toolkit';

// État initial pour l'authentification
const authInitialState = {
    token: null,
    isAuthenticated: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        loginUserSuccess(state, action) {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
        },
        logoutUser(state) {
            state.username = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        loginUserFailure(state, action) {
            state.error = action.payload;
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
    name: 'profile',
    initialState: profileInitialState,
    reducers: {
        fetchProfileStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProfileSuccess(state, action) {
            state.profile = action.payload.body;
        },
        fetchProfileFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        updateProfile(state, action) {
            state.profile = {...state.profile, ...action.payload};
        }
    }
});

// Exportation des actions de chaque slice pour utilisation dans les composants
export const { loginUserSuccess, loginUserFailure, logoutUser } = authSlice.actions;
export const { fetchProfileStart, fetchProfileSuccess, fetchProfileFailure, updateProfile } = profileSlice.actions;

// Combinaison des reducers des différents slices en un seul reducer racine
const rootReducer = combineReducers({
    auth: authSlice.reducer,
    profile: profileSlice.reducer
});

export default rootReducer;
