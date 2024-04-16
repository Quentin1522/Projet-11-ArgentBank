import { useState } from "react";
import "../singIn/singIn.scss";
import { Link } from 'react-router-dom';
import User from "../../assets/user.svg";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer"

//redux
import {loginUser} from "../../redux/authActions";
import {useDispatch} from 'react-redux';

const SignIn = () => {
    //initalise useDispatch pour envoyer des actions redux
    const dispatch = useDispatch();

    //états locaux pour stocker les valeurs des champs du formaulaire
    const [username, setUsername] = useState(''); //vide pour stocker la valeur
    const [password, setPassword] = useState(''); //vide pour stocker la valeur
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    //fonction de gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        //empêche le comportement par défaut de soumission du formulaire
        e.preventDefault();

        //vérification du nom d'utilisateur
        if(!username){
            setUsernameError('Username is required');
            return;
        }

        //vérification du mot de passe
        if(!password){
            setPasswordError('Passoword is required');
            return;
        }

        try{
            //envoie de la requête ) l'API pour obtenir le token
            const response = await fetch('http://localhost:3001/api/v1/user/login',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            if (response.ok){
                const data = await response.json();
                const token = data.token;

                //disâtch de l'action loginUser avec le token obtenu
                dispatch(loginUser({token}));
            } else {
                //traiter les erreurs ici
                console.error('ERROR logging in :', response.statusText);
            }
        } catch (error) {
            //traiter les erreurs ici
            console.error('ERROR logging in :', error);
        }

        //si les deux chamaps sont remplis, réinitialise les erreurs
        //et envoie les informations d'indentifications à Redux
        setUsername('');
        setPassword('');

    //envoie les informationsd'identifications de l'utilisateur à l'action Redux
    dispatch(loginUser({username, password}));
    }

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