import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Bookspage from './components/Bookspage';
import Register from './components/Register';
function App() {
  return (
    
        <Routes>
          <Route path="/" element={<Bookspage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
  );
}

export default App;
