import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            // Si aucun token n'est présent, rediriger vers la page de connexion
            navigate('/signIn');
        }
    }, [token, navigate]);

    // Si le token est présent, rend le contenu de la route
    return token ? children : null;
};

export default PrivateRoute;