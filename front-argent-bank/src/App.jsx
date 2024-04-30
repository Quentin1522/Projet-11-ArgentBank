// Importation des hooks et utilitaires nécessaires de React, React Router, et Redux
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

// Actions Redux pour gérer le succès de connexion
import { loginUserSuccess, loginUserFailure } from './redux/slice';

// Importation des styles
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
    // Récupération du token utilisateur depuis le stockage local
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      // Si un token est trouvé, dispatch de l'action loginUserSuccess
      dispatch(loginUserSuccess({ token }));
    } else {
      // Optionnel : Gérer le cas où aucun token n'est trouvé
      // Vous pourriez vouloir rediriger l'utilisateur vers la page de connexion ou afficher une notification
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
