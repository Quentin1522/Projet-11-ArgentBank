import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { loginUserSuccess, loginUserFailure } from './redux/slice';
import "./app.scss";

import AccountData from "./data/account.json";  
import FeaturesData from "./data/features.json";  
import Home from "./page/home/Home";  
import SignIn from "./page/singIn/SignIn";
import User from "./page/user/User";
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    const dispatch = useDispatch();
// useEffect est utilisé ici pour exécuter le code à l'intérieur une fois que le composant est monté
useEffect(() => {
  // Récupération du token de l'utilisateur depuis localStorage
  const rememberedToken = localStorage.getItem('userToken');
  // Récupération du token de l'utilisateur depuis sessionStorage
  const sessionToken = sessionStorage.getItem('userToken');

  // Condition pour vérifier l'existence des tokens et leur origine
  if (!rememberedToken && sessionToken) {
      // S'il n'y a pas de token dans localStorage mais un dans sessionStorage
      // on considère que l'utilisateur est connecté pour la session en cours uniquement
      dispatch(loginUserSuccess({ token: sessionToken }));
  } else if (rememberedToken) {
      // Si un token est trouvé dans localStorage, on le considère comme une connexion
      dispatch(loginUserSuccess({ token: rememberedToken }));
  } else {
      // Si aucun token n'est trouvé ni dans localStorage ni dans sessionStorage,
      // on envoie une action échec avec un message demandant de se connecter.
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
