import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "../src/page/home/Home.jsx";
import SignIn from "../src/page/singIn/SignIn.jsx";
const App = () => {
  return (
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;