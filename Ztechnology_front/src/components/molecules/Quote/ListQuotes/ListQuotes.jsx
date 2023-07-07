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
import DeleteButton from '../../../atoms/DeleteButton';
import '../../../../pages/Login/css/Root.css';

import axios from 'axios';

function ListQuotes({ load, setLoad }) {
  const [rows, setRows] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);
  const [editableQuote, setEditableQuote] = useState({ id: null, quoteNumber: '' });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/api/quotes/consultQuotes');
      console.log(response.data);
      setRows(response.data.quotes);
    };
    fetchData();
  }, [load]);

  useEffect(() => {
    const quoteNumber = localStorage.getItem('quoteNumber');
    if (quoteNumber && quoteNumber !== '') {
      setEditableQuote((prevEditableQuote) => ({ ...prevEditableQuote, quoteNumber }));
    }
  }, []);

  const handleNumberClick = (index, quoteNumber) => {
    setEditableIndex(index);
    setEditableQuote({ id: quoteNumber, quoteNumber: quoteNumber.toString() });
  };

  const handleNumberChange = (event) => {
    setEditableQuote((prevEditableQuote) => ({ ...prevEditableQuote, quoteNumber: event.target.value }));
  };

  const handleNumberBlur = async (quoteId) => {
    if (editableIndex !== null) {
      const currentRow = rows[editableIndex];
      if (editableQuote.quoteNumber !== currentRow.id) {
        const updatedRows = [...rows];
        updatedRows[editableIndex] = { ...currentRow, id: editableQuote.quoteNumber };
        setRows(updatedRows);

        const updatedQuote = {
          id: quoteId,
          quoteNumber: editableQuote.quoteNumber,
        };
        const response = await axios.put(`http://localhost:3000/api/quotes/updateQuotes`, updatedQuote);
        console.log(response);
      }
      setEditableIndex(null);
    }

    localStorage.setItem('quoteNumber', editableQuote.quoteNumber);
  };

  const handleKeyDown = (event, quoteId) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleNumberBlur(quoteId);
    }
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(`http://localhost:3000/api/clients/deleteClient/${id}`);
    setLoad(!load);
    console.log(response);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{}}>
            <TableRow>
              <TableCell>Numero Cotizacion</TableCell>
              <TableCell>Descripcion Venta</TableCell>
              <TableCell>Nombre del asesor</TableCell>
              <TableCell>Nombre del cliente</TableCell>
              <TableCell>Costo envio</TableCell>
              <TableCell>Descuentos</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#f5f5f5' },
                }}
              >
                <TableCell
                  onClick={() => handleNumberClick(index, row.id)}
                  onBlur={() => handleNumberBlur(row.id)}
                >
                  {editableIndex === index ? (
                    <input
                      type="text"
                      value={editableQuote.quoteNumber}
                      onChange={handleNumberChange}
                      onKeyDown={(event) => handleKeyDown(event, row.id)}
                      autoFocus
                    />
                  ) : (
                    row.id
                  )}
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.nombre_asesor}</TableCell>
                <TableCell>{row.nombre_cliente}</TableCell>
                <TableCell>{Number(row.shipping_cost).toLocaleString()}</TableCell>
                <TableCell>
                  <div>
                    <button></button>
                    <button></button>
                  </div>
                </TableCell>
                <TableCell>{(row.total - row.shipping_cost).toLocaleString()}</TableCell>
                <TableCell>{Number(row.total).toLocaleString()}</TableCell>
                <TableCell className="buttons">
                  <div style={{ display: 'flex' }}>
                    <IconButton color="primary" aria-label="Editar" size="large">
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    <DeleteButton name={row.description} id={row.id} onClick={handleDelete} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ListQuotes;
