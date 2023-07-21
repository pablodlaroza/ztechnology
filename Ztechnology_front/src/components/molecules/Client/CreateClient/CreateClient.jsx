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

export default function CreateClient( {load, setLoad}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button sx={{ mb: 5, ml:48, width:'400px' }}variant="outlined" onClick={handleClickOpen}>
        Crear Cliente
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
            names: '',
            last_names: '',
            email: '',
            phone: '',
            adress: ''
  
          }}
          validationSchema={Yup.object({

            names: Yup.string()
  
              // .max(15, 'Must be 15 characters or less')
  
              .required('Este campo es obligatorio'),
  
            email: Yup.string().email('ingrese un correo valido').required('Este campo es obligatorio'),

            last_names: Yup.string()
  
              .max(20, 'Must be 20 characters or less')
  
              .required('Required'),

            phone: Yup.number()
            .required('Este campo es obligatorio'),

            adress: Yup.string()
            .required('Este campo es obligatorio')


  
  
            })}






          onSubmit={async(values, { setSubmitting }) => {

            const response = await axios.post('http://localhost:3000/api/clients/saveClients', values)
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
              <DialogTitle>{"Crear Nuevo Cliente"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">

                  <TextField
                    sx={{ mt: 1 }}
                    fullWidth
                    id="outlined-b"
                    name='names'
                    label="Nombres"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.names}
                    error={errors.names}
                    helperText={errors.names}
                  />
                  <TextField
                    sx={{ mt: 3 }}
                    fullWidth
                    id="outlined-ba"
                    name='last_names'
                    label="Apellidos"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.last_names}
                    error={errors.last_names}
                    helperText={errors.last_names}
                  />
                  <TextField
                    sx={{ mt: 3 }}
                    fullWidth
                    id="outlined-bas"
                    name='email'
                    label="Correo Electronico"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.email}
                    error={errors.email}
                    helperText={errors.email}
                     />
                    <TextField
                    sx={{ mt: 3 }}
                    fullWidth
                    id="outlined-basi"
                    name='phone'
                    label="Telefono"
                    type='number'
                    variant="outlined"
                    onChange={handleChange}
                    value={values.phone}
                    error={errors.phone}
                    helperText={errors.phone}
                  />
                    <TextField
                    sx={{ mt: 3 }}
                    fullWidth
                    id="outlined-basic"
                    name='adress'
                    label="Direccion"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.adress}
                    error={errors.adress}
                    helperText={errors.adress}
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
