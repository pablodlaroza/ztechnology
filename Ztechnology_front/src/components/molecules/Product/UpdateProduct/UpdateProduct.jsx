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



function UpdateProduct({ idUpdate, load, setLoad }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const consultProductById = async (id) => {
    const response = await axios.get(`http://localhost:3000/api/products/consultProduct/${id}`);
    console.log(response.data.product);
    setFormData(response.data.product);
  };

  useEffect(() => {
    if (idUpdate) {
      consultProductById(idUpdate);
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
            name: formData.name || '',
            description: formData.description || '',
            price: formData.price || '',
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('Este campo es obligario'),
            description: Yup.string().required('Este campo es obligario'),
            price: Yup.string().required('Este campo es obligario'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            

          

            const response = await axios.put('http://localhost:3000/api/products/updateProduct', values);
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
                    sx={{ mt: 1 }}
                    fullWidth
                    id="outlined-basic"
                    name="name"
                    label="Nombre del producto"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.name}
                    error={errors.name}
                    helperText={errors.name}
                  />

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
                    id="outlined-basi"
                    name="price"
                    label="Precio"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.price}
                    error={errors.price}
                    helperText={errors.price}
                    
                  />

     
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

export default UpdateProduct;
