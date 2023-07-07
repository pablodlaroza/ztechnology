import { UserContext } from "../context/UserContext";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProvider = ({ children }) => {
  const [data, setData] = useState([]); // Estado local para almacenar los datos
  const [currentUser, setCurrentUser] = useState(''); // Agregar el estado currentUser
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/consultUsers');
        setData(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    

    fetchData();

  }, []);
  

  return (
    <UserContext.Provider value={{ data, setCurrentUser, currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
