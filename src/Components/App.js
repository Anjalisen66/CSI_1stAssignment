// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormComponents from './FormComponents';
import DetailsComponent from './DetailscComponent';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormComponents />} />
        <Route path="/details" element={<DetailsComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
