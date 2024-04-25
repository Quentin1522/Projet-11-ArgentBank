import { useState } from "react";
import "../singIn/singIn.scss";
import User from "../../assets/user.svg";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser as apiLoginUser, fetchUserProfile } from '../../Api/api';
import { loginUserSuccess } from '../../redux/slice';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await apiLoginUser({ email, password });
            const { token } = response;
            
            if (!token) {
                throw new Error("Token manquant");
            }
            
            localStorage.setItem('token', token);

            try {
                const userProfile = await fetchUserProfile(token);
                dispatch(loginUserSuccess({ user: userProfile, token }));
            } catch (err) {
                console.error("Échec lors de la récupération du profil utilisateur:", err);
                setError("Impossible de retrouver les détails de l'utilisateur.");
            }

            navigate('/user');
        } catch (err) {
            console.error("Échec de connexion :", err);
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
