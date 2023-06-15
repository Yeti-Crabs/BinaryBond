import React, { useState } from 'react';
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from '@supabase/auth-helpers-react';
import DateTimePicker from 'react-datetime-picker';
import '../stylesheets/styles.scss';

const Calendar3 = () => {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const session = useSession(); //when session exists, we have a user.
  const supabase = useSupabaseClient(); //talk to supabase
  const { isLoading } = useSessionContext();
  if (isLoading) {
    return <></>;
  }

  //
  async function googleSignIn() {
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
        alert('Event created, check your Google Calendar!');
      });
  }

  console.log(session);
  console.log(start);
  console.log(eventName);
  console.log(eventDescription);

  return (
    <div className='calendar3'>
      <div>
        <div style={{ width: '400px', margin: '30px' }}>
          {session ? (
            <>
              <h2>hey there {session.user.email}</h2>
              <p>Schedule your Pair Programming Session</p>
              <DateTimePicker onChange={setStart} value={start} />
              <p>End Session</p>
              <p>Subject</p>
              <input
                type='text'
                onChange={(e) => setEventName(e.target.value)}
              />
              <p>Subject Description</p>
              <input
                type='text'
                onChange={(e) => setEventDescription(e.target.value)}
              />
              <hr />
              <button onClick={() => createCalendarEvent()}>
                {' '}
                Create Calendar Event
              </button>
              <p></p>
              <button onClick={() => signOut()}>Sign Out</button>
              <DateTimePicker onChange={setEnd} value={end} />
              <button onClick={() => signOut()}>Sign Out</button>
            </>
          ) : (
            <>
              <button onClick={() => googleSignIn()}>
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
