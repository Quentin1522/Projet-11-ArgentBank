import { useState } from 'react';
import "../editName/editName.scss";

const EditName = () => {
    // État local pour les champs
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // Gestion des changements d'input
    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Empêcher le rechargement de la page
        const payload = { username, firstName, lastName };

        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`, // Ajouter cette ligne si une authentification est nécessaire
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Failed to update user info');
            }

            const result = await response.json();
            console.log('Update success:', result);
            // Vous pouvez ajouter des actions post-mise à jour ici, comme rediriger l'utilisateur ou afficher un message de succès
        } catch (error) {
            console.error('Erreur lors de la mise à jour des informations utilisateur:', error);
        }
    };

    return (
        <div className="editNameWrapper">
            <h3>Edit user info</h3>
            <form onSubmit={handleSubmit}>
                <div className="inputContent">
                    <label htmlFor="username">User Name :</label>
                    <input type="text" id="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div className="inputContent">
                    <label htmlFor="firstname">First Name :</label>
                    <input type="text" id="firstname" value={firstName} onChange={handleFirstNameChange} />
                </div>
                <div className="inputContent">
                    <label htmlFor="lastname">Last Name :</label>
                    <input type="text" id="lastname" value={lastName} onChange={handleLastNameChange} />
                </div>
                <div className="buttonContainer">
                    <button type="submit" className="save">Save</button>
                    <button type="button" className="cancel" onClick={() => {
                        setUsername(''); setFirstName(''); setLastName(''); 
                    }}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditName;
