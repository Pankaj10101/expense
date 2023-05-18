import Navbar from "./Components/Header/Navbar";
import "./App.css";
import SignUp from "./Components/SignUp/SignUp";
import Home from "./Components/Home/Home";
import { Routes, Route } from "react-router-dom";
import SignIn from "./Components/SignIn.jsx/SignIn";
import UpdateProfile from "./Components/Profile/UpdateProfile";
import Context from "./Context/context";

function App() {
    
  return (
    <>
      <Context>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={<UpdateProfile />}
          />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </Context>
    </>
  );
}

export default App;
