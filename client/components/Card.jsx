import React from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const Card = ({ bio, skilllevel, email, firstname, lastname, user_id, profileurl }) => {
  const user = useSelector((state) => state.user)

  const displayThumbUp = () => {
    toast.success('👍 Partner Added To Outgoing👍 ', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: 'success1',
      theme: 'dark',
    });
  };

  const displayFail = () => {
    toast.error('👎 Already Liked👎 ', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const thumbUp = async (e) => {
    e.preventDefault()
    console.log('hello')
    const body = {
      user_id: user.user_id,
      partner_id: user_id
    }
    try {
      const response = await fetch('/api/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        displayThumbUp()
        console.log('You like this person.')
      } else {
        displayFail()
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='cards'>

      <h2 className='cardName'>Name: {firstname} {lastname}</h2>
      <h2 className='cardPic'><img src={profileurl} style={{ width: '100px', height: '100px' }} alt="Profile picture" border="0" /></h2>
      <h3 className='cardEmail'>Email: {email}</h3>
      <h3 className='cardBio'>Bio: {bio}</h3>
      <h1 className='cardSkillLevel'>Skill Level: {skilllevel}</h1>
      <IconButton style={{ width: '30px', height: '30px' }} onClick={thumbUp}>
        <ThumbUpIcon color="action" />
      </IconButton>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </div>
  )
}

export default Card