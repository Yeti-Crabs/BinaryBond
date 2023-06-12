import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OutgoingRequests from './OutgoingRequests';
import IncomingRequests from './IncomingRequests';
import PartnerCards from './PartnerCards';
import UserProfile from './UserProfile';
import { useState,useEffect } from 'react';

const Homepage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [requests,setRequests] = useState([])
  const [received,setReceived] = useState(false)



  const fetchData = async () => {
    const body = {
      user_id: user.user_id
    }
    try {
      const response = await fetch('/api/home/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        console.log('We got the requests')
      }
      const data = await response.json()
      setRequests(data)
      setReceived(true)
    } catch (error) {
      console.log(error)
    } 
  }

useEffect(()=>{ 
  fetchData()
},[])

useEffect(()=>{
  const id =setInterval(()=>{
    fetchData()
  },5000)
  return ()=>{
    clearInterval(id)
  }
},[])



  return (
    <div className='homepage'>
      <h1>Homepage</h1>
      <div className='container'>
        <UserProfile />
        <PartnerCards />
        <div className="requests">
         {received && <IncomingRequests requests={requests.wantToWorkWith}/>} 
         {received && <OutgoingRequests requests={requests.wantsToWorkWithYOU}/>} 
          
        </div>
      </div>
    </div>
  );
};

export default Homepage;