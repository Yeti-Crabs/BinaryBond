import React from 'react';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ProfilePic from './ProfilePic';


const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [subjects, setSubjects] = useState('');
  const [skillLevel, setSkillLevel] = useState(1);
  const [profileurl, setProfileurl] = useState('https://iili.io/H6qbG2V.jpg');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const displayNotification = () => {
    toast('😇 Successful Signup 😇', {
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

  // Send a post request to DB
  // Redirect user to
  const formSubmission = async (event) => {
    event.preventDefault();
    const body = { firstName, lastName, bio, subjects, email, password, skillLevel, profileurl };
    
    try {
      const response = await fetch('/api/', {
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
        console.log('Data inserted successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileImageChange = (image) => {
    const downloadURL = image.downloadURL;
    setProfileurl(downloadURL);
  };

  return (
    <div className='signUpPage'>
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
        theme='light'
      />
      <h1>Signup</h1>
      <form id='signUpFields' onSubmit={formSubmission}>
        <TextField
          label='First Name'
          onChange={(e) => setFirstName(e.target.value)}
          required
          variant='outlined'
          color='secondary'
          type='text'
          sx={{
            mb: 3,
            border: '1px, solid, white',
            borderRadius: '10px',
            backgroundColor: 'rgb(240, 240, 240)',
          }}
          size='medium'
          value={firstName}
        />
        <TextField
          label='Last Name'
          onChange={(e) => setLastName(e.target.value)}
          required
          variant='outlined'
          color='secondary'
          type='text'
          sx={{
            mb: 3,
            border: '1px, solid, white',
            borderRadius: '10px',
            backgroundColor: 'rgb(240, 240, 240)',
          }}
          size='medium'
          value={lastName}
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
        <TextField
          label="Subject"
          onChange={e => setSubjects(e.target.value)}
          required
          variant='outlined'
          color='secondary'
          type='text'
          sx={{
            mb: 3,
            border: '1px, solid, white',
            borderRadius: '10px',
            backgroundColor: 'rgb(240, 240, 240)',
          }}
          size='medium'
          value={subjects}

        />
        <TextField
          id='outlined-multiline-static'
          label='Bio'
          onChange={(e) => setBio(e.target.value)}
          required
          multiline
          variant='outlined'
          color='secondary'
          type='text'
          sx={{
            mb: 3,
            border: '1px, solid, white',
            borderRadius: '10px',
            backgroundColor: 'rgb(240, 240, 240)',
          }}
          size='medium'
          value={bio}
        />
        <Slider
          aria-label='skill Level'
          defaultValue={1}
          //getAriaValueText={valuetext}
          onChange={(e) => setSkillLevel(e.target.value)}
          value={skillLevel}
          valueLabelDisplay='auto'
          step={1}
          marks
          min={1}
          max={5}
          sx={{
            width: 300,
          }}
        />
        <ProfilePic 
          label="Picture"
          onChange={setProfileurl}
          value={profileurl}
          />
        <Button
          variant='outlined'
          color='secondary'
          type='submit'
          sx={{
            color: 'rgb(240, 240, 240)',
            backgroundColor: '#9c27b0',
          }}
        >
          Submit
        </Button>
      </form>
      {submitSuccess && <Navigate to='/' />}
    </div>
  );
};

export default Signup;
