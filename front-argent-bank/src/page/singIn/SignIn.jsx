import { useState } from "react";
import "../singIn/singIn.scss";
import User from "../../assets/user.svg";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser as apiLoginUser, fetchUserProfile } from '../../Api/api';
import { loginUserSuccess } from '../../redux/slice';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

// Composant SignIn pour la gestion des connexions utilisateurs
const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Hooks d'état pour la gestion de l'interface de connexion
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Gère l'état de la checkbox "Remember me"
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    // Fonction appelée lors de la soumission du formulaire
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log("Tentative de connexion avec :", email, password);

        try {
            // Appel API pour la connexion utilisateur
            const response = await apiLoginUser({ email, password });
            console.log("Réponse de connexion:", response);
            const { token } = response;

            if (!token) {
                throw new Error("Token manquant");
            }
            console.log("Token reçu:", token);

            // Stockage du token en fonction de l'option "Remember Me"
            if (rememberMe) {
                localStorage.setItem('token', token);
            } else {
                sessionStorage.setItem('token', token);
            }

            try {
                // Récupération du profil utilisateur après connexion réussie
                const userProfile = await fetchUserProfile(token);
                dispatch(loginUserSuccess({ user: userProfile, token }));
            } catch (err) {
                console.error("Erreur lors de la récupération du profil utilisateur :", err);
                setError("Impossible de retrouver les détails de l'utilisateur.");
            }

            // Redirection vers la page utilisateur
            navigate('/user');
        } catch (err) {
            console.error("Échec de la connexion :", err);
            // Gestion de l'affichage des erreurs de connexion
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
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            <label htmlFor="rememberMe">Remember me</label>
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
