import { useSelector } from 'react-redux';
import "../profile/profile.scss";

const Profile = () => {
    const user = useSelector(state => state.auth.user);  // Assumons que les détails de l'utilisateur se trouvent ici

    if (!user) {
        return <div>Loading user information...</div>;
    }
    
    return (
        <div className="profile-container">
            <h1>Profile Information</h1>
            <div className="profile-details">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                {/* D'autres informations de profil peuvent être ajoutées ici si disponibles */}
            </div>
            <button>Edit Profile</button> {/* Bouton d'édition, implémentation à ajouter */}
        </div>
    );
};

export default Profile;
