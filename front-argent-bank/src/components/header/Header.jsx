import "../header/header.scss";
import Logo from "../../assets/argentBankLogo.png"
import User from "../../assets/user.svg";
import SignOut from "../../assets/sign-out.svg";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const location = useLocation();

    // Affiche "Sign In" sur les pages autres que "/user"
    const displaySignIn = location.pathname !== "/user";

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
                        <img className="iconSignOut" src={SignOut} alt="Icone sign-out"/>
                        <Link to="/"><p>Sign Out</p></Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
