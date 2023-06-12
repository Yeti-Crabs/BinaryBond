import React from 'react';
import List from '@mui/material/List';
import RequestCard from './RequestCard';

const IncomingRequests = ({ requests }) => {
  console.log('i am incoming requests', requests)


  return (
    <div>
      <h3>Incoming Requests</h3>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {requests.map((request,i)=><RequestCard key={i} {...request}/>)}
      </List>
    </div>
  )
}
export default IncomingRequests