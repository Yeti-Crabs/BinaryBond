import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import { Homepage, Login, Signup } from './components/'

import Homepage from './components/Homepage'
import Login from './components/Login'
import Signup from './components/Signup'

import './stylesheets/styles.css';

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