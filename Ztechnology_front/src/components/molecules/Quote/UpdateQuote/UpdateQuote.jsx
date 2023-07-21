import * as React from 'react';
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import bcrypt from 'bcryptjs'; // Importa la biblioteca bcryptjs
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import Button from '@mui/material/Button';



function UpdateQuote({ idUpdate, load, setLoad }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [product, setProduct] = useState({})
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const consulQuoteById = async (id) => {
    const response = await axios.get(`http://localhost:3000/api/quotes/consultQuote/${id}`);
    // console.log(response.data.quote.product)
    console.log(response.data.quote.total);
    setFormData(response.data.quote);
    setProduct(response.data.quote.product)
    // console.log(formData)
    
  };

  useEffect(() => {
    if (idUpdate) {
        consulQuoteById(idUpdate);
    }
    setOpen(idUpdate ? true : false);
  }, [idUpdate]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Formik
        
          enableReinitialize
          initialValues={{
            id: idUpdate,
            
            description: formData.description || '',
            amount: formData.amount|| '',
            total: product.price || ''
            // price: formData.price || '',
          }}
          validationSchema={Yup.object({
            // name: Yup.string().required('Este campo es obligario'),
            description: Yup.string().required('Este campo es obligario'),
            amount: Yup.number().required('Este campo es obligario'),

          })}
          onSubmit={async (values, { setSubmitting }) => {
            values.total = values.total * values.amount
            const response = await axios.put('http://localhost:3000/api/quotes/updateQuotes', values);
            setLoad(!load);
            setOpen(false);
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
            <form onSubmit={handleSubmit}>
              <DialogTitle id="alert-dialog-title">{"Actualiza un Producto"}</DialogTitle>
              <DialogContent>

                <DialogContentText id="alert-dialog-description">
                

                  <TextField
                    sx={{ mt: 3 }}
                    fullWidth
                    id="outlined-basi"
                    name="description"
                    label="Descripcion"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.description}
                    error={errors.description}
                    helperText={errors.description}
                    
                  />
                  <TextField
                    sx={{ mt: 3 }}
                    fullWidth
                    id="outlined-"
                    name="amount"
                    label="Cantidad"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.amount}
                    error={errors.amount}
                    helperText={errors.amount}
                    
                  />
                   {/* <TextField
                    sx={{ mt: 3 }}
                    fullWidth
                    id="outlined-total"
                    name="total"
                    label="Total"
                    variant="outlined"
                    value={values.total} // Mostrar el total actualizado en el campo de texto
                    InputProps={{
                      readOnly: true, // El campo total no es editable manualmente
                    }}
                  /> */}
                  

     
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button type="submit">Actualizar</Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}

export default UpdateQuote;
