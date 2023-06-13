import React from 'react';
import List from '@mui/material/List';
import RequestCard from './RequestCard';

const IncomingRequests = ({ requests }) => {
  console.log('i am incoming requests', requests)


  return (
    <div id='incomingRequests'>
      <h2>Incoming Requests</h2>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'secondary.main',borderRadius: '16px' }}>
        {requests.map((request,i)=><RequestCard key={i} {...request}/>)}
      </List>
    </div>
  )
}
export default IncomingRequests