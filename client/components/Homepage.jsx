import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OutgoingRequests from './OutgoingRequests';
import IncomingRequests from './IncomingRequests';
import PartnerCards from './PartnerCards';
import UserProfile from './UserProfile';


const Homepage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div>
      <h1>Homepage</h1>
      <div className='container'>
        <UserProfile />
        <PartnerCards />
        <div className="requests">
          <IncomingRequests />
          <OutgoingRequests />
        </div>
      </div>
    </div>
  );
};

export default Homepage;