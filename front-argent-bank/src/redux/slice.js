import { createSlice, combineReducers } from '@reduxjs/toolkit';

// État initial pour l'authentification
const authInitialState = {
    token: null,         
    isAuthenticated: false,  
    error: null              
};

// Slice pour la gestion de l'authentification
const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,  
    reducers: {
        loginUserSuccess(state, action) {
            state.token = action.payload.token;  
            state.isAuthenticated = true;      
            state.error = null;                 
        },
        loginUserFailure(state, action) {
            state.error = action.payload;       
        },
        logoutUser(state) {
            state.token = null;         
            state.isAuthenticated = false;    
            state.error = null;                 
        }
    }
});

// État initial pour le profil utilisateur
const profileInitialState = {
    profile: {
        userName: null,     
        // Ajoutez ici d'autres champs selon besoin
    },
    loading: false,   
    error: null           
};

// Slice pour la gestion du profil utilisateur
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
            state.loading = false;                
        },
        fetchProfileFailure(state, action) {
            state.error = action.payload; 
            state.loading = false;         
        },
        updateUserName(state, action) {
            if (state.profile) {
                state.profile.userName = action.payload.userName;  
            }
        }
    }
});

// Exportation des actions de chaque slice pour utilisation dans les composants
export const { loginUserSuccess, loginUserFailure, logoutUser } = authSlice.actions;
export const { fetchProfileStart, fetchProfileSuccess, fetchProfileFailure, updateUserName } = profileSlice.actions;

// Combinaison des reducers des différents slices en un seul reducer racine
const rootReducer = combineReducers({
    auth: authSlice.reducer,   
    profile: profileSlice.reducer 
});

// Exportation du reducer racine pour utilisation dans le store Redux
export default rootReducer;
