import React from 'react';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { ToastContainer, toast } from 'react-toastify';




const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [signup, setSignup] = useState(false)

  const displayNotification = () => {
    toast.success('🦀 🦀 🦀 🦀 Succesfull Login!!🦀 🦀 🦀 🦀 ', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const formSubmission = async (event) => {
    event.preventDefault()
    const body = { email, password }
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        displayNotification();
        setTimeout(() => {
          setSubmitSuccess(true);
        }, 3000);
        console.log('Login successfully');
      }
      const data = await response.json();
      dispatch(login(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={formSubmission}>
        <TextField
          label="Email"
          onChange={e => setEmail(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="email"
          sx={{ mb: 3 }}
          size='medium'
          value={email}

        />
        <TextField
          label="Password"
          onChange={e => setPassword(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="password"
          value={password}

          size='medium'
          sx={{ mb: 3 }}
        />
        <div>
          <Button variant="outlined" color="secondary" type="submit">Submit</Button>
          <Button variant="outlined" color="secondary" onClick={() => setSignup(true)} type="button">SignUp</Button>
        </div>
      </form>
      {signup && <Navigate to="/signup" />}
      {submitSuccess && <Navigate to="/homepage" />}
    </div>
  );
};

export default Login;