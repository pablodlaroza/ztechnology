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
// import { UserContext } from '../context/';


function MainApp() {
  
  const [isLoading, setIsLoading] = useState(true);
  


  const [pathName , setPathName] = useState('')

  useEffect(() => {
  
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setPathName(window.location.pathname)
    console.log(pathName)
  }, [pathName]);
  

  return (
    <>
      
      <BrowserRouter>
        <UserProvider>
       
            <Routes>
            <Route path="/login" element={<LoginApp />} />
              <Route path='/' element={<ResponsiveAppBar />}>
                  <Route path="/change-password" element={<ChangePassword />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/Usuarios" element={<Users />} />
                  <Route path="/Cotizaciones" element={<Quotes />} />
                  <Route path="/Productos" element={<Products />} />
                  <Route path="/Clientes" element={<Clients />} />
              </Route>
            </Routes>
          
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default MainApp;
