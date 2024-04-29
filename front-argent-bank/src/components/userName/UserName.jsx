// Importation des hooks de React et Redux
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Importation des fonctions d'appel d'API et des actions Redux
import { fetchUserProfile } from '../../Api/api';
import { fetchProfileStart, fetchProfileSuccess, fetchProfileFailure } from '../../redux/slice';
import "../userName/userName.scss";

// Composant UserName qui accepte une prop `onEditClick` pour gérer le clic sur le bouton d'édition
const UserName = ({ onEditClick }) => {
    // Utilisation du hook useDispatch pour permettre le dispatch d'actions Redux
    const dispatch = useDispatch();

    // Extraction des données de profil et du token depuis l'état global via useSelector
    const { profile } = useSelector(state => state.profile);
    const { token } = useSelector(state => state.auth);

    // Effet React qui s'exécute à la montée du composant ou lorsque le token change
    useEffect(() => {
        if (token) {
            // Dispatch pour indiquer le début du chargement du profil
            dispatch(fetchProfileStart()); 
            // Appel d'API pour récupérer le profil de l'utilisateur
            fetchUserProfile(token)  
                .then(data => {
                    // Dispatch en cas de succès avec les données du profil
                    dispatch(fetchProfileSuccess(data));  
                })
                .catch(error => {
                    // Dispatch en cas d'échec avec le message d'erreur
                    dispatch(fetchProfileFailure(error.message));  
                });
        }
    }, [dispatch, token]);

    return (
        <div className="userNameWrapper">
            <h1>Welcome back {profile ? <>{profile.firstName} <br/> {profile.lastName}</> : "User"} !</h1>
            <button className="edit-button" onClick={onEditClick}>Edit Name</button>
        </div>
    );
};

export default UserName;
