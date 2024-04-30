
import { loginUserSuccess, loginUserFailure } from '../redux/slice';
import store from '../redux/store';


const baseURL = 'http://localhost:3001/api/v1/user';

async function processResponse(response) {
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || `Erreur avec l'API. Status: ${response.status}`);
        }
        return data;
    } else {
        const errorHTML = await response.text();
        console.error("Received non-JSON response:", errorHTML);
        throw new Error("Expected JSON, got HTML.");
    }
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
        if (credentials.rememberMe) {
            localStorage.setItem('userToken', token);
        } else {
            sessionStorage.setItem('userToken', token);
        }

        if (token) {
            localStorage.setItem('userToken', token);
            store.dispatch(loginUserSuccess({ token }));
            return { token };
        } else {
    
            throw new Error("Token manquant"); 
        }
    } catch (error) {
        console.error('Erreur API lors de la connexion :', error);
       
        store.dispatch(loginUserFailure(error.toString())); 
    
        throw error; 
    }
}


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
  
        if (response.headers.get("content-type")?.includes("application/json")) {
            const data = JSON.parse(responseBody);
            return data;
        } else {
          
            throw new Error("La réponse n'est pas du JSON"); 
        }
    } catch (error) {
        console.error('Erreur API lors de la récupération du profil :', error);
        throw error;
    }
}


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


export function logoutUser() {
    
    localStorage.removeItem('userToken'); 
    
    store.dispatch(logoutUser()); 
}
