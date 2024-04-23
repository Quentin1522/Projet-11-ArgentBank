import "../header/header.scss";
import Logo from "../../assets/argentBankLogo.png"
import User from "../../assets/user.svg";
import { useState, useEffect } from "react";
//redux
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = (props) => {
 //useLocation() pour obtenir l'url actuelle
 const location = useLocation();

 //vérifie si l'url actuelle correspond ) "/user"
 const isUserPage = location.pathname === "/user";

    return (
        <div className="headerWrapper">
            
            <Link to="/">
                <img src={Logo} alt="logo argent bank"/>
            </Link>

            <div className="sign">
                
                <div className="sign">
                <img className="userIcon" src={User} alt="user icon"/>
                        <Link to="/signIn"><p>Sign In</p></Link>
                </div>

                <div className="signOut">
                                <img className="iconSignOut" src={props.imgSignOut} alt="icone sing-out"/>
                                <Link to="/"><p>Sign Out</p></Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
