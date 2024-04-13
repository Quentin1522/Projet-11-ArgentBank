//actions pour l'authentification utilisateur
import { loginUserSuccess, loginUserFailure } from './authSlice';

//action pour connecter l'utilisateur
export const loginUser = (userData) => {
    return async (dispatch) => {
        try {
            //effectue une requête HTTP POST vers l'API pour la connexion
            const response = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                //si la requête est réussie, récupère les données de l'utilisateur et le token
                const data = await response.json();
                const token = data.token;

                //dispatch l'action de connexion réussie avec les données de l'utilisateur et le token
                dispatch(loginUserSuccess({user: data.user, token}));
            } else {
                //si la requête échoue, dispatch l'action de connexion échouéavec un message d'erreur
                dispatch(loginUserFailure('Invalid credentials'));
            }
        } catch (error) {
            //en cas d'erreur, dispatch l'action de connexion échouée avec un message d'erreur générique
            console.error('Error logging in:', error);
            dispatch(loginUserFailure('An error occurred'));
        }
    };
};
