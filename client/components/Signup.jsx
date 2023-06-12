import React from 'react';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [skillLevel, setSkillLevel] = useState(1);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const displayNotification = () => {
    toast('😇 Successful Signup 😇', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };



  // Send a post request to DB
  // Redirect user to 
  const formSubmission = async (event) => {
    event.preventDefault();
    const body = { firstName, lastName, bio, subject, email, password, skillLevel };
    try {
      const response = await fetch('/api/', {
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
        console.log('Data inserted successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h1>Signup</h1>
      <form onSubmit={formSubmission}>
        <TextField
          label="First Name"
          onChange={e => setFirstName(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="text"
          sx={{ mb: 3 }}
          size='medium'
          value={firstName}

        />
        <TextField
          label="Last Name"
          onChange={e => setLastName(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="text"
          sx={{ mb: 3 }}
          size='medium'
          value={lastName}

        />

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
        <TextField
          label="Subject"
          onChange={e => setSubject(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="text"
          sx={{ mb: 3 }}
          size='medium'
          value={subject}

        />
        <TextField
          label="Bio"
          onChange={e => setBio(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="text"
          sx={{ mb: 3 }}
          size='medium'
          value={bio}
        />
        <Slider
          aria-label="skill Level"
          defaultValue={1}
          //getAriaValueText={valuetext}
          onChange={e => setSkillLevel(e.target.value)}
          value={skillLevel}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={5}
        />
        <Button variant="outlined" color="secondary" type="submit">Submit</Button>
      </form>
      {submitSuccess && <Navigate to="/" />}
    </div>
  );
};

export default Signup;