import { useState } from "react";
import "../singIn/singIn.scss";
import User from "../../assets/user.svg";  
import { useDispatch } from 'react-redux';  
import { useNavigate } from 'react-router-dom';  
// Fonctions d'API pour se connecter et récupérer le profil utilisateur
import { loginUser as apiLoginUser, fetchUserProfile } from '../../Api/api';  
// Action Redux à dispatcher en cas de succès
import { loginUserSuccess } from '../../redux/slice';  
import Header from "../../components/header/Header";  
import Footer from "../../components/footer/Footer";  

const SignIn = () => {
     // Permet de dispatcher des actions Redux
    const dispatch = useDispatch(); 
    // Permet de naviguer programmablement
    const navigate = useNavigate();  
    // Gestion de l'état pour l'email
    const [email, setEmail] = useState('');  
    // Gestion de l'état pour le mot de passe
    const [password, setPassword] = useState(''); 
    // Gestion de l'état pour les erreurs 
    const [error, setError] = useState('');  

    // Fonction exécutée lors de la soumission du formulaire
    const onSubmit = async (event) => {
        // Empêche le comportement par défaut du formulaire
        event.preventDefault();  
        try {
            const response = await apiLoginUser({ email, password }); 
            // Extrait le token de la réponse
            const { token } = response;  
            
            // Si aucun token n'est récupéré, lève une exception
            if (!token) {
                throw new Error("Token manquant");
            }
             // Stocke le token dans le localStorage
            localStorage.setItem('token', token); 

            try {
                // Tente de récupérer le profil de l'utilisateur
                const userProfile = await fetchUserProfile(token);
                // Dispatch l'action de succès avec le profil et le token
                dispatch(loginUserSuccess({ user: userProfile, token }));  
            } catch (err) {
                console.error("Échec lors de la récupération du profil utilisateur:", err);
                // Affiche une erreur si échec du chargement du profil
                setError("Impossible de retrouver les détails de l'utilisateur.");  
            }
// Redirection vers la page utilisateur
            navigate('/user');  
        } catch (err) {
            console.error("Échec de connexion :", err);
            // Gestion de l'erreur de connexion
            setError(err.message || "L'adresse mail ou le mot de passe n'est pas correct.");  
        }
    };

    return (
        <div className="signInWrapper">
            <Header />
            <div className="formContainer">
                <div className="formWrapper">
                    <h1>Sign In</h1>
                    <img className="userIcon" src={User} alt="User icon" />
                    <form onSubmit={onSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                 // Met à jour l'email à chaque changement
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                // Met à jour le mot de passe à chaque changement
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                            />
                        </div>
                        <button type="submit" className="sign-in-button">Sign In</button>
                    </form>
                    {error && <div className="errorForm">{error}</div>}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignIn;
