import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../Api/api';
import { fetchProfileStart, fetchProfileSuccess, fetchProfileFailure } from '../../redux/slice';
import "../userName/userName.scss";

const UserName = ({ onEditClick }) => {
    const dispatch = useDispatch();
    const { profile } = useSelector(state => state.profile);
    console.log("Profile in UserName Component:", profile);
    
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        if (token) {
            dispatch(fetchProfileStart());
            fetchUserProfile(token)
                .then(data => {
                    console.log(data);
                    dispatch(fetchProfileSuccess(data));
                })
                .catch(error => {
                    dispatch(fetchProfileFailure(error.message));
                });
        }
    }, [dispatch, token]);

    return (
        <div className="userNameWrapper">
            {/* Utilisez profile.firstName si l'objet profile contient un champ firstName */}
            <h1>Welcome back {profile ? profile.firstName : "User"} !</h1>
            <button className="edit-button" onClick={onEditClick}>Edit Name</button>
        </div>
    );
};

export default UserName;
