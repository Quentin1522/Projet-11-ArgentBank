import "../header/header.scss";
import Logo from "../../assets/argentBankLogo.png"
import User from "../../assets/user.svg";
import { Link, useLocation } from 'react-router-dom';


const Header = (props) => {

    //useLocation() pour obtenir l'url actuelle
    const location = useLocation();

    //vérifie si l'url actuelle correspond ) "/user"
    const isUserPage = location.pathname === "/user";

    return (
        <div className="headerWrapper">
            <Link to="/home"><img src={Logo} alt="logo argent bank"/></Link>
            <div className="sign">
                <img className="userIcon" src={User} alt="user icon"/>
                <Link to="/signIn"><p>Sign In</p></Link>

                {/*afficge les élément props (icone signOut et text signOut) uniquement si c'est la page user*/}
                {isUserPage &&(
                        <>
                            <img className="iconSignOut" src={props.imgSignOut} alt="icone sing-out"/>
                            <Link to="/home"><p>Sign Out</p></Link>
                        </>
                )}
            </div>
        </div>
    );
};

export default Header;