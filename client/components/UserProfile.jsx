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
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ProfilePic from './ProfilePic';
import Calendar3 from './Calendar3'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';




const UserProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [bio, setBio] = useState('')
  const [subject, setSubject] = useState('')
  const [profileurl, setProfileurl] = useState('https://iili.io/H6qbG2V.jpg');
  const [logdel, setlogdel] = useState(false)
  //NEW, displays calendar
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  //

  const displayEdit = () => {
    toast.success('🙂  Succesfull Edit!! 🙂 ', {
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

  const displayDelete = () => {
    toast.error('😿 User Deleted😿 ', {
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

  console.log(user);
  const name = user.firstname + ' ' + user.lastname;

  const logout = () => {
    setlogdel(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editProfile = async (event) => {
    event.preventDefault(); // <--- !IMPORTANT!
    const body = { user_id: user.user_id, bio, subjects };
    try {
      const response = await fetch('/api/home', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        displayEdit();
        console.log('Data updated successfully');
      }
      dispatch(update(body));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    const body = { user_id: user.user_id };
    try {
      const response = await fetch('/api/home', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        displayDelete();
        setTimeout(() => {
          setlogdel(true);
        }, 3000);
        console.log('User deleted successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id='userProfile'>
      <div>
        <div>
          <img src={user.profileurl} style={{ width: '100px', height: '100px' }} alt="Profile picture" border="0" />
          <IconButton style={{ width: '30px', height: '30px' }} onClick={handleClickOpen}>
            <EditIcon />
          </IconButton>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Profile</DialogTitle>
            <form onSubmit={editProfile}>
              <DialogContent>
                <DialogContentText>Edit Your Subjects or Bio</DialogContentText>
                <TextField
                  autoFocus
                  onChange={(e) => setBio(e.target.value)}
                  margin='dense'
                  id='bio'
                  label='Bio'
                  type='text'
                  fullWidth
                  variant='standard'
                  value={bio}
                />
                <TextField
                  margin="dense"
                  onChange={e => setSubject(e.target.value)}
                  id="subjects"
                  label="Subjects"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={subject}
                />
                <DialogContentText>
                  Upload Profile Picture
                </DialogContentText>

              </DialogContent>
              <DialogActions>
                <ProfilePic
                  label="Picture"
                  onChange={e => setProfileurl(setProfileurl)}
                  value={profileurl} />
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose} type='submit'>
                  Done
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </div>
        <div className="biobox">
          <div className="biobox">
            <h2>{name}</h2>
          </div>
          <div className='userInfo'>
            <h3>Email:</h3>
            <p>{user.email}</p>
          </div>
          <div className='userInfo'>
            <h3>Bio:</h3>
            <p id='bio'>{user.bio}</p>
          </div>
          <div className='userInfo'>
            <h3>Subjects:</h3>
            <p>{user.subject}</p>
          </div>
          <div className='userInfo'>
            <h3>Skill level: {user.skilllevel}</h3>
          </div>
        </div>
      </div>
      {/* //GOOGLE MODAL */}
      <div>
      <Button onClick={handleOpen2}>Schedule a pair programming session</Button>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Calendar Login
          </Typography>
          <Calendar3 />
        </Box>
      </Modal>
    </div>
    {/* //MODAL END */}

      <div id='logoutDelete'>
        <Button id='logout' variant='contained' onClick={logout}>
          Logout
        </Button>
        <Button
          id='delete'
          variant='contained'
          onClick={deleteUser}
          color='error'
        >
          Delete Profile
        </Button>
        {logdel && <Navigate to='/' />}
      </div>
    </div>
  );
};
export default UserProfile;
