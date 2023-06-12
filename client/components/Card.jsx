import React from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';

const Card = ({ bio, skilllevel, email, firstname, lastname, user_id }) => {
  const user = useSelector((state) => state.user)
  console.log(typeof user.user_id)
  console.log(typeof user_id)
  
  const thumbUp = async () => {
    const body = {
      user_id: user.user_id,
      partner_id: user_id
    }
    console.log(body)
    try {
      const response = await fetch('/api/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        console.log('You like this person.')
      }
    } catch (error) {
      console.log(error)
    } 
  }
  

  return (
    <div className='cards'>
      <h2 className='cardName'>Name: {firstname} {lastname}</h2>
      <h3 className='cardEmail'>Email: {email}</h3>
      <h3 className='cardBio'>Bio: {bio}</h3>
      <h1 className='cardSkillLevel'>Skill Level: {skilllevel}</h1>
      <IconButton style={{ width: '30px', height: '30px' }} onClick={thumbUp}>
        <ThumbUpIcon color="action" />
      </IconButton>
            
      
      
    </div>
  )
}

export default Card