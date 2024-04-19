import "../user/user.scss";
import { useState } from "react";
import Header from "../../components/header/Header";
import UserName from "../../components/userName/UserName";
import signOut from "../../assets/sign-out.svg";
import Account from "../../components/account/Account";
import Footer from "../../components/footer/Footer";
import EditName from "../../components/editName/editName";

const User = ({accountData}) => {

    //définition de l'état pour savoit si l'utilisateur est en mode édition ou non
    const [isEditing, setIsEditing] = useState(false);

    //fonction pour basculer entre le mode édition et l'affichage du nom utilisateur
    const toggleEditClick = () => {
        setIsEditing(!isEditing);
    }

    return (
        <div className="userWrapper">
            {/*prop pour indiquer que le lien "SignOut" doit être */}
            <Header imgSignOut={signOut} textSignOut="sign Out"/>

            <div className="userContent">

                {/*condition pour affihcer le composant "editName" ou "UserName" en fonction de l'état*/}   
            {isEditing ? <EditName/> : <UserName onEditClick={toggleEditClick}/>}
                
                {/*accountData en props*/}
                <Account accountData={accountData}/>
            </div>
            <Footer/>
        </div>
    );
};

export default User;
