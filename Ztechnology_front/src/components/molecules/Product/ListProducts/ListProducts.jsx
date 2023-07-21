import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteButton from '../../../atoms/DeleteButton';
import '../../../../pages/Login/css/Root.css'

import axios from 'axios'

function ListProducts({load, setLoad, setIdUpdate}) {

    const [rows, setRows] = useState([])
  
    React.useEffect(()=> {
      const fetchData = async () => {
        const response = await axios.get('http://localhost:3000/api/products/consultProducts');
        console.log(response.data)
        setRows(response.data.products)
      }
      fetchData()
    },[load])

    const handleDelete = async(id) =>{
      const response = await axios.delete(`http://localhost:3000/api/products/deleteProduct/${id}`)
      setLoad(!load)
      console.log(response)
    }
    const handleUpdate = (id) => {
      setIdUpdate(id);
    };

  return (
    <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx = {{}}>

              <TableRow >
                <TableCell >ID</TableCell>
                <TableCell>Nombre del producto</TableCell>

                <TableCell >Descripcion</TableCell>
                <TableCell >Precio</TableCell>
              
                <TableCell >Acciones</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: '#f5f5f5' }, 
                  }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell >
                      {/* <img src='https://localhost:3000/uploads/${row.photo}'></img> */}
                    {row.name}
                  </TableCell>
                  <TableCell>
                      {row.description}
                  </TableCell>
                  <TableCell >
                      {row.price.toLocaleString()}
                  </TableCell>
               

                  <TableCell className='buttons' >
                    {<div  style={{display: 'flex'}}  >
                      <IconButton color="primary" aria-label="Editar" onClick={() => handleUpdate(row.id)}>
                        <EditIcon />
                      </IconButton>
                      <DeleteButton name= {row.name} id={row.id} onClick={handleDelete}/>
                    </div>}
                                
                  </TableCell>
              
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  </div>
  )
}

export default ListProducts