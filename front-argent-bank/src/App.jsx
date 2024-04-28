import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserSuccess } from './redux/slice.js';  // Make sure to define this action in your Redux slice
import "../src/app.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AccountData from "./data/account.json";
import FeaturesData from "./data/features.json";  // Corrected the variable name from FeaturesDate to FeaturesData
import Home from "../src/page/home/Home.jsx";
import SignIn from "../src/page/singIn/SignIn.jsx";  // Corrected directory path
import User from "./page/user/User.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
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
