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

        // Assurez-vous que les autres reducers soient aussi à jour
        logoutUser(state) {
            state.username = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        loginUserFailure(state, action) {
            state.error = action.payload;
        },
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
    initialState: {
        profile: null,
        loading: false,
        error: null
    },
    reducers: {
        fetchProfileStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProfileSuccess(state, action) {
            console.log("Profile Data Received for Reducer:", action.payload); // Vérifier les données reçues
            state.profile = action.payload.body;
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
