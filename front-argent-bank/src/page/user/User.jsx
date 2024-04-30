import "../user/user.scss";
import { useState } from "react";
import Header from "../../components/header/Header";
import UserName from "../../components/userName/UserName";
import signOut from "../../assets/sign-out.svg"; 
import Account from "../../components/account/Account"; 
import Footer from "../../components/footer/Footer"; 
import EditName from "../../components/editName/editName"; 

const User = ({ accountData }) => {

        // Utilisation de useState pour contrôler si l'utilisateur est en mode édition du nom.
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditClick = () => {
        // Inverse l'état de isEditing
        setIsEditing(!isEditing); 
    }

    return (
        <div className="userWrapper">
            <Header imgSignOut={signOut} textSignOut="Sign Out"/>

            <div className="userContent">
                {/* Condition pour afficher EditName si en mode édition, sinon affiche UserName */}
                {isEditing ? <EditName onCancel={toggleEditClick} /> : <UserName onEditClick={toggleEditClick} />}
                <Account accountData={accountData} />
            </div>
            
            <Footer />
        </div>
    );
};

export default User;
