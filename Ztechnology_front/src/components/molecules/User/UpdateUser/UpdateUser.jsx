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

export default function CreateUserr( {load, setLoad}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button sx={{ mb: 5 }} variant="outlined" onClick={handleClickOpen}>
        Crear Usuario
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
            username: '',
            password: '',
            idRol: ''
          }}
          validationSchema={Yup.object({

            username: Yup.string()
  
              // .max(15, 'Must be 15 characters or less')
  
              .required('Este campo es obligatorio'),

            password: Yup.string()
            .required('Este campo es obligatorio'),

            idRol: Yup.string()
            .required('Este campo es obligatorio')

            })}


          onSubmit={async(values, { setSubmitting }) => {
            if (values.idRol.toLowerCase() === 'administrador') {
              values.idRol = '1';
            }else{
              values.idRol = '2';
            }
            const response = await axios.post('http://localhost:3000/api/users/saveUser', values)
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
                    id="outlined-username"
                    name='username'
                    label="Username"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.username}
                    error={errors.username}
                    helperText={errors.username}
                  />
                  <TextField
                  type='password'
                    sx={{ mt: 3 }}
                    fullWidth
                    id="outlined-password"
                    name='password'
                    label="Contraseña"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.password}
                    error={errors.password}
                    helperText={errors.password}
                  />
                  <TextField
                  // type='number'
                    sx={{ mt: 3 }}
                    fullWidth
                    id="outlined-rol"
                    name='idRol'
                    label="Rol"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.idRol}
                    error={errors.idRol}
                    helperText={errors.idRol}
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
