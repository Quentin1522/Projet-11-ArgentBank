import "../editName/editName.scss";
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/slice';  // Assurez-vous que l'action est correctement importée
import { saveUserProfile } from "../../Api/api";

const EditName = () => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.profile);

    // Initialisation des champs avec les valeurs actuelles du profil
    const [firstName, setFirstName] = useState(profile ? profile.firstName : '');

    // Synchronisation à l'état du profil dans Redux
    useEffect(() => {
        if (profile) {
            setFirstName(profile.firstName);
        }
    }, [profile]); 

    // Gestionnaire pour les changements de l'input
    const handleFirstNameChange = useCallback((event) => {
        setFirstName(event.target.value);
    }, []);

    // Gestionnaire du formulaire
    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('userToken');
        if (!token) {
            console.error('No token found, please log in again.');
            return;
        }

        try {
            // Save updated profile
            const response = await saveUserProfile(token, { firstName });
            if (response.status === 200) {
                dispatch(updateProfile(response.body));  // Mise à jour du state Redux
                console.log('Profile successfully updated:', response.body);
            } else {
                console.error('Failed to update profile:', response);
            }
        } catch (error) {
            console.error('Error while saving profile:', error);
        }
    }, [firstName, dispatch]);

    // Gestionnaire pour annuler les modifications
    const handleCancel = useCallback(() => {
        setFirstName(profile ? profile.firstName : '');  // Réinitialisation avec la valeur du state Redux
    }, [profile]);

    return (
        <div className="editNameWrapper">
            <h3>Modifier les informations utilisateur</h3>
            <form onSubmit={handleSubmit}>
                <div className="inputContent">
                    <label htmlFor="firstname">Prénom:</label>
                    <input
                        type="text"
                        id="firstname"
                        value={firstName}
                        onChange={handleFirstNameChange}
                    />
                </div>
                <div className="buttonContainer">
                    <button type="submit" className="save">Enregistrer</button>
                    <button type="button" className="cancel" onClick={handleCancel}>Annuler</button>
                </div>
            </form>
        </div>
    );
};

export default EditName;
