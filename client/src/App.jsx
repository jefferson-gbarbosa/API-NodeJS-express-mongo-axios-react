// import { useState } from 'react'
import Signup from '../src/components/pages/Form/Signup/Signup';
import Login from '../src/components/pages/Form/Login/Login';
import Home from '../src/components/pages/Home/Home';
import ForgotPassword from './components/pages/Form/ForgotPassword/ForgotPassword';
import ResetPassword from './components/pages/Form/ResetPassword/ResetPassword';
// import Error from './components/pages/Erro/Erro';
import Profile from './components/pages/Profile/Profile'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
// import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path= '/' element={<Home />}/>
          <Route path= '/register' element={<Signup />}/>
          <Route path= '/login' element={<Login />}/>
          <Route path= '/profile' element={<Profile />}/>
          <Route path= '/forgot-password' element={<ForgotPassword />}/>
          <Route path= '/reset-password/:token' element={<ResetPassword />}/>
          {/* <Route path= '*' element={<Error />}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
