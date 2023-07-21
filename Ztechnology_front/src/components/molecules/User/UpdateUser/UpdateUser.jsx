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



function UpdateUser({ idUpdate, load, setLoad }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const consultUserById = async (id) => {
    const response = await axios.get(`http://localhost:3000/api/users/consultUsers/${id}`);
    console.log(response.data.user);
    setFormData(response.data.user);
  };

  useEffect(() => {
    if (idUpdate) {
      consultUserById(idUpdate);
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
            username: formData.username || '',
            password: '',
            idRol: formData.idRol || '',
          }}
          validationSchema={Yup.object({
            username: Yup.string().required('Este campo es obligario'),
            // password: Yup.string().required('Este campo es obligario'),
            idRol: Yup.string().required('Este campo es obligario'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            // Encripta la contraseña utilizando bcrypt
            
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(values.password, salt);

            const updatedUser = {
              ...values,
              password: hashedPassword,
            };

            const response = await axios.put('http://localhost:3000/api/users/updateUsers', updatedUser);
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
              <DialogTitle id="alert-dialog-title">{"Actualiza un usuario"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <TextField
                    sx={{ mt: 1 }}
                    fullWidth
                    id="outlined-basic"
                    name="username"
                    label="Username"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.username}
                    error={errors.username}
                    helperText={errors.username}
                  />

                  <TextField
                    sx={{ mt: 3 }}
                    fullWidth
                    id="outlined-basi"
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.password}
                    error={errors.password}
                    helperText={errors.password}
                    disabled={values.idRol =="1"} 
                    
                  />

                <FormControl fullWidth sx={{ mt: 3 }}>
                  <InputLabel id="rol-label">Seleccione un rol</InputLabel>
                    <Select
                      labelId="rol-label"
                      id="outlined-rol"
                      name="idRol"
                      label="Rol"
                      variant="outlined"
                      value={values.idRol}
                      onChange={handleChange}
                      error={errors.idRol}
                    >
                      <MenuItem value="1">Administrador</MenuItem>
                      <MenuItem value="2">Gestor</MenuItem>
                    </Select>
                  {/* {errors.idRol && <TextField error helperText={errors.idRol} />} */}
                </FormControl>
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

export default UpdateUser;
