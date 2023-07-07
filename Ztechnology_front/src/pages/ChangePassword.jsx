import React, { useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const ChangePasswordForm = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Este campo es obligatorio'),
    newPassword: Yup.string().required('Este campo es obligatorio'),
  });

  const handleChangePassword = async (values, { setSubmitting }) => {
    try {
      const updatedUser = {
        ...user,
        password: values.newPassword
      };

      const response = await axios.put('http://localhost:3000/api/users/updateUsers', updatedUser);
      console.log(response);
      setSubmitting(false);
      alert('Contraseña cambiada exitosamente');
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      alert('Hubo un error al cambiar la contraseña. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <Formik
      initialValues={{
        oldPassword: '',
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
        <form onSubmit={handleSubmit}>
          <TextField  style={{marginTop: 20}}
            fullWidth
            id='oldPassword'
            name='oldPassword'
            label='Contraseña actual'
            type='password'
            variant='outlined'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.oldPassword}
            error={touched.oldPassword && Boolean(errors.oldPassword)}
            helperText={touched.oldPassword && errors.oldPassword}
          />
          <TextField
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
          <Button type='submit' disabled={isSubmitting}>
            Cambiar contraseña
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
