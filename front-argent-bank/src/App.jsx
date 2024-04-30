// Importation des hooks et utilitaires nécessaires de React, React Router, et Redux
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

// Actions Redux pour gérer le succès de connexion
import { loginUserSuccess, loginUserFailure } from './redux/slice';

import { fetchUserProfile } from './Api/api';
import "./app.scss"; 


// Importation des données statiques et des composants
import AccountData from "./data/account.json";  
import FeaturesData from "./data/features.json";  
import Home from "./page/home/Home";  
import SignIn from "./page/singIn/SignIn";  
import User from "./page/user/User";  
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Assurez-vous que la clé ici correspond à ce que vous avez utilisé dans l'API lors de la sauvegarde
    const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
    if (token) {
        fetchUserProfile(token).then(userProfile => {
            dispatch(loginUserSuccess({ user: userProfile, token }));
        }).catch(err => {
            console.error("Failed to fetch user profile:", err);
            dispatch(loginUserFailure("Failed to fetch user profile."));
        });
    } else {
        dispatch(loginUserFailure("No token found, please log in."));
    }
}, [dispatch]);


  return (
<BrowserRouter>
    <Routes>
        <Route path="/" element={<Home featuresData={FeaturesData} />} />  
        <Route path="/signIn" element={<SignIn />} />  
        <Route path="/user" element={
            <PrivateRoute>
                <User accountData={AccountData} />
            </PrivateRoute>
        } /> 
    </Routes>
</BrowserRouter>

  );
};

export default App;
