import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, IconButton } from '@mui/material';
import { useState } from 'react';
import { update, login } from '../store/userSlice';
import { Navigate } from "react-router-dom";


const UserProfile = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [bio, setBio] = useState('')
  const [subjects, setSubjects] = useState('')
  const [logdel, setlogdel] = useState(false)

  console.log(user)
  const name = user.firstname + ' ' + user.lastname

  const logout = () => {
    setlogdel(true)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editProfile = async (event) => {
    event.preventDefault() // <--- !IMPORTANT!
    const body = { user_id: user.user_id, bio, subjects }
    try {
      const response = await fetch('/api/home', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        console.log('Data updated successfully')
      }
      dispatch(update(body))
    }
    catch (error) {
      console.log(error)
    }
  }

  const deleteUser = async () => {
    const body = { user_id: user.user_id }
    try {
      const response = await fetch('/api/home', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        setlogdel(true)
        console.log('User deleted successfully')
      }
    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <div id='userProfile'>
      <div>
        <div>
          <img src="https://iili.io/H6JgbMx.webp" style={{ width: '100px', height: '100px' }} alt="" />
          <IconButton style={{ width: '30px', height: '30px' }} onClick={handleClickOpen}>
            <EditIcon />
          </IconButton>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Profile</DialogTitle>
            <form onSubmit={editProfile}>
              <DialogContent>
                <DialogContentText>
                  Edit Your Subjects or Bio
                </DialogContentText>
                <TextField
                  autoFocus
                  onChange={e => setBio(e.target.value)}
                  margin="dense"
                  id="bio"
                  label="Bio"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={bio}
                />
                <TextField
                  margin="dense"
                  onChange={e => setSubjects(e.target.value)}
                  id="subjects"
                  label="Subjects"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={subjects}
                />

              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose} type='submit'>Done</Button>
              </DialogActions>
            </form>
          </Dialog>
        </div>
        <div>
          <div>
            <h2>{name}</h2>
          </div>
          <div className='userInfo'>
            <h3>Email:</h3>
            <p>{user.email}</p>
          </div>
          <div className='userInfo'>
            <h3>Bio:</h3>
            <p>{user.bio}</p>
          </div>
          <div className='userInfo'>
            <h3>Subjects:</h3>
            <p>{user.subjects}</p>
            <h3>Skill level: {user.skilllevel}</h3>
          </div>
        </div>
      </div>
      <div id='logoutDelete'>
          <Button id='logout' variant="contained" onClick={logout} >Logout</Button>
          <Button id='delete' variant="contained" onClick={deleteUser} color="error">Delete Profile</Button>
          {logdel && <Navigate to="/" />}
        </div>
    </div>
  )
}
export default UserProfile

