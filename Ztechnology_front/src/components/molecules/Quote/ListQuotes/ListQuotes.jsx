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
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import SendQuote from '../SendQuote/SendQuote';
import Button from '@mui/material/Button';

function ListQuotes({ load, setLoad, setClient, setQuote, setIdUpdate }) {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [showProductList, setShowProductList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/api/quotes/consultQuotes');
      setRows(response.data.quotes);
    };
    fetchData();
  }, [load]);

  const handleNumberClick = async (quoteId, quoteNumber) => {
    const newQuoteNumber = prompt('Ingrese el nuevo número de cotización:', quoteNumber);
    if (newQuoteNumber !== null) {
      const response = await axios.put('http://localhost:3000/api/quotes/updateQuotes', {
        id: quoteId,
        quoteNumber: newQuoteNumber,
      });
      if (response) {
        alert('Número de cotización actualizado exitosamente');
        setLoad(!load);
      }
    }
  };

  const handleUpdate = (id) => {
    setIdUpdate(id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/quotes/deleteQuote/${id}`);
    setLoad(!load);
  };

  const handleSend = async (client, quote) => {
    setQuote(quote);
    setClient(client);
  };

  const toggleProductList = () => {
    setShowProductList(!showProductList);
  };

  return (
    <div>
      <Button variant="outlined" onClick={toggleProductList}>
        {showProductList ? 'Ocultar lista de productos' : 'Mostrar lista de productos'}
      </Button>

      {showProductList && (
        <TableContainer component={Paper} sx={{ marginBottom: 30 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Numero Cotizacion</TableCell>
                <TableCell>Nombre del Producto</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Valor producto</TableCell>
                <TableCell>Descripcion Venta</TableCell>
                <TableCell>Nombre del asesor</TableCell>
                <TableCell>Nombre del cliente</TableCell>
                <TableCell>Costo envio</TableCell>
                <TableCell>Subtotal</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell
                    onClick={() => handleNumberClick(row.id, row.quoteNumber)}
                    contentEditable
                    suppressContentEditableWarning
                  >
                    {row.quoteNumber}
                  </TableCell>
                  <TableCell>{row.product.name}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{Number(row.product.price).toLocaleString()}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.user_detail.names} {row.user_detail.last_names}</TableCell>
                  
                  <TableCell>{row.client.names} {row.client.last_names}</TableCell>
                  <TableCell>{Number(row.shipping_cost).toLocaleString()}</TableCell>
                  <TableCell>{Number(row.total - row.shipping_cost).toLocaleString()}</TableCell>
                  <TableCell>{Number(row.total).toLocaleString()}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex' }}>
                      <IconButton
                        color="primary"
                        aria-label="Editar"
                        size="large"
                        onClick={() => {
                          handleUpdate(row.id);
                        }}
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                      <DeleteButton name={row.description} id={row.id} onClick={handleDelete} />

                      <IconButton style={{ marginTop: '2' }} onClick={() => handleSend(row.client, row)}>
                        <AttachEmailIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default ListQuotes;
