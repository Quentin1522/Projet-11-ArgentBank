import "../editName/editName.scss";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/slice';  // Assurez-vous que l'action est correctement importée

const EditName = () => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.profile);

    // Initialisation des champs avec les valeurs actuelles du profil
    const [firstName, setFirstName] = useState(profile ? profile.firstName : '');
    const [lastName, setLastName] = useState(profile ? profile.lastName : '');

    // Gestionnaires de changements de champs
    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);

    // Gestionnaire de soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        // Mise à jour du profil dans le store Redux
        dispatch(updateProfile({ firstName, lastName }));
    };

    const handleCancel = () => {
        // Réinitialiser les champs
        setFirstName(profile ? profile.firstName : '');
        setLastName(profile ? profile.lastName : '');
    };

    return (
        <div className="editNameWrapper">
            <h3>Modifier les informations utilisateur</h3>
            <form onSubmit={handleSubmit}>
                <div className="inputContent">
                    <label htmlFor="firstname">Prénom :</label>
                    <input type="text" id="firstname" value={firstName} onChange={handleFirstNameChange} />
                </div>
                <div className="inputContent">
                    <label htmlFor="lastname">Nom :</label>
                    <input type="text" id="lastname" value={lastName} onChange={handleLastNameChange} />
                </div>
                <div className="buttonContainer">
                    <button type="submit" className="save">Save</button>
                    <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditName;
