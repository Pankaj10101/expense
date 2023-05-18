import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Store = createContext();

const Context = ({ children }) => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [isCompleteProfile, setIsCompleteProfile] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const getProfileData = async (token) => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDo-GMUlH9BQyAiH-8WzkaPymtrR5opfKw",
        {
          idToken: token,
        }
      );
      const data = response.data;
      if (data.users) {
        const { displayName, photoUrl } = data.users[0];
        if (displayName && photoUrl) {
          setIsCompleteProfile(true);
          setProfileData({ name: displayName, photo: photoUrl });
        }
      } else {
        setIsCompleteProfile(false);
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  // const confirmEmail = async ()=>{
  //   const oobCode = localStorage.getItem('oobCode')
  //   const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDo-GMUlH9BQyAiH-8WzkaPymtrR5opfKw',{
  //     oobCode: oobCode
  //   })
  //   console.log(response)
  // }

  useEffect(() => {
    const token = localStorage.getItem("loginId");
    if (token) {
      getProfileData(token);
      setIsLogin(true);
      // confirmEmail()
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const updateProfile = async (name, photo) => {
    try {
      const token = localStorage.getItem("loginId");
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDo-GMUlH9BQyAiH-8WzkaPymtrR5opfKw",
        {
          idToken: token,
          displayName: name,
          photoUrl: photo,
          returnSecureToken: true,
        }
      );
      if (response.status === 200) {
        setIsCompleteProfile(true);
        console.log("profile updated");
        alert("Profile Updated");
        navigate("/");
      } else {
        console.log("profile not updated");
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
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
        navigate("/sign-in");
        alert("SignUp Successful");
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
      if (response.status === 200) {
        localStorage.setItem("loginId", data.idToken);
        setIsLogin(true);
        navigate("/");
        console.log("SignIn");
      } else {
        console.log("SignIn failed");
      }
    } catch (error) {
      alert("Enter Correct Password");
    }
  };

  const sendVerificationEmail = async () => {
    const token = localStorage.getItem("loginId");
    const response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDo-GMUlH9BQyAiH-8WzkaPymtrR5opfKw",
      {
        requestType: "VERIFY_EMAIL",
        idToken: token,
      }
    );
    if (response.status === 200) {
      alert("verification mail sent");
    } else {
      alert("verification mail not sent");
    }
  };

  const onForgetPassword = async (email)=>{
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDo-GMUlH9BQyAiH-8WzkaPymtrR5opfKw',{
        requestType:"PASSWORD_RESET",
        email:email
      })
      console.log(response)
    } catch (error) {
      console.log(error)
      
    }
  }

  const onLogout = async () => {
    localStorage.removeItem("loginId");
    setIsLogin(false);
    navigate("/sign-up");
  };
  return (
    <Store.Provider
      value={{
        onSignup,
        onSignIn,
        onLogout,
        updateProfile,
        setProfileData,
        sendVerificationEmail,
        onForgetPassword,
        isVerified,
        isLogin,
        isCompleteProfile,
        profileData,
      }}
    >
      {children}
    </Store.Provider>
  );
};

export default Context;
