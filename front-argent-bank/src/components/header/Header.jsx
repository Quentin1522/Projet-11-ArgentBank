import "../header/header.scss";
import Logo from "../../assets/argentBankLogo.png";
import User from "../../assets/user.svg";
import SignOut from "../../assets/sign-out.svg";

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slice'; 

const Header = () => {
    // Hook pour dispatcher des actions Redux
    const dispatch = useDispatch();
    // Sélecteurs Redux pour obtenir des données du store
    const profile = useSelector(state => state.profile.profile);
    const token = useSelector(state => state.auth.token);
    
    // Fonction appelée lors du clic sur le lien "Sign Out"
    const handleLogout = () => {
        // Suppression du token depuis le stockage local et de session
        localStorage.removeItem('userToken'); 
        sessionStorage.removeItem('userToken');
        // Dispatch de l'action de déconnexion
        dispatch(logoutUser()); 
    };

    return (
        <div className="headerWrapper">
            {/* Lien vers la page d'accueil avec le logo */}
            <Link to="/">
                <img src={Logo} alt="Argent Bank logo" className="logo"/>
            </Link>
            
            {/* Liens de connexion/déconnexion basés sur l'état du token */}
            <div className={"authentication-links " + (!token && "signIn")}>
                {!token ? (
                    // Bloc affiché quand l'utilisateur n'est pas connecté
                    <div className="sign">
                        <img className="userIcon" src={User} alt="User icon" />
                        <Link to="/signIn">Sign In</Link>
                    </div>
                ) : (
                    // Bloc affiché quand l'utilisateur est connecté
                    <div className="signOut">
                        <img className="iconSignOut" src={User} alt="User icon"/>
                        <Link className="userName" to="/user">{profile.userName || 'Your Account'}</Link>
                        <img className="iconSignOut" src={SignOut} alt="Icon sign-out"/>
                        {/* Lien qui déclenche la déconnexion */}
                        <Link to="/" onClick={handleLogout}>Sign Out</Link>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Header;
