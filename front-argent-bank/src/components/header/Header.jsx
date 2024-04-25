import "../header/header.scss";
import Logo from "../../assets/argentBankLogo.png"
import User from "../../assets/user.svg";
import SignOut from "../../assets/sign-out.svg";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const profile = useSelector(state => state.profile.profile); // Assurez-vous que ce chemin correspond à celui que vous utilisez

    const location = useLocation();
    const displaySignIn = location.pathname !== "/user";

    // Optionnel: Destructurer pour obtenir le username
    const username = profile ? profile.firstName : null; // Utiliser 'userName' ou la propriété correspondante

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
                        <img className="iconSignOut" src={User} alt="Icone sign-out"/>
                        <Link to="/profile"><p>{username}</p></Link>  

                        <img className="iconSignOut" src={SignOut} alt="Icone sign-out"/>
                        <Link to="/"><p>Sign Out</p></Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
