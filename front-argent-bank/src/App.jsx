import "../src/app.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AccountData from "./data/account.json";
import FeaturesDate from "./data/features.json";
import Home from "../src/page/home/Home.jsx";
import SignIn from "../src/page/singIn/SignIn.jsx";
import User from "./page/user/User.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home featuresData={FeaturesDate} />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/user" element={<User accountData={AccountData} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
