import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { createRoot } from 'react-dom/client';
import { store } from './store';
//Allows state to persist through entirety ⬇
import { Provider } from 'react-redux';


import './stylesheets/styles.css';
import './stylesheets/reactToastify.css';
import './stylesheets/cubeSlider.css';
import './stylesheets/awesomeSlider.css';


const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
