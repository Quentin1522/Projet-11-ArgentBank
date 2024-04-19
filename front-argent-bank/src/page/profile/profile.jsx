const profile = (userData) => {

    //fonction pour récupérer les données du profil utilisateur depuis l'API
    async function fetchUserProfile() {
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
            });
        if (!responce.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const userProfilData = await response.json();
        //retourne les données du profil utilisateur
        return userProfilData;
    } catch (error) {
        console.error ('Error fetching user profile :', error);
        //lance une nouvelle erreur pour la gérer à un niveau supérieur si nécessaire
        throw error; 
    }
}

    //userData contient les informations du profil de l'utilisateur
    const {name, email} = userData;
    
    return (
        <div className="profile">
            <h2>Profile</h2>
            <div>
                <p>Nom :{name}</p>
                <p>Email : {email}</p>
            </div>
        </div>
    );
};

export default profile;