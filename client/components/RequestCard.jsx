import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ToastContainer, toast } from 'react-toastify';

const RequestCard = ({ email, firstname, lastname, user_id, subjects, request_id }) => {
  const user = useSelector((state) => state.user)

  const displayDeleteRequest = () => {
    toast.success('😈 Successful Delete 😈', {
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


  const deleteRequest = async () => {
    const body = {
      user_id: user.user_id,
      partner_id: user_id
    }
    try {
      const response = await fetch('/api/home/requests', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        displayDeleteRequest()
        console.log('Request deleted successfully')
      }
    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://qotoqot.com/sad-animations/img/400/emotional_eating/emotional_eating.png" />
        </ListItemAvatar>
        <ListItemText
          primary={`${firstname} ${lastname}`}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {email}
              </Typography>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {subjects}
              </Typography>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {`csbin.io/binarybond/${request_id}`}
              </Typography>

            </React.Fragment>
          }
        />
        <IconButton style={{ width: '30px', height: '30px' }} onClick={deleteRequest}>
          <DeleteForeverIcon />
        </IconButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  )
}

export default RequestCard