// import '../stylesheets/styles.scss';
// import React, { useState } from 'react';
// import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
// import '../stylesheets/styles.scss';
// import { ToastContainer, toast } from 'react-toastify';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';


// const Calendar3 = () => {
//   //STATE
//   //CALENDAR STATE
//   const [start, setStart] = useState('');
//   const [end, setEnd] = useState('');
//   const [eventName, setEventName] = useState('');
//   const [eventDescription, setEventDescription] = useState('');
//   const [email, setEmail] = useState('');

//   //SESSION STATE
//   const session = useSession(); //when session exists, we have a user.
//   const supabase = useSupabaseClient(); //talk to supabase
//   const { isLoading } = useSessionContext();

//   //DEFAULT REFRESH
//   if (isLoading) {
//     return <></>;
//   }

//   //GOOGLE AUTH
//   async function googleSignIn() {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: {
//         scopes: 'https://www.googleapis.com/auth/calendar',
//       },
//     });
//     if (error) {
//       alert('Error logging in to Google provider with Supabase');
//       console.log(error);
//     }
//   }
//   async function signOut() {
//     await supabase.auth.signOut();
//   }




//   //NEW CALENDAR EVENT (POST REQUEST)
//   async function createCalendarEvent() {
//     console.log('Creating calendar event');
//     const event = {
//       summary: eventName,
//       description: eventDescription,
//       start: {
//         dateTime: start.toISOString(),
//         timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//       },
//       end: {
//         dateTime: end.toISOString(),
//         timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//       },
//       attendees:[
//         {
//           "email": `${email}`,
//           "optional": true,
//         }
//       ]
//     };
//     await fetch(
//       'https://www.googleapis.com/calendar/v3/calendars/primary/events',
//       {
//         method: 'POST',
//         headers: {
//           Authorization: 'Bearer ' + session.provider_token,
//         },
//         body: JSON.stringify(event),
//       }
//     )
//       .then((data) => {
//         return data.json();
//       })
//       .then((data) => {
//         console.log(data);
//         displayNotification();
//       });
//   }

//   //BROWSER CONSOLES
//   console.log(session);
//   console.log(start);
//   console.log(eventName);
//   console.log(eventDescription);

//   //TOASTIFY
//   const displayNotification = () => {
//     toast.success('New Event Created!', {
//       position: 'top-center',
//       autoClose: 2000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: 'dark',
//     });
//   };

//   //RENDER
//   return (
//     <div className='calendar3'>
//       <div>
//         <div style={{ width: '400px', margin: '30px' }}>
//           {session ? (
//             <>
//               <h2>What is up {session.user.email}</h2>
//               <p>Schedule your Pair Programming Session</p>
//               <div>
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
//                   <DateTimePicker
//                       label="Session Start Time"
//                       value={start}
//                       onChange={(newValue) => setStart(newValue)}
//                     />
//                     <DateTimePicker
//                       label="Session End Time"
//                       value={end}
//                       onChange={(newValue) => setEnd(newValue)}
//                     />
//                   </DemoContainer>
//               </LocalizationProvider>
//               </div>
//               <p>Subject</p>
//               <input
//                 type='text'
//                 onChange={(e) => setEventName(e.target.value)}
//                 required
//               />
//               <p>Subject Description</p>
//               <input
//                 type='text'
//                 onChange={(e) => setEventDescription(e.target.value)}
//                 required
//               />
//               <p>Partner Email Address</p>
//               <input
//                 type='text'
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <hr />
//               <button onClick={() => createCalendarEvent()}>
//                 {' '}
//                 Create Calendar Event
//               </button>
//               <p></p>
//               <button onClick={() => signOut()}>Sign Out</button>
//             </>
//           ) : (
//             <>
//              <h2>We Promise Not to Steal Your Calendar Info</h2>
//               <button onClick={() => googleSignIn()} >
//                 Sign in with Google
//               </button>
//             </>
//           )}
//           ;
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Calendar3;




//
//
///
//


import '../stylesheets/styles.scss';
import React, { useState } from 'react';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import '../stylesheets/styles.scss';
import { ToastContainer, toast } from 'react-toastify';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


const Calendar3 = () => {
  //STATE
  //CALENDAR STATE
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [email, setEmail] = useState('');

  //SESSION STATE
  const session = useSession(); //when session exists, we have a user.
  const supabase = useSupabaseClient(); //talk to supabase
  const { isLoading } = useSessionContext();

  //DEFAULT REFRESH
  if (isLoading) {
    return <></>;
  }

  //GOOGLE AUTH
  const googleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar',
      },
    });
    if (error) {
      alert('Error logging in to Google provider with Supabase');
      console.log(error);
    }
  }
  async function signOut() {
    await supabase.auth.signOut();
  }

  //NEW CALENDAR EVENT (POST REQUEST)
  async function createCalendarEvent() {
    console.log('Creating calendar event');
    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      attendees:[
        {
          "email": `${email}`,
          "optional": true,
        }
      ]
    };
    await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + session.provider_token,
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        displayNotification();
      });
  }

  //BROWSER CONSOLES
  console.log(session);
  console.log(start);
  console.log(eventName);
  console.log(eventDescription);

  //TOASTIFY
  const displayNotification = () => {
    toast.success('New Event Created!', {
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
  //RENDER
  return (
    <div className='calendar3'>
      <div>
        <div style={{ width: '400px', margin: '30px' }}>
          {session ? (
            <>
              <h2>What is up {session.user.email}</h2>
              <p>Schedule your Pair Programming Session</p>
              <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                  <DateTimePicker
                      label="Session Start Time"
                      value={start}
                      onChange={(newValue) => setStart(newValue)}
                    />
                    <DateTimePicker
                      label="Session End Time"
                      value={end}
                      onChange={(newValue) => setEnd(newValue)}
                    />
                  </DemoContainer>
              </LocalizationProvider>
              </div>
              <p>Subject</p>
              <input
                type='text'
                onChange={(e) => setEventName(e.target.value)}
                required
              />
              <p>Subject Description</p>
              <input
                type='text'
                onChange={(e) => setEventDescription(e.target.value)}
                required
              />
              <p>Partner Email Address</p>
              <input
                type='text'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <hr />
              <button onClick={() => createCalendarEvent()}>
                {' '}
                Create Calendar Event
              </button>
              <p></p>
              <button onClick={() => signOut()}>Sign Out</button>
            </>
          ) : (
            <>
             <h2>We Promise Not to Steal Your Calendar Info</h2>
              <button onClick={() => googleSignIn()} >
                Sign in with Google
              </button>
            </>
          )}
          ;
        </div>
      </div>
    </div>
  );
};

export default Calendar3;

