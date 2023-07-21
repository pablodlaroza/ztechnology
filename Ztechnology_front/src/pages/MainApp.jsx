import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import LoginApp from './Login/LoginApp';
import Home from './Home/Home';
import UserProvider from '../providers/UsersProvider';
import Users from './Users';
import Clients from './Clients';
import Quotes from './Quotes';
import Products from './Products';
import ResponsiveAppBar from '../components/molecules/ResponsiveAppBar/ResponsiveAppBar';
import ChangePassword from './ChangePassword';
import '../App.css'
// import { UserContext } from '../context/';


function MainApp() {
  
  

  const [loggedIn, setLoggedIn] = useState(false)
  const [pathName , setPathName] = useState('')

  useEffect(() => {
    setPathName(window.location.pathname)
    console.log(pathName) 
  }, [pathName]);

  const loggedINN = localStorage.getItem('loggedIn');
  

  return (
    <div className='background' >
      
      <BrowserRouter>
        <UserProvider>
       
            <Routes>
            <Route className='login' path="/login" element={<LoginApp setLoggedIn={setLoggedIn}/>} />
            {loggedINN && (
          
              <Route path='/' element={<ResponsiveAppBar setLoggedIn={setLoggedIn}/>}>
                  <Route path="/change-password" element={<ChangePassword />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/Usuarios" element={<Users />} />
                  <Route path="/Cotizaciones" element={<Quotes />} />
                  <Route path="/Productos" element={<Products />} />
                  <Route path="/Clientes" element={<Clients />} />
              </Route>
            )}
            </Routes>
          
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default MainApp;
