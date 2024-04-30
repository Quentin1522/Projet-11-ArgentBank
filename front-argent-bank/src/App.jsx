// Importation des hooks et utilitaires nécessaires de React, React Router, et Redux
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

// Actions Redux pour gérer le succès de connexion
import { loginUserSuccess, loginUserFailure } from './redux/slice';
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
    const rememberedToken = localStorage.getItem('userToken'); 
    const sessionToken = sessionStorage.getItem('userToken'); 

    if (!rememberedToken && sessionToken) {
        dispatch(loginUserSuccess({ token: sessionToken }));
    } else if (rememberedToken) {
        // Si un token 'permanent' est trouvé
        dispatch(loginUserSuccess({ token: rememberedToken }));
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
