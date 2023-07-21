import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateProduct( {load, setLoad}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button sx={{ mb: 5, ml:48, width:'400px' }}  variant="outlined" onClick={handleClickOpen}>
        Crear Producto
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Formik
          initialValues={{
            name: '',
            description: '',
            price: ''
            
  
          }}
          validationSchema={Yup.object({

            name: Yup.string()
  
              // .max(15, 'Must be 15 characters or less')
  
              .required('Este campo es obligatorio'),
  

            description: Yup.string()
  
              .max(20, 'Must be 30 characters or less')
  
              .required('Required'),

            price: Yup.number()
            .required('Este campo es obligatorio'),

           

  
  
            })}

          onSubmit={async(values, { setSubmitting }) => {

            const response = await axios.post('http://localhost:3000/api/products/saveProducts', values)
            console.log(response)
            setLoad(!load)
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
            isSubmitting
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogTitle>{"Crear Nuevo Usuario"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">

                  <TextField
                    sx={{ mt: 1 }}
                    fullWidth
                    id="outlined-basic"
                    name='name'
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
                    id="outlined-basic"
                    name='description'
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
                    id="outlined-basic"
                    name='price'
                    label="Precio del producto"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.price}
                    error={errors.price}
                    helperText={errors.price}
                     />
                
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button type='submit'>Crear</Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
