import { loginUserSuccess, loginUserFailure } from '../redux/slice';
import store from '../redux/store';

// Définition de l'URL de base pour les appels API vers le serveur backend.
const baseURL = 'http://localhost:3001/api/v1/user';

// Fonction pour traiter les réponses des requêtes fetch.
async function processResponse(response) {
    const contentType = response.headers.get("content-type");

    // Vérification si le type de contenu est JSON.
    if (contentType && contentType.includes("application/json")) {
        // Conversion de la réponse en JSON.
        const data = await response.json();
        if (!response.ok) {
            // Lancement d'une exception si la réponse n'est pas positive.
            throw new Error(data.message || `Erreur avec l'API. Status: ${response.status}`);
        }
        return data;
    } else {
        // Gestion d'une réponse de retour inattendue (non-JSON).
        const errorHTML = await response.text();
        console.error("Received non-JSON response:", errorHTML);
        throw new Error("Expected JSON, got HTML.");
    }
}

// Fonction pour connecter un utilisateur.
export async function loginUser(credentials) {
    try {
        // Appel API pour la connexion.
        const response = await fetch(`${baseURL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials) 
        });
        
        // Traitement de la réponse.
        const processData = await processResponse(response);

        // Extraction du token de la réponse.
        const { token } = processData.body;
        
        // Stockage du token dans localStorage.
        if (credentials.rememberMe) {
            localStorage.setItem('userToken', token);
        } 
        // Stockage du token dans sessionStorage
        else {
            sessionStorage.setItem('userToken', token);
        }

        // Vérification de la présence du token et dispatch de l'action de succès.
        if (token) {
            store.dispatch(loginUserSuccess({ token }));
            return { token };
        } else {
            throw new Error("Token manquant");
        }
    } catch (error) {
        // Gestion des erreurs et envoi de l'échec de connexion.
        console.error('Erreur API lors de la connexion :', error);
        store.dispatch(loginUserFailure(error.toString()));
        throw error;
    }
}

// Fonction pour récupérer le profil de l'utilisateur.
export async function fetchUserProfile(token) {
    try {
        // Appel API pour récupérer le profil.
        const response = await fetch(`${baseURL}/profile`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const responseBody = await response.text();

        // Vérification du type de contenu et récupération des données si c'est du JSON.
        if (response.headers.get("content-type")?.includes("application/json")) {
            const data = JSON.parse(responseBody);
            return data;
        } else {
            throw new Error("La réponse n'est pas du JSON");
        }
    } catch (error) {
        // Gestion des erreurs de récupération de profil.
        console.error('Erreur API lors de la récupération du profil :', error);
        throw error;
    }
}

// Fonction pour enregistrer les modifications du profil de l'utilisateur.
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

    // Traitement et retour de la réponse.
    return await processResponse(response);
}

// Fonction pour déconnecter l'utilisateur.
export function logoutUser() {
    // Retrait du token du localStorage.
    localStorage.removeItem('userToken');
    
    // Dispatch de l'action de déconnexion.
    store.dispatch(logoutUser());  // Correction: devrait probablement être une autre action comme `logoutUserSuccess`
}
