import React from 'react'
import Button from '@mui/material/Button';
import { Navigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/userSlice';




const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const dispatch = useDispatch()

  const formSubmission = async (event) => {
    event.preventDefault()
    const body = {email, password}
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        setSubmitSuccess(true)
        console.log('Login successfully')
      }
      const data = await response.json()
      dispatch(login(data))
    } catch (error) {
      console.log(error)
    }
  }

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
          <Button variant="outlined" color="secondary" type="submit">Submit</Button>
          </form>
    {submitSuccess && <Navigate to="/homepage"/>}
    </div>
  )
}

export default Login