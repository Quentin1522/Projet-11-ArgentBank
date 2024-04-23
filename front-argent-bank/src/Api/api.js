const baseURL = 'http://localhost:3001/api/v1/user';

// Fonction utilitaire pour traiter les réponses de l'API
async function processResponse(response) {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue avec l'API");
    }
    return data;
}

// Fonction pour gérer la connexion de l'utilisateur
export async function loginUser(credentials) {
    try {
        const response = await fetch(`${baseURL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        const processData = await processResponse(response);
        const { token } = processData.body; // Accédez au token à travers l'objet body 

        if (!token) {
            throw new Error("Token manquant"); // Vérifiez si le token est présent
        }

        // Réussi, retourne le token et potentiellement décode le user depuis le token si nécessaire
        return { user: null, token }; // Temporairement user est null si non retourné par l'API
    } catch (error) {
        console.error('Erreur API lors de la connexion :', error);
        throw error;
    }
}


// Fonction pour récupérer le profil de l'utilisateur
export async function fetchUserProfile(token) {
    try {
        const response = await fetch(`${baseURL}/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.headers.get("content-type").includes("application/json")) {
            return await response.json();
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
