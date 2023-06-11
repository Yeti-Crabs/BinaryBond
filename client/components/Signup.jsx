import React from 'react'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Slider from '@mui/material/Slider';

const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [subjects, setSubjects] = useState('')
  const [skillLevel, setSkillLevel] = useState('')
  //
  // Send a post request to DB
  // Redirect user to 
  const formSubmission = () => {
    
  }

  return (
    <div>
    <h1>Signup</h1>
    <form>
    {/* <form onSubmit={}> */}
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
            onChange={e => setEmail(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="email"
            sx={{ mb: 3 }}
            size='medium'
            value={email}
          />
          <Slider
            aria-label="Temperature"
            defaultValue={30}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={10}
            max={110}
            />
            <Slider defaultValue={30} step={10} marks min={10} max={110} disabled />
    </form>
    </div>
  )
}

export default Signup