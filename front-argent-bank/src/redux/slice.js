import { createSlice, combineReducers } from '@reduxjs/toolkit';

// État initial pour l'authentification
const authInitialState = {
    // Token d'authentification, initialement à null
    token: null,         
    // Statut d'authentification, false par défaut   
    isAuthenticated: false,  
    // S'il y a une erreur d'authentification, elle sera stockée ici
    error: null              
};

// Création d'un slice pour la gestion de l'authentification
const authSlice = createSlice({
    // Nom du slice, utilisé dans les actions et le reducer
    name: 'auth',
    // Définition de l'état initial
    initialState: authInitialState,  
    reducers: {
        // Action pour gérer le succès de la connexion
        loginUserSuccess(state, action) {
            // Stocke le token
            state.token = action.payload.token;  
            // Marque comme authentifié
            state.isAuthenticated = true;     
            // Efface les erreurs précédentes   
            state.error = null;                 
        },
        // Action pour gérer la déconnexion
        logoutUser(state) {
            // Efface le token
            state.token = null;         
            // Marque comme non authentifié        
            state.isAuthenticated = false;    
            // Efface les erreurs précédentes  
            state.error = null;                 
        },
        // Action pour gérer l'échec de la connexion
        loginUserFailure(state, action) {
            // Stocke l'erreur retournée
            state.error = action.payload;       
        }
    }
});

// État initial pour le profil utilisateur
const profileInitialState = {
    // Données du profil utilisateur
    profile: null,     
    // Indicateur de chargement   
    loading: false,   
    // Erreur lors du chargement/mise à jour du profil    
    error: null           
};

// Création d'un slice pour la gestion du profil utilisateur
const profileSlice = createSlice({
    name: 'profile', 
    // État initial
    initialState: profileInitialState,  
    reducers: {
        // Action pour signaler le début du chargement du profil
        fetchProfileStart(state) {
            // Active l'indicateur de chargement
            state.loading = true;  
            // Réinitialise les erreurs
            state.error = null;    
        },
        // Action pour gérer le succès du chargement du profil
        fetchProfileSuccess(state, action) {
            // Met à jour les données du profil
            state.profile = action.payload.body; 
            // Désactive l'indicateur de chargement 
            state.loading = false;                
        },
        // Action pour gérer l'échec du chargement du profil
        fetchProfileFailure(state, action) {
            // Stocke l'erreur
            state.error = action.payload; 
            // Désactive l'indicateur de chargement 
            state.loading = false;         
        },
        // Action pour mettre à jour le profil
        updateProfile(state, action) {
            // Fusionne les nouvelles données avec l'existant
            state.profile = {...state.profile, ...action.payload};  
        }
    }
});

// Exportation des actions de chaque slice pour utilisation dans les composants
export const { loginUserSuccess, loginUserFailure, logoutUser } = authSlice.actions;
export const { fetchProfileStart, fetchProfileSuccess, fetchProfileFailure, updateProfile } = profileSlice.actions;

// Combinaison des reducers des différents slices en un seul reducer racine
const rootReducer = combineReducers({
    // Reducer pour l'authentification
    auth: authSlice.reducer,   
    // Reducer pour le profil utilisateur  
    profile: profileSlice.reducer 
});

// Exportation du reducer racine pour utilisation dans le store Redux
export default rootReducer;
