
import Navbar from './Components/Header/Navbar'
import './App.css';
import SignUp from './Components/SignUp/SignUp'
import Home from './Components/Home/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import axios from 'axios'

function App() {

  const onSignup= async (email, password)=>{
    try{
      await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDo-GMUlH9BQyAiH-8WzkaPymtrR5opfKw', {
        email:email,
        password:password,
        returnSecureToken:true
      })
      alert('SignUp Successfull')
    }catch(error){
console.log(error)
    }
  }

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/sign-up' element={<SignUp onSignup={onSignup}/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
