import React from 'react';
import { GoogleLogin } from 'react-google-login';

const Calendar = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };

  const responseError = (error) => {
    console.log(error);
  };

  return (
    <div className='calendar'>
      <GoogleLogin
        clientId='789315168259-rv1vk1mr6v6908g6qosirs29ku015nl8.apps.googleusercontent.com'
        buttonText='Sign in & Authorize Calendar'
        onSuccess={responseGoogle}
        onFailure={responseError}
        cookiePolicy={'single_host_origin'}
        responseType='code'
        accessType='offline'
        scope='openid email profile https://www.googleapis.com/auth/calendar'
      />
    </div>
  );
};

export default Calendar;
