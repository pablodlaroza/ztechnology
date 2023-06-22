
import '../css/Root.css'
import axios from 'axios';
import React, { useContext,useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
// import ApiApp from './ApiApp';
import { Link, useNavigate } from 'react-router-dom';


function LoginApp(props) {

  let { data,setCurrentUser, currentUser } = useContext(UserContext);
  

  
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  
  const handlePassword = (event) => {
    setPassword(event.target.value);
    
  };

  const Login = async () => {

    let loggedIn = false;
    try {
      
      const user = data.find((user) => user.username === username && user.password === password);
      if (user) {
        // console.log(user.username);
        navigate('/home', { replace: true }); 
        setCurrentUser(user) 
        
      }else{
        alert('usuario o contrasena incorrectos')
        loggedIn = false;
        console.log(loggedIn)
      }
    } catch (error) {
      console.log(error);
    }


  
    // console.log(response)
  };



  return (
    <>

    <div className='row'>

      <div className='form'>
        <h1>Ztechnolgy</h1>
        <input
          placeholder='username'
          onChange={handleUsername}
          name='username'
        />
        <input
          type='password'
          placeholder='password'
          name='password'
          onChange={handlePassword}
        />
        <br></br>
        <button className='btn btn-primary' onClick={Login}>Login</button>
      </div>
      <div>
        {/* <Link to='/login'></Link> */}
      </div>
    </div>
    </>
  );
}

export default LoginApp;
