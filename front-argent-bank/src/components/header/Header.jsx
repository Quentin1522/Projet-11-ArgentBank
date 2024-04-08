import "../header/header.scss";
import Logo from "../../assets/argentBankLogo.png"
import User from "../../assets/user.svg";
import { Link } from 'react-router-dom';



const Header = () => {
    return (
        <div className="headerWrapper">
            <Link to="/Home"><img src={Logo} alt="logo argent bank"/></Link>
            <div className="sign">
                <img className="userIcon" src={User} alt="user icon"/>
                <Link to="/signIn"><p>Sign In</p></Link>
            </div>
        </div>
    );
};

export default Header;