import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import axios from 'axios'
import CreateUserr from '../../components/molecules/User/CreateUser/CreateUser';
// import ResponsiveAppBar from '../../components/molecules/ResponsiveAppBar/ResponsiveApp/ResponsiveAppBar';
// import CreateUserr from '../../components/molecules/Users/CreateUser/CreateUser.Jsx';



export default function Users() {
  const [showPasswords, setShowPasswords] = React.useState(false);


  const [rows, setRows] = useState([])

  React.useEffect(()=> {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/api/users/consultUsers');
      console.log(response.data.users)
      setRows(response.data.users)
    }
    fetchData()
  },[])
  return (
    <>'
  
    <Container maxWidth='lg' sx={{mt:5}}>
      <CreateUserr></CreateUserr>
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
              <TableCell sx={{ textAlign: 'right',}}>Acciones</TableCell>

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
                <TableCell >{row.role.name}</TableCell>

                <TableCell sx={{ textAlign: 'right'}} >
                  {<div>
                    <button>

                    </button>
                    <button>
                      
                    </button>
                  </div>}
                               
                </TableCell>
                

             
                


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Container>
    </>
  );
}