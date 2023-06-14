import React from 'react';
import { render } from 'react-dom';
// enables client side routing
// see App file
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { createRoot } from 'react-dom/client';
import { store } from './store';
// makes Redux store available to all components
// this enables components to access and update state in one place
import { Provider } from 'react-redux';
import { ReactDOM } from 'react';

import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

import './stylesheets/styles.scss';
import './stylesheets/reactToastify.css';
import './stylesheets/cubeSlider.css';
import './stylesheets/awesomeSlider.css';

const supabase = createClient(
  'https://ivjlgnwwixietycdxnqk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amxnbnd3aXhpZXR5Y2R4bnFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3ODIyOTksImV4cCI6MjAwMjM1ODI5OX0.MefLMgSdvE2tvaleD2mDOKLLf5cXIgJ8SZTyZJp2vG0'
);

// create root and render app
const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <SessionContextProvider supabaseClient={supabase}>
      <Provider store={store}>
        <App />
      </Provider>
    </SessionContextProvider>
  </BrowserRouter>
);
