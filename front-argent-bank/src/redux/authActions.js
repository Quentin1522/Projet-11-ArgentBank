// authActions.js

// Importe les actions loginUserSuccess et loginUserFailure du slice authSlice
import { loginUserSuccess, loginUserFailure } from './authSlice';

// Définit l'action loginUser, qui envoie une requête pour connecter l'utilisateur
export const loginUser = (userData) => {
  return async (dispatch) => { // Fonction asynchrone qui reçoit dispatch comme argument
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', { // Effectue une requête HTTP POST
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Envoie les données de l'utilisateur au format JSON
      });
      if (response.ok) { // Si la requête est réussie (code de statut 200-299)
        const data = await response.json(); // Extrait les données JSON de la réponse
        const token = data.token; // Extrait le token d'authentification de la réponse
        dispatch(loginUserSuccess({ user: data.user, token })); // Dispatch l'action loginUserSuccess avec les données de l'utilisateur et le token
      } else { // Si la requête échoue
        dispatch(loginUserFailure('Invalid credentials')); // Dispatch l'action loginUserFailure avec un message d'erreur
      }
    } catch (error) { // En cas d'erreur lors de la requête
      console.error('Error logging in:', error); // Affiche l'erreur dans la console
      dispatch(loginUserFailure('An error occurred')); // Dispatch l'action loginUserFailure avec un message d'erreur générique
    }
  };
};
