import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserName } from '../../redux/slice';
import { saveUserProfile } from '../../Api/api';
import { createSelector } from 'reselect';
import '../editName/editName.scss';

const EditName = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

 const selectProfile = state => state.profile.profile;
const selectAuth = state => state.auth;

const selectUserName = createSelector(
    [selectProfile],
    (profile) => profile.userName
);

const selectToken = createSelector(
    [selectAuth],
    (auth) => auth.token
);

// Dans votre composant
const userName = useSelector(selectUserName);
const token = useSelector(selectToken);
    
    // useState pour gérer la nouvelle valeur du username localement
    const [newUserName, setNewUserName] = useState(userName || '');

    useEffect(() => {
        // Mise à jour du state local lorsque le userName dans le Redux store change
        if (userName) {
            setNewUserName(userName);
        }
    }, [userName]);

    const handlesaveUserProfile = (e) => {
        setNewUserName(e.target.value);
    };

    const handleCancel = () => {
        navigate("/user");
    };

    const handleForm = async (e) => {
        e.preventDefault();
        if (newUserName !== userName) {
            try {
                console.log("Final data sent to server:", JSON.stringify({userName: newUserName}));

console.log("Using token:", token);

await saveUserProfile(token, {userName: newUserName});

                dispatch(updateUserName({userName: newUserName}));
                console.log("Le nom d'utilisateur a bien été modifié.");
                navigate("/user");
            } catch (error) {
                console.error("Erreur lors de la mise à jour du nom d'utilisateur:", error);
            }
        } else {
            navigate("/user");
        }
    };

    return (
        <div className="editNameWrapper">
            <h3>Modifier les informations utilisateur</h3>
            <form onSubmit={handleForm}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={newUserName}
                    onChange={handlesaveUserProfile}
                    placeholder="Tapez votre nouveau username"
                />
                <button type="submit">Enregistrer</button>
                <button type="button" onClick={handleCancel}>Annuler</button>
            </form>
        </div>
    );
};

export default EditName;
