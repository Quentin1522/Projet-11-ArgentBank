//ici le reducer pour gérer l'état de l'authentification

//types d'actions pour la connexion, la déconnexion et les erreurs de connexion
const LOGIN_SUCCESS = 'auth/loginSuccess';
const LOGIN_FAILURE = 'auth/loginFailure';
const LOGOUT = 'auth/logout';

//état initial de l'authentification
const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    error: null
};

//reducer pour gérer l'authentification
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            //met à jour l'état après une connexion réussie
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload,
                error: null
            };
        case LOGIN_FAILURE:
            //met à jour l'état après une connexion échouée
            return {
                ...state,
                isAuthenticated: false,
                token:null,
                user: null,
                error: action.payload
            };
        case LOGOUT:
            //met à jour l'état lorqu'un utilisateur se déconnecte
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token:null,
                error: null
            };
        default:
            return state;
    }
};

export default authReducer;
