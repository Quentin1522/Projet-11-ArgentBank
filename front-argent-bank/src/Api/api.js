import { loginUserSuccess, loginUserFailure } from '../redux/slice';
import store from '../redux/store';

const baseURL = 'http://localhost:3001/api/v1/user';

async function processResponse(response) {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue avec l'API");
    }
    return data;
}

export async function loginUser(credentials) {
    try {
        const response = await fetch(`${baseURL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        const processData = await processResponse(response);
        const { token } = processData.body;

        if (!token) {
            throw new Error("Token manquant");
        }

        // Dispatch l'action Redux avec seulement le token
        store.dispatch(loginUserSuccess({ token }));

        return { token };
    } catch (error) {
        console.error('Erreur API lors de la connexion :', error);
        store.dispatch(loginUserFailure(error.toString()));
        throw error;
    }
}



// Fonction pour récupérer le profil de l'utilisateur
export async function fetchUserProfile(token) {
    try {
        const response = await fetch(`${baseURL}/profile`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Response Status:', response.status);
        console.log('Response Headers:', response.headers.get('content-type'));
        const responseBody = await response.text();
        console.log('Response Body:', responseBody);

        if (response.headers.get("content-type")?.includes("application/json")) {
            const data = JSON.parse(responseBody);
            console.log("Parsed Data:", data);
            return data;
        } else {
            throw new Error("La réponse n'est pas du JSON");
        }
    } catch (error) {
        console.error('Erreur API lors de la récupération du profil :', error);
        throw error;
    }
}


// Fonction pour simuler la déconnexion de l'utilisateur
export function logoutUser() {
    console.log('Utilisateur déconnecté');
    // Vous pouvez également gérer la déconnexion côté serveur si nécessaire
}
