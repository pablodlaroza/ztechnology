import React, { useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import swal from 'sweetalert'

const ChangePasswordForm = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string().required('Este campo es obligatorio'),
  });

  const handleChangePassword = async (values, { setSubmitting }) => {
    try {
      const updatedUser = {
        ...user,
        password: await bcrypt.hash(values.newPassword, 10)// factor de costo
      };

      const response = await axios.put('http://localhost:3000/api/users/updateUsers', updatedUser);
      console.log(response);
      setSubmitting(false);
      swal(`Contraseña cambiada exitosamente`,'', "success");

    } catch (error) {
      console.error(error);
      setSubmitting(false);
      alert('Hubo un error al cambiar la contraseña. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <Formik
      initialValues={{
        newPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleChangePassword}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form style={{backgroundColor:'white', padding:'20px', marginBottom:'20px', borderRadius:'7px', width:'50%', marginLeft:'450px', marginTop:'220px'}} onSubmit={handleSubmit}>
           <h1 style={{textAlign:'center', fontWeight:'bolder', marginBottom:'20px'}}>Cambiar Contraseña</h1>
        
          <TextField
            style={{ marginTop: '20px' }}
            fullWidth
            id='newPassword'
            name='newPassword'
            label='Nueva contraseña'
            type='password'
            variant='outlined'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.newPassword}
            error={touched.newPassword && Boolean(errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
          />
          <Button style={{ marginTop: '10px' }} type='submit' disabled={isSubmitting}>
            Cambiar contraseña
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
