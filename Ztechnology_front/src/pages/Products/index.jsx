import React, {useState} from 'react'
import { Container } from '@mui/material';
import ListProducts from '../../components/molecules/Product/ListProducts/ListProducts';
import CreateProduct from '../../components/molecules/Product/CreateProduct/CreateProduct';
import UpdateProduct from '../../components/molecules/Product/UpdateProduct/UpdateProduct';


function Products() {
    const [load, setLoad] = useState(false)
    const [idUpdate, setIdUpdate] = useState('');
  return (
    <Container maxWidth='lg' sx={{mt:5}}>
      <CreateProduct load={load} setLoad={setLoad} />
      <ListProducts load={load} setLoad={setLoad} setIdUpdate={setIdUpdate}/>
      <UpdateProduct idUpdate={idUpdate} load={load} setLoad={setLoad}/>

    </Container>
  )
}

export default Products