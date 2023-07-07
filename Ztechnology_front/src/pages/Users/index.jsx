import * as React from 'react';
import { useState } from 'react';

import { Container } from '@mui/material';

import CreateUserr from '../../components/molecules/User/CreateUser/CreateUser';
import ListUser from '../../components/molecules/User/ListUser/ListUser';


export default function Users() {
 
  const [load, setLoad] = useState(false)

  return (
    <>
  
    <Container maxWidth='lg' sx={{mt:5}}>
      <CreateUserr load={load} setLoad={setLoad}/>
      <ListUser load={load} setLoad={setLoad}/>

    </Container>
    </>
  );
}