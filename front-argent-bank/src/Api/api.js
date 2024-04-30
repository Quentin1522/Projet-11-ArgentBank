// Importations des actions de Redux pour le succès et l'échec de la connexion
import { loginUserSuccess, loginUserFailure } from '../redux/slice';
import store from '../redux/store';

// L'URL de base pour les requêtes API au backend
const baseURL = 'http://localhost:3001/api/v1/user';

// Fonction pour traiter les réponses JSON des requêtes API
async function processResponse(response) {
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || `Erreur avec l'API. Status: ${response.status}`);
        }
        return data;
    } else {
        const errorHTML = await response.text(); // Pour obtenir le corps de la réponse non-JSON
        console.error("Received non-JSON response:", errorHTML);
        throw new Error("Expected JSON, got HTML.");
    }
}

// Fonction asynchrone pour connecter un utilisateur avec ses credentials (identifiants)
export async function loginUser(credentials) {
    try {
        // Faire une requête POST à l’URL /login
        const response = await fetch(`${baseURL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Envoi des credentials en JSON
            body: JSON.stringify(credentials) 
        });
        
        // Traitement de la réponse
        const processData = await processResponse(response); 
        // Extraction du token de la réponse
        const { token } = processData.body; 

        // Si un token est reçu, le stocker localement et dispatcher l'action de succès
        if (token) {
            localStorage.setItem('userToken', token);
            store.dispatch(loginUserSuccess({ token }));
            return { token };
        } else {
            // Lance une erreur si le token est absent
            throw new Error("Token manquant"); 
        }
    } catch (error) {
        console.error('Erreur API lors de la connexion :', error);
        // Dispatcher l'action d'échec
        store.dispatch(loginUserFailure(error.toString())); 
        // Relancer l'erreur pour un traitement ultérieur
        throw error; 
    }
}

// Fonction pour récupérer le profil de l'utilisateur en utilisant un token
export async function fetchUserProfile(token) {
    try {
        const response = await fetch(`${baseURL}/profile`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const responseBody = await response.text();
        // Vérifie si la réponse est en format JSON
        if (response.headers.get("content-type")?.includes("application/json")) {
            const data = JSON.parse(responseBody);
            return data;
        } else {
            // Lance une erreur si ce n'est pas du JSON
            throw new Error("La réponse n'est pas du JSON"); 
        }
    } catch (error) {
        console.error('Erreur API lors de la récupération du profil :', error);
        throw error;
    }
}

// Fonction pour modifier les informations données utilisateur
export async function saveUserProfile(token, profileData) {
    console.log("Sending token:", token);
    console.log("Sending profile data:", JSON.stringify(profileData));

    const response = await fetch(`${baseURL}/profile`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
    });
    return await processResponse(response);
}

// Fonction pour simuler la déconnexion de l'utilisateur
export function logoutUser() {
    // Supprime le token du stockage local
    localStorage.removeItem('userToken'); 
    // Dispatch de l'action de déconnexion
    store.dispatch(logoutUser()); 
}
