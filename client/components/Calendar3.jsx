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
  console.log(session);
  console.log(start);

  return (
    <div className='calendar3'>
      <div>
        <div>
          {session ? (
            <>
              <h2>hey there {session.user.email}</h2>
              <p>Schedule your Pair Programming Session</p>
              <DateTimePicker onChange={setStart} value={start} />
              <p>End Session</p>
              <div>
                <DateTimePicker onChange={setEnd} value={end} />
                <button onClick={() => signOut()}>Sign Out</button>
              </div>
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
