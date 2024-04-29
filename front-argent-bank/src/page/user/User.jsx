import "../user/user.scss";

// Importation des hooks et composants nécessaires
import { useState } from "react";
import Header from "../../components/header/Header";
import UserName from "../../components/userName/UserName";
import signOut from "../../assets/sign-out.svg"; 
import Account from "../../components/account/Account"; 
import Footer from "../../components/footer/Footer"; 
import EditName from "../../components/editName/editName"; 

// Composant User qui accepte accountData comme prop pour les données de l'utilisateur
const User = ({ accountData }) => {
    // Utilisation du hook useState pour gérer l'état local de mode édition
    const [isEditing, setIsEditing] = useState(false);

    // Fonction pour basculer entre le mode édition et le mode visualisation
    const toggleEditClick = () => {
        // Changer la valeur de isEditing à son opposé
        setIsEditing(!isEditing); 
    }

    return (
        <div className="userWrapper">
            {/* Header avec l'icône et le texte pour se déconnecter */}
            <Header imgSignOut={signOut} textSignOut="Sign Out"/>

            <div className="userContent">
                {/* Affichage conditionnel : EditName si en mode édition, sinon UserName */}
                {isEditing ? <EditName /> : <UserName onEditClick={toggleEditClick} />}
                
                {/* Affichage du composant Account avec les données du compte passées en props */}
                <Account accountData={accountData} />
            </div>
            <Footer />
        </div>
    );
};

export default User;
