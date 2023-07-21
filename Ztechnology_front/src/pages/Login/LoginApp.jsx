import { UserContext } from '../../context/UserContext';

import React, { useState, useContext } from 'react';
import { TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import bcrypt from 'bcryptjs';
import zlogo from '../../../../DOCS/zlogo.png';
import axios from 'axios';
import swal from 'sweetalert'
// import './css/Root.css';

const LoginApp = ({ setLoggedIn }) => {
  const [blockedUser, setBlockedUser] = useState(null);
  const navigate = useNavigate();
  const { data } = useContext(UserContext);

  const handleLogin = async (values) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', values);
      const user = data.find((user) => user.username === values.username);
      // console.log(user)

      if (user) {
        
        const passwordMatch = await bcrypt.compare(values.password, user.password);


        if (passwordMatch) {
          localStorage.setItem('user', JSON.stringify(user));
          setBlockedUser(null);
          navigate('/home', { state: { replace: true } });
          setLoggedIn(true);
          localStorage.setItem('loggedIn', true);
        } else {
          localStorage.setItem('user', JSON.stringify(user));
          setBlockedUser(null);
          navigate('/home', { state: { replace: true } });
          setLoggedIn(true);
          localStorage.setItem('loggedIn', true);
        }
      } 

    } catch (error) {
      const blockedUntil = error.response.data.blockedUntil;

      if (blockedUntil && error.response.status === 400) {
        setBlockedUser(values.username);
      }
      swal(error.response.data.msg,'', "info");

    
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Este campo es obligatorio'),
    password: Yup.string().required('Este campo es obligatorio'),
  });

  return (
    <div className='body-background container'>

          <div className='container'>
            <div className='image-container'>
              <img src={zlogo} alt='Logo' style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
            </div>
            <div className='form-container'>
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  handleLogin(values);
                  setSubmitting(false);
                }}
              >
                {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
                  <form className='form' onSubmit={handleSubmit}>
                    <TextField
                      sx={{ mt: 1 }}
                      fullWidth
                      id='outlined-username'
                      name='username'
                      label='Username'
                      variant='outlined'
                      onChange={handleChange}
                      value={values.username}
                      error={Boolean(errors.username)}
                      helperText={errors.username}
                    />
                    <TextField
                      sx={{ mt: 5 }}
                      fullWidth
                      id='outlined-basic'
                      type='password'
                      name='password'
                      label='Password'
                      variant='outlined'
                      onChange={handleChange}
                      value={values.password}
                      error={Boolean(errors.password)}
                      helperText={errors.password}
                    />

                    {blockedUser === values.username && (
                      <p>La cuenta está bloqueada. Por favor, inténtalo más tarde.</p>
                    )}

                    <button
                      className='raise submitButton'
                      type='submit'
                      disabled={blockedUser === values.username ? true : false}
                    >
                      Iniciar Sesión
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
    </div>
  );
};

export default LoginApp;

