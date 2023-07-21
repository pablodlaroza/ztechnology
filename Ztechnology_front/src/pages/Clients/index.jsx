import * as React from 'react';
import { useState } from 'react';


import  {Container}  from '@mui/material';
import CreateClient from '../../components/molecules/Client/CreateClient/CreateClient';
import ListClient from '../../components/molecules/Client/ListClient/ListClient';
import UpdateClient from '../../components/molecules/Client/UpdateClient/UpdateClient';


export default function Clients() {
    
  
   const [idUpdate, setIdUpdate] = useState('');
   const [load, setLoad] = useState(false)

    return (
        <>
      
        <Container maxWidth='lg' sx={{mt:5}}>
          <CreateClient load={load} setLoad={setLoad} />
          <ListClient load={load} setLoad= {setLoad} setIdUpdate={setIdUpdate}/>
          <UpdateClient  idUpdate={idUpdate} load={load} setLoad={setLoad}/>
        </Container>
        </>
      );


}