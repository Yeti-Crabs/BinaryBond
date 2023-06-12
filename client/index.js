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

import './stylesheets/styles.scss';
import './stylesheets/reactToastify.css';
import './stylesheets/cubeSlider.css';
import './stylesheets/awesomeSlider.css';

// create root and render app
const root = createRoot(document.getElementById('root'));
root.render(
  // wrap app with BrowserRouter component and Provider components
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
