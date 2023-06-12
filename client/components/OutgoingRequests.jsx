import React from 'react';
import RequestCard from './RequestCard'
import List from '@mui/material/List'

const OutgoingRequests = ({ requests }) => {
  console.log('i am outgoing requests', requests)


  return (
    <div>
      <h3>Outgoing Requests</h3>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {requests.map((request,i)=><RequestCard key={i} {...request}/>)}
      </List>
    </div>
  )
}
export default OutgoingRequests;