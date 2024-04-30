import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { updateUserName } from '../../redux/slice';
import { saveUserProfile } from '../../Api/api';
import { createSelector } from 'reselect';
import '../editName/editName.scss';

const EditName = ({ onCancel }) => {  // Correction ici pour les props
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectProfile = state => state.profile.profile;
    const selectAuth = state => state.auth;
    const selectUserName = createSelector([selectProfile], (profile) => profile.userName);
    const selectToken = createSelector([selectAuth], (auth) => auth.token);
    const userName = useSelector(selectUserName);
    const token = useSelector(selectToken);
    
    const [newUserName, setNewUserName] = useState(userName || '');

    useEffect(() => {
        if (userName) {
            setNewUserName(userName);
        }
    }, [userName]);

    const handleSaveUserProfile = (e) => {
        setNewUserName(e.target.value);
    };

    const handleForm = async (e) => {
        e.preventDefault();
        if (newUserName !== userName) {
            try {
                await saveUserProfile(token, {userName: newUserName});
                dispatch(updateUserName({userName: newUserName}));
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
