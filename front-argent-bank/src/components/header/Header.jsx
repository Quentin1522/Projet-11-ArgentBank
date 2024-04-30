import "../header/header.scss";
import Logo from "../../assets/argentBankLogo.png"
import User from "../../assets/user.svg";
import SignOut from "../../assets/sign-out.svg";


import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Header = () => {
    // Sélecteur Redux pour accéder aux données de profil de l'utilisateur depuis l'état global
    const profile = useSelector(state => state.profile.profile);

    // Hook pour accéder à l'emplacement actuel dans l'application (URL/path)
    const location = useLocation();

    // Détermine si "Sign In" doit être affiché en se basant sur la route actuelle
    const displaySignIn = location.pathname !== "/user";

    // Extraire le prénom de l'utilisateur pour l'affichage, si les données de profil sont disponibles
    const username = profile ? profile.userName : null;

    return (
        <div className="headerWrapper">
            <Link to="/">
                <img src={Logo} alt="Argent Bank logo" className="logo"/>
            </Link>
            
            <div className="authentication-links">
                {displaySignIn ? (
                    // Affiche "Sign In" sauf sur la page "/user"
                    <div className="sign">
                        <img className="userIcon" src={User} alt="User icon"/>
                        <Link to="/signIn"><p>Sign In</p></Link>
                    </div>
                ) : (
                    // Affiche "Sign Out" uniquement sur la page "/user"
                    <div className="signOut">
                        <img className="iconSignOut" src={User} alt="User icon"/>
                        <Link className="userName" to="/profile"><p>{username}</p></Link>  
                        
                        <img className="iconSignOut" src={SignOut} alt="Icon sign-out"/>
                        <Link to="/"><p>Sign Out</p></Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
