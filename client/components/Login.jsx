import React from 'react';
// imports components from Material UI
import Button from '@mui/material/Button';
// related to client side routing
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
// import react-redux hooks
// enables components to access Redux store
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import { BorderAllRounded } from '@mui/icons-material';
import { createTheme, rgbToHex } from '@mui/material/styles';
import Calendar3 from './Calendar3';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [signup, setSignup] = useState(false);

  const displayNotification = () => {
    toast.success('🦀 Succesfull Login!! 🦀', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const displayError = () => {
    toast.error('Incorrect Username or Password', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const formSubmission = async (event) => {
    event.preventDefault();
    const body = { email, password };
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        displayNotification();
        setTimeout(() => {
          setSubmitSuccess(true);
        }, 3000);
        console.log('Login successfully');
      } else {
        displayError();
      }
      const data = await response.json();
      dispatch(login(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='loginContainer'>
      <div className='loginPage'>
        <span>
          <div className='title'>
            Binary<h1 id='bond'>Bond</h1>
          </div>
        </span>
        <div>
          <form onSubmit={formSubmission}>
            <ToastContainer
              position='top-center'
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='dark'
            />
            <TextField
              label='Email'
              onChange={(e) => setEmail(e.target.value)}
              required
              variant='outlined'
              color='secondary'
              type='email'
              sx={{
                mb: 3,
                border: '1px, solid, white',
                borderRadius: '10px',
                backgroundColor: 'rgb(240, 240, 240)',
              }}
              size='medium'
              value={email}
            />
            <TextField
              label='Password'
              onChange={(e) => setPassword(e.target.value)}
              required
              variant='outlined'
              color='secondary'
              type='password'
              value={password}
              size='medium'
              sx={{
                mb: 3,
                border: '1px, solid, white',
                borderRadius: '10px',
                backgroundColor: 'rgb(240, 240, 240)',
              }}
            />
            <div className='loginSignupButtons'>
              <Button
                variant='outlined'
                color='secondary'
                type='submit'
                sx={{
                  color: '#9c27b0)',
                  backgroundColor: 'rgb(240, 240, 240)',
                }}
              >
                Log In{' '}
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => setSignup(true)}
                type='button'
                sx={{
                  color: 'rgb(240, 240, 240)',
                  backgroundColor: '#9c27b0',
                }}
              >
                SignUp
              </Button>
            </div>
          </form>
          {signup && <Navigate to='/signup' />}
          {submitSuccess && <Navigate to='/homepage' />}
        </div>
      </div>
    </div>
  );
};

export default Login;
