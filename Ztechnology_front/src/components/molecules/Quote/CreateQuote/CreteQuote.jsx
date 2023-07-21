import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function CreateQuote({ load, setLoad }) {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [quoteCount, setQuoteCount] = useState(1);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const productResponse = await axios.get('http://localhost:3000/api/products/consultProducts');
      setProducts(productResponse.data.products);

      const userResponse = await axios.get('http://localhost:3000/api/users/consultUsers');
      setUsers(userResponse.data.users);

      const clientResponse = await axios.get('http://localhost:3000/api/clients/consultClients');
      setClients(clientResponse.data.clients);
    };
    fetchData();
  }, [load]);

  const handleProductChange = (event) => {
    const productId = event.target.value;
    const selectedProduct = products.find((product) => product.id.toString() === productId);

    if (selectedProduct) {
      setSelectedProductPrice(selectedProduct.price);
    } else {
      setSelectedProductPrice(0);
    }
  };

  const handleCreateQuote = async (values) => {
    let total = selectedProductPrice * values.amount;

    if (values.discount === '7') {
      total = total - (total * 0.07);
    } else if (values.discount === '25k') {
      total = total - 25000;
    }

    values.total = total;

    const response = await axios.post('http://localhost:3000/api/quotes/saveQuotes', {
      ...values,
      quoteNumber: `C${quoteCount}`,
    });
    
    if (response) {
      alert('Cotizacion creada exitosamente');
    }

    setLoad(!load);
    setQuoteCount((prevCount) => prevCount + 1);
    handleClose();
  };

  return (
    <div>
      <Formik
        initialValues={{
          idProduct: '',
          amount: '',
          description: '',
          idUser: '',
          idClient: '',
          shipping_cost: '',
          total: '',
          discount: '',
        }}
        validationSchema={Yup.object({
          idProduct: Yup.string().nullable().required('Requerido'),
          amount: Yup.number().required('Requerido'),
          description: Yup.string().required('Requerido'),
          idUser: Yup.string().nullable().required('Este campo es obligatorio'),
          idClient: Yup.string().nullable().required('Este campo es obligatorio'),
          shipping_cost: Yup.string().required('Este campo es obligatorio'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          handleCreateQuote(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          
          <form style={{backgroundColor:'white', padding:'20px', marginBottom:'20px', borderRadius:'7px'}} onSubmit={handleSubmit}>
            <h1 style={{textAlign:'center', fontWeight:'bolder', marginBottom:'20px'}}>Crear cotizacion</h1>

            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ }}>
                  <InputLabel id="select-product-label">Producto</InputLabel>
                  <Select
                    id="outlined-idProduct"
                    name="idProduct"
                    labelId="select-product-label"
                    variant="outlined"
                    onChange={(event) => {
                      handleProductChange(event);
                      handleChange(event);
                    }}
                    onBlur={handleBlur}
                    value={values.idProduct}
                    error={errors.idProduct ? true : false}
                    helperText={errors.idProduct}
                  >
                    <MenuItem value="" disabled>
                      Seleccione un producto
                    </MenuItem>
                    {products.map((product) => (
                      <MenuItem key={product.id} value={product.id.toString()}>
                        {product.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  sx={{}}
                  fullWidth
                  id="outlined-amount"
                  name="amount"
                  label="Cantidad"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.amount}
                  error={errors.amount}
                  helperText={errors.amount}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  sx={{}}
                  fullWidth
                  id="outlined-description"
                  name="description"
                  label="Descripción"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.description}
                  error={errors.description}
                  helperText={errors.description}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth sx={{}}>
                  <InputLabel id="select-product-label">Asesor</InputLabel>
                  <Select
                    id="outlined-idProduct"
                    name="idUser"
                    labelId="select-product-label"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.idUser}
                    error={errors.idUser ? true : false}
                    helperText={errors.idUser}
                  >
                    <MenuItem value="" disabled>
                      Seleccione un Asesor
                    </MenuItem>
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.id.toString()}>
                        {user.username}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth sx={{}}>
                  <InputLabel id="select-product-label">Cliente</InputLabel>
                  <Select
                    id="outlined-idProduct"
                    name="idClient"
                    labelId="select-product-label"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.idClient}
                    error={errors.idClient ? true : false}
                    helperText={errors.idClient}
                  >
                    <MenuItem value="" disabled>
                      Seleccione un Cliente
                    </MenuItem>
                    {clients.map((client) => (
                      <MenuItem key={client.id} value={client.id.toString()}>
                        {client.names} {client.last_names}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  sx={{}}
                  fullWidth
                  id="outlined-shipping-cost"
                  name="shipping_cost"
                  label="Costo del envío"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.shipping_cost}
                  error={errors.shipping_cost}
                  helperText={errors.shipping_cost}
                />
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth sx={{}}>
                  <InputLabel id="select-product-label">Descuento</InputLabel>
                  <Select
                    id="outlined-discount"
                    name="discount"
                    labelId="select-product-label"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.discount}
                  >
                    <MenuItem value="no">No tiene descuento</MenuItem>
                    <MenuItem value="7">7%</MenuItem>
                    <MenuItem value="25k">$25.000</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Button type="submit">Crear</Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
