import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import DeleteButton from '../../../atoms/DeleteButton';

function ListUser({ load, setLoad, setIdUpdate }) {
  const [rows, setRows] = useState([]);
  const [showPasswords, setShowPasswords] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/api/users/consultUsers');
      console.log(response.data.users);
      setRows(response.data.users);
    };
    fetchData();
  }, [load]);

  const handleUpdate = (id) => {
    setIdUpdate(id);
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(`http://localhost:3000/api/users/deleteUser/${id}`);
    setLoad(!load);
    console.log(response);
  };

  const adminRows = rows.filter((row) => row.role.description === 'Administrador');
  const gestorRows = rows.filter((row) => row.role.description === 'Gestor');

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '70%', marginRight: '10px' }}>
        <TableContainer component={Paper}>
          <h1 style={{textAlign: 'center', margin:'30px', fontWeight:'bolder'}}>Administradores</h1>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre de usuario</TableCell>
                <TableCell>Contraseña</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminRows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: '#f5f5f5' },
                  }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{showPasswords ? row.password : '**************'}</TableCell>
                  <TableCell>{row.role.description}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex' }}>

                      <IconButton color="primary" aria-label="Editar" onClick={() => handleUpdate(row.id)}>
                        <EditIcon />
                      </IconButton>
                      
                      <DeleteButton name={row.username} id={row.id} onClick={handleDelete} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div style={{ width: '70%', marginLeft: '10px' }}>
        <TableContainer component={Paper}>
          <h1 style={{textAlign: 'center', margin:'30px', fontWeight:'bolder'}}>Gestores</h1>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre de usuario</TableCell>
                <TableCell>Contraseña</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gestorRows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: '#f5f5f5' },
                  }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{showPasswords ? row.password : '**************'}</TableCell>
                  <TableCell>{row.role.description}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex' }}>
                      <IconButton color="primary" aria-label="Editar" onClick={() => handleUpdate(row.id)}>
                        <EditIcon />
                      </IconButton>
                      <DeleteButton name={row.username} id={row.id} onClick={handleDelete} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ListUser;
