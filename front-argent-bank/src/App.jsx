import "../src/app.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "../src/page/home/Home.jsx";
import SignIn from "../src/page/singIn/SignIn.jsx";
import User from "./page/user/User.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/home" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
