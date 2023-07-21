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



function UpdateClient({ idUpdate, load, setLoad }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const consultClientById = async (id) => {
    const response = await axios.get(`http://localhost:3000/api/clients/consultClients/${id}`);
    console.log(response.data.client);
    setFormData(response.data.client);
  };

  useEffect(() => {
    if (idUpdate) {
      consultClientById(idUpdate);
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
            names: formData.names || '',
            last_names: formData.last_names ||'',
            email: formData.email || '',
            adress: formData.adress || '',
            phone: formData.phone || ''
          }}
          validationSchema={Yup.object({
            names: Yup.string().required('Este campo es obligario'),
            last_names: Yup.string().required('Este campo es obligario'),
            email: Yup.string().required('Este campo es obligario'),
            adress: Yup.string().required('Este campo es obligario'),
            phone: Yup.string().required('Este campo es obligario'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
           

            // const updatedClient = {
            //   ...values,
            //   password: hashedPassword,
            // };

            const response = await axios.put('http://localhost:3000/api/clients/updateClient', values);
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
              <DialogTitle id="alert-dialog-title">{"Actualiza un Cliente"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <TextField
                    sx={{ mt: 1 }}
                    fullWidth
                    id="outlined-basic"
                    name="names"
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
                    id="outlined-basi"
                    name="last_names"
                    label="Apellidos"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.last_names}
                    error={errors.last_names}
                    helperText={errors.last_names}
                     
                    
                  />
                  <TextField
                    sx={{ mt: 1 }}
                    fullWidth
                    id="outlined-basic"
                    name="email"
                    label="Correo"
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
                    name="adress"
                    label="Direccion"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.adress}
                    error={errors.adress}
                    helperText={errors.adress}
                   
                    
                  />
                     <TextField
                    sx={{ mt: 3 }}
                    fullWidth
                    id="outlined-basi"
                    name="phone"
                    label="Telefono"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.phone}
                    error={errors.phone}
                    helperText={errors.phone}
                    
                    
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

export default UpdateClient;
