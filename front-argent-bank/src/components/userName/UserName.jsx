import "../userName/userName.scss";
import { useSelector } from "react-redux";

const UserName = ({onEditClick}) => {
    return (
        <div className="userNameWrapper">
                <h1>Welcome back <br/>!</h1>

                {/*ajout d'un gestionnaire d'évenement onClick qui déclanche la fonction de basculement*/}
                <button className="edit-button" onClick={onEditClick}>Edit Name</button>
        </div>
    );
};

export default UserName;