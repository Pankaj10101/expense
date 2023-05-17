import Navbar from "./Components/Header/Navbar";
import "./App.css";
import SignUp from "./Components/SignUp/SignUp";
import Home from "./Components/Home/Home";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import SignIn from "./Components/SignIn.jsx/SignIn";
import { useEffect, useState } from "react";
import UpdateProfile from "./Components/Profile/UpdateProfile";

function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [isCompleteProfile, setIsCompleteProfile] = useState(false)

  const getProfileData = async (token)=>{
    const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDo-GMUlH9BQyAiH-8WzkaPymtrR5opfKw', {
      idToken:token
    })
    const data = response.data
    if(data.users){
      setIsCompleteProfile(true)
    }else{
      setIsCompleteProfile(false)
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("loginId");
    if (token) {
      getProfileData(token)
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);
  const onSignup = async (email, password) => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDo-GMUlH9BQyAiH-8WzkaPymtrR5opfKw",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );

      if (response.status === 200) {
        console.log("Signup successful");
        navigate("/");
        alert("SignUp Successfull");
        return true;
      } else {
        console.log("Signup failed");
        return false;
      }
    } catch (error) {
      alert("SignUp Failed");
      console.log(error.message);
      return false;
    }
  };

  const onSignIn = async (email, password) => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDo-GMUlH9BQyAiH-8WzkaPymtrR5opfKw",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      const data = await response.data;
      if (response.status == 200) {
        localStorage.setItem("loginId", data.idToken);
        setIsLogin(true);
      } else {
        console.log("SignIn failed");
      }
    } catch (error) {
      alert("Enter Correct Password");
    }
  };

  const onLogOut = () => {
    localStorage.removeItem("loginId");
    setIsLogin(false);
    navigate("/sign-up");
  };


  const updateProfile = async (name, photo) => {
    try {
      const token = localStorage.getItem("loginId");
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDo-GMUlH9BQyAiH-8WzkaPymtrR5opfKw",
        {
          idToken: token,
          displayName: name,
          photoUrl: photo,
          returnSecureToken: true
        }
      );
      const data = await response.data
      if(data.status===200){
        setIsCompleteProfile(true)
      }
      // Handle the response or perform additional actions as needed
    } catch (error) {
      console.log(error.response.data.error);
      // Handle the error or display an error message to the user
    }
  };
    
  return (
    <>
      <>
        <Navbar isLogin={isLogin} onLogout={onLogOut} isCompleteProfile={isCompleteProfile} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={<UpdateProfile updateProfile={updateProfile} />}
          />
          <Route path="/sign-up" element={<SignUp onSignup={onSignup} />} />
          <Route path="/sign-in" element={<SignIn onSignIn={onSignIn} />} />
        </Routes>
      </>
    </>
  );
}

export default App;
