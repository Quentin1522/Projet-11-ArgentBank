import { useState } from "react";
import "../singIn/singIn.scss";
import User from "../../assets/user.svg";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
// Redux
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/authActions';

const SignIn = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(''); // État local pour stocker les erreurs de connexion

    // Gestionnaire d'événement pour la soumission du formulaire de connexion
    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        try {
            const response = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }

            const data = await response.json();

            // Stocke le token dans le localStorage
            localStorage.setItem('token', data.token);

            // Dispatch de l'action loginUser avec les données de l'utilisateur
            dispatch(loginUser(data));

            // Redirection vers la page utilisateur après la connexion réussie
            window.location.href = '/user';
        } catch (error) {
            // Si une erreur se produit lors de la connexion, affiche un message d'erreur
            console.error("Login failed:", error);
            setError("L'adresse mail ou le mot de passe n'est pas correct.");
        }
    };

    return (
        <div className="signInWrapper">
            <Header />
            <div className="formContainer">
                <div className="formWrapper">
                    <img className="userIcon" src={User} alt="icon user" />
                    <h1>Sign In</h1>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" />
                        </div>
                        <button type="submit" className="sign-in-button">Sign In</button>
                    </form>
                    {error && <div className="errorForm">{error}</div>} {/* Affiche l'erreur si elle est définie */}
                </div>
            </div>
            <Footer className="footer" />
        </div>
    );
};

export default SignIn;
