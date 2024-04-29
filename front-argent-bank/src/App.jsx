// Importation des hooks et utilitaires nécessaires de React, React Router, et Redux
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
 // Action Redux pour gérer le succès de connexion
import { loginUserSuccess } from './redux/slice.js';
import "../src/app.scss"; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import AccountData from "./data/account.json";  
import FeaturesData from "./data/features.json";  
import Home from "../src/page/home/Home.jsx";  
import SignIn from "../src/page/singIn/SignIn.jsx";  
import User from "./page/user/User.jsx";  

const App = () => {
  // Hook useDispatch pour permettre le dispatch d'actions Redux
  const dispatch = useDispatch();

  useEffect(() => {
    // Récupération du token utilisateur depuis le stockage local
    const token = localStorage.getItem('userToken');
    // Si un token est trouvé, dispatch de l'action loginUserSuccess
    if (token) {
      dispatch(loginUserSuccess({ token }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home featuresData={FeaturesData} />} />  
        <Route path="/signIn" element={<SignIn />} />  
        <Route path="/user" element={<User accountData={AccountData} />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;
