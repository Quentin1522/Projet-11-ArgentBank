import "../userName/userName.scss";

const UserName = () => {
    return (
        <div className="userNameWrapper">
                <h1>Welcome back <br/> Tony Jarvis!</h1>
                <button className="edit-button">Edit Name</button>
        </div>
    );
};

export default UserName;