import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './css/Root.css';

const MAX_PASSWORD_ATTEMPTS = 3;
const BLOCKED_TIME = 2 * 60 * 60 * 1000;

export default function LoginApp() {
  const navigate = useNavigate();
  const { data } = useContext(UserContext);
  const [passwordAttempts, setPasswordAttempts] = useState({});
  const [lastAttemptTimestamp, setLastAttemptTimestamp] = useState({});

  useEffect(() => {
    const storedPasswordAttempts = localStorage.getItem('passwordAttempts');
    const storedLastAttemptTimestamp = localStorage.getItem('lastAttemptTimestamp');

    if (storedPasswordAttempts) {
      setPasswordAttempts(JSON.parse(storedPasswordAttempts));
    }

    if (storedLastAttemptTimestamp) {
      setLastAttemptTimestamp(JSON.parse(storedLastAttemptTimestamp));
    }
  }, []);

  const handleLogin = async (values) => {
    const currentPasswordAttempts = passwordAttempts[values.username] || 0;
    const currentLastAttemptTimestamp = lastAttemptTimestamp[values.username] || 0;

    if (currentPasswordAttempts >= MAX_PASSWORD_ATTEMPTS && Date.now() - currentLastAttemptTimestamp <= BLOCKED_TIME) {
      alert('La cuenta está bloqueada. Intente nuevamente más tarde.');
      return;
    }

    const user = data.find((user) => user.username === values.username && user.password === values.password);
    localStorage.setItem('user', JSON.stringify(user));

    if (user) {
      navigate('/home', { state: { logged: true, user } });
    } else {
      setPasswordAttempts((prevAttempts) => ({ ...prevAttempts, [values.username]: currentPasswordAttempts + 1 }));
      setLastAttemptTimestamp((prevTimestamps) => ({ ...prevTimestamps, [values.username]: Date.now() }));

      if (currentPasswordAttempts + 1 >= MAX_PASSWORD_ATTEMPTS) {
        alert('Cuenta bloqueada. Intente nuevamente más tarde.');
      } else {
        alert('Usuario no válido');
      }
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Este campo es obligatorio'),
    password: Yup.string().required('Este campo es obligatorio'),
  });

  const getRemainingAttempts = (username) => MAX_PASSWORD_ATTEMPTS - (passwordAttempts[username] || 0);

  const getBlockedTimeRemaining = (username) => Math.max(BLOCKED_TIME - (Date.now() - (lastAttemptTimestamp[username] || 0)), 0);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='row'>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
          <form className='form'onSubmit={handleSubmit}>
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
              sx={{ mt: 2 }}
              fullWidth
              id='outlined-basic'
              type='password'
              name='password'
              label='Password'
              variant='outlined'
              onChange={handleChange}
              value={values.password}
              error={Boolean(errors.password)}
              helperText={
                errors.password ||
                (passwordAttempts[values.username] > 0 &&
                  `Intentos restantes: ${getRemainingAttempts(values.username)}`)
              }
              disabled={passwordAttempts[values.username] >= MAX_PASSWORD_ATTEMPTS}
            />

            {passwordAttempts[values.username] >= MAX_PASSWORD_ATTEMPTS && (
              <Typography variant='caption' sx={{ mt: 1 }}>
                Cuenta bloqueada. Tiempo restante: {formatTime(getBlockedTimeRemaining(values.username))}
              </Typography>
            )}

            <Button
              variant='outlined'
              color='success'
              type='submit'
              disabled={passwordAttempts[values.username] >= MAX_PASSWORD_ATTEMPTS}
            >
              Iniciar Sesión
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
