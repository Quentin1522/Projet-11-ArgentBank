import "../header/header.scss";
import Logo from "../../assets/argentBankLogo.png";
import User from "../../assets/user.svg";
import SignOut from "../../assets/sign-out.svg";

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slice'; 

const Header = () => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.profile);
    const token = useSelector(state => state.auth.token);
    
    const handleLogout = () => {
        localStorage.removeItem('userToken'); 
        sessionStorage.removeItem('userToken'); 
        dispatch(logoutUser()); 
    };

    return (
        <div className="headerWrapper">
            <Link to="/">
                <img src={Logo} alt="Argent Bank logo" className="logo"/>
            </Link>
            
            <div className={"authentication-links " + (!token && "signIn")}>
                {!token ? (
                    <div className="sign">
                        <img className="userIcon" src={User} alt="User icon" />
                        <Link to="/signIn">Sign In</Link>
                    </div>
                ) : (
                    <div className="signOut">
                        <img className="iconSignOut" src={User} alt="User icon"/>
                        <Link className="userName" to="/user">{profile.userName || 'Your Account'}</Link>
                        <img className="iconSignOut" src={SignOut} alt="Icon sign-out"/>
                        <Link to="/" onClick={handleLogout}>Sign Out</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
