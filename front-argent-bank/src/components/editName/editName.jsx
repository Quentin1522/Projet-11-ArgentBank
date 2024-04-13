import "../editName/editName.scss"

const editName = () => {
    return (
        <div className="editNameWrapper">
            <h3>Edit user info</h3>
            <form>

                <label htmlFor="username">User Name :</label>
                <input type="text" id="username" />

                <label htmlFor="firstname">First Name : </label>
                <input type="text" id="firstname" />

                <label htmlFor="lastname">Last Name :</label>
                <input type="text" id="lastname" />

                <div className="buttonContainer">
                    <button className="save">Save</button>
                    <button className="cancel">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default editName;