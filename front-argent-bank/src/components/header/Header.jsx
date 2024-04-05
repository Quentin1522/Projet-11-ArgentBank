import "../header/header.scss";
import { NavLink } from 'react-router-dom';
import Logo from "../../assets/argentBankLogo.png"
import User from "../../assets/user.svg";

const Header = () => {
    return (
        <div className="headerWrapper">
            <img src={Logo} alt="logo argent bank"/>
            <div className="sign">
                <img className="userIcon" src={User} alt="user icon"/>
                <NavLink to="/signIn">Sign In</NavLink>
            </div>
        </div>
    );
};

export default Header;