import { useState } from "react";
import "../singIn/singIn.scss";
import { Link } from 'react-router-dom';
import User from "../../assets/user.svg";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer"

//redux
import { loginUser } from "../../redux/authActions";
import {useDispatch} from 'react-redux';

const SignIn = () => {
    //initalise useDispatch pour envoyer des actions redux
    const dispatch = useDispatch();

    //états locaux pour stocker les valeurs des champs du formaulaire
    const [username, setUsername] = useState(''); //vide pour stocker la valeur
    const [password, setPassword] = useState(''); //vide pour stocker la valeur

    //fonction de gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        //empêche le comportement par défaut de soumission du formulaire
        e.preventDefault();
    }

    //envoie les informationsd'identifications de l'utilisateur à l'action Redux
    dispatch(loginUser({username, password}));

    return (
        <div className="signInWrapper">
            <Header/>
            <div className="formContainer">
                <div className="formWrapper">
                    <img className="userIcon" src={User} alt="icon user"/>
                    <h1>Sign In</h1>
                    <form>

                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                    </div>

                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>

                    <Link className="sign-in-button" to="/user"><p>Sign In</p></Link>
                    </form>
                </div>
            </div>
            <Footer className="footer"/>
        </div>
    );
};

export default SignIn;