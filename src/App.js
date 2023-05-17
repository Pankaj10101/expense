import Navbar from "./Components/Header/Navbar";
import "./App.css";
import SignUp from "./Components/SignUp/SignUp";
import Home from "./Components/Home/Home";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import SignIn from "./Components/SignIn.jsx/SignIn";
import { useEffect, useState } from "react";

function App() {

  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)

  useEffect(()=>{
    const token = localStorage.getItem('loginId')
    if(token){
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  }, [isLogin])
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
        navigate('/')
        alert('SignUp Successfull')
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
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDo-GMUlH9BQyAiH-8WzkaPymtrR5opfKw",{
          email :email,
          password:password,
          returnSecureToken:true
        }
      );
      const data = await response.data
      if(response.status==200){
        localStorage.setItem('loginId', data.idToken)
        setIsLogin(true)
      }else{
        console.log('SignIn failed')
      }
    } catch (error) {
      alert('Enter Correct Password');
    }
  };

  const onLogOut = ()=>{
    localStorage.removeItem('loginId')
    setIsLogin(false)
    navigate('/sign-up')
  }
  return (
    <>
      <>
        <Navbar isLogin={isLogin} onLogout={onLogOut} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp onSignup={onSignup} />} />
          <Route path="/sign-in" element={<SignIn onSignIn={onSignIn} />} />
        </Routes>
      </>
    </>
  );
}

export default App;