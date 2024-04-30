import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { updateUserName } from '../../redux/slice';
import { saveUserProfile } from '../../Api/api';
import { createSelector } from 'reselect';
import '../editName/editName.scss';

//prop onCancel pour annuler les modifications du username
const EditName = ({ onCancel }) => {

    // Hooks de React Router et Redux pour la navigation et la gestion d'état
    const navigate = useNavigate();
    const dispatch = useDispatch();

// Sélectionneur qui accède à la partie 'profile' du state global et en extrait le profil utilisateur. 
const selectProfile = state => state.profile.profile;

// Sélectionneur qui accède à la partie 'auth' du state global.
const selectAuth = state => state.auth;

// Création d'un sélecteur  pour extraire 'userName' de 'profile'.
const selectUserName = createSelector(
[selectProfile],  // Dépendance : le sélecteur qui extrait 'profile' du state
    (profile) => profile.userName  // Fonction pour extraire 'userName' de 'profile'
);

// Création d'un autre sélecteur pour extraire 'token' de 'auth'.
const selectToken = createSelector(
    [selectAuth],  // Dépendance : le sélecteur qui extrait 'auth' du state
    (auth) => auth.token  // Fonction pour extraire 'token' de 'auth'
);

// Utilisation de `useSelector` pour lire 'userName' à partir du state Redux.
const userName = useSelector(selectUserName);

// Utilisation de `useSelector` pour lire 'token' à partir du state Redux.
const token = useSelector(selectToken);


    // State local pour gérer le nouveau nom d'utilisateur
    const [newUserName, setNewUserName] = useState(userName || '');

    // Effet pour mettre à jour le state local lorsque le userName change
    useEffect(() => {
        if (userName) {
            setNewUserName(userName);
        }
    }, [userName]);

    // Handle pour mettre à jour le state local lors de la saisie dans le champ de texte
    const handleSaveUserProfile = (e) => {
        setNewUserName(e.target.value);
    };

    // Handle pour soumettre le formulaire, mettre à jour le profil utilisateur via une API et le state Redux
    const handleForm = async (e) => {
         // Empêche le comportement par défaut de soumission de formulaire qui rafraîchit la page
        e.preventDefault();
    // Vérifie si le nouveau nom d'utilisateur est différent de l'actuel
    if (newUserName !== userName) {
        try {
            // Appel asynchrone à l'API pour sauvegarder le nouveau nom d'utilisateur avec le token d'authentification
            await saveUserProfile(token, {userName: newUserName});

            // Si l'API réussit, met à jour le nom d'utilisateur dans le store Redux
            dispatch(updateUserName({userName: newUserName}));

            // Redirection de l'utilisateur vers la page de profil
            navigate("/user");
        } catch (error) {
            // Gestion des erreurs, par exemple en cas d'échec de la communication avec l'API
            console.error("Erreur lors de la mise à jour du nom d'utilisateur:", error);
        }
    } else {
        // Si le nom d'utilisateur n'a pas été modifié, redirige simplement vers la page de profil
        navigate("/user");
    }
    };

    return (
        <div className="editNameWrapper">
            <h3>Modifier les informations utilisateur</h3>
            <form onSubmit={handleForm}>
                <div className='inputContent'>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={newUserName} onChange={handleSaveUserProfile} />
                </div>
                <div className='buttonContainer'>
                    <button type="submit" className="save">Enregistrer</button>
                    <button type="button" className="cancel" onClick={onCancel}>Annuler</button>
                </div>
            </form>
        </div>
    );
};

export default EditName;
