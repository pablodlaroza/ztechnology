import React, { useContext,useEffect,useState } from 'react';
import { Link,  useLocation, useNavigate } from 'react-router-dom';

import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../../components/molecules/ResponsiveAppBar/ResponsiveAppBar';
import LoginApp from '../Login/LoginApp';
// import { UserContext } from '../context/UserContext'

function Home() {
  const location = useLocation();
  const state = location.state;
  
  

  


  
  
  const [username, setUsername] = useState('')
 
    const  reset = () => {
    localStorage.removeItem('username') 
  }


 

  // console.log(username)
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const mostrarOcultarFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };
  const cleanUsername = username.replace(/"/g, '');


 

  return (
          <div>
         
            <Outlet/>
          </div>
  );
}

export default Home;

