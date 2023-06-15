import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from './Card.jsx';

const PartnerCards = () => {
  const user = useSelector((state) => state.user);
  const [allusers, setAllUsers] = useState([]);

  const fetchData = async () => {
    const body = { user_id: user.user_id };
    try {
      const response = await fetch('/api/home/getallusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const data = await response.json();
        setAllUsers(data);
        console.log('We have got all the users');
      }
    } catch (error) {
      console.error(error)
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(allusers);
  const users = allusers.map((user, i) => (
    <div key={i}>
      <Card key={i} {...user} />
    </div>
  ));

  return (
    <div id='partnerCards'>
      <AwesomeSlider animation='cubeAnimation'>{users}</AwesomeSlider>
    </div>
  );
};
export default PartnerCards;
