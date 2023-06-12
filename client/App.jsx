import React from 'react';
// makes it possible to render components based on path
import { Route, Routes } from 'react-router-dom';

import Homepage from './components/Homepage'
import Login from './components/Login'
import Signup from './components/Signup'

import './stylesheets/styles.scss';
import './stylesheets/awesomeSlider.css';
import './stylesheets/cubeSlider.css';
import './stylesheets/reactToastify.css'

// render components based on path
// see navigate elements in Login and Signup files 
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>

    </div>
  );
}

export default App;