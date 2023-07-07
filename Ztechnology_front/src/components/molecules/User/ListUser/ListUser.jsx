import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import DeleteButton from '../../../atoms/DeleteButton';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';



function ListUser({load, setLoad}) {
    const [rows, setRows] = useState([])
    const [showPasswords, setShowPasswords] = React.useState(false);

    React.useEffect(()=> {
        const fetchData = async () => {
          const response = await axios.get('http://localhost:3000/api/users/consultUsers');
          console.log(response.data.users)
          setRows(response.data.users)
        }
        fetchData()
      },[load])

      const handleDelete = async(id) =>{
        const response = await axios.delete(`http://localhost:3000/api/users/deleteUser/${id}`)
        setLoad(!load)
        console.log(response)
      }


  return (
    <div>
         <button onClick={() => setShowPasswords(!showPasswords)}>
                                    {showPasswords ? 'Ocultar contraseñas' : 'Mostrar contraseñas'}
        </button>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx = {{}}>

            <TableRow >
              <TableCell >ID</TableCell>
              <TableCell>Nombre de usuario</TableCell>
              <TableCell >Contraseña</TableCell>

              <TableCell >Rol</TableCell>
              <TableCell>Acciones</TableCell>

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
                  {row.username}
                </TableCell>
                <TableCell>{showPasswords ? row.password : '**************'}</TableCell>

                <TableCell>{row.idRol === '1' ? 'Admin' : 'Gestor'}</TableCell>


                <TableCell  >
                  {<div style={{display: 'flex'}}>
                    <IconButton color='primary' aria-label="Editar" size="large">
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                    
                      
                    <DeleteButton name= {row.username} id={row.id} onClick={handleDelete}/>
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

export default ListUser