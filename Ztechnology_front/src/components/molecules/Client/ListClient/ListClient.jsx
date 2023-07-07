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

function ListClient({load, setLoad}) {

    const [rows, setRows] = useState([])
  
    React.useEffect(()=> {
      const fetchData = async () => {
        const response = await axios.get('http://localhost:3000/api/clients/consultClients');
        // console.log(response.data)
        setRows(response.data.clients)
      }
      fetchData()
    },[load])

    const handleDelete = async(id) =>{
      const response = await axios.delete(`http://localhost:3000/api/clients/deleteClient/${id}`)
      setLoad(!load)
      console.log(response)
    }

  return (
    <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx = {{}}>

              <TableRow >
                <TableCell >ID</TableCell>
                <TableCell>Nombres</TableCell>
                <TableCell >Apellidos</TableCell>

                <TableCell >Correo Electronico</TableCell>
                <TableCell >Telefono</TableCell>
                <TableCell >Direccion</TableCell>
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
                    {row.names}
                  </TableCell>
                  <TableCell>
                      {row.last_names}
                  </TableCell>
                  <TableCell >
                      {row.email}
                  </TableCell>
                  <TableCell >
                      {row.phone}
                  </TableCell>
                  <TableCell >
                      {row.adress}
                  </TableCell>

                  <TableCell  >
                    {<div  style={{display: 'flex'}}  >
                      <IconButton color='primary' aria-label="Editar" size="large">
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                      <DeleteButton name= {row.names} id={row.id} onClick={handleDelete}/>
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

export default ListClient