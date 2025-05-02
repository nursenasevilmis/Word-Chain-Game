import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './GameComponents/Navbar';   
import Home from './GameComponents/Home';       
import Game from './GameComponents/Game';     
import Scores from './GameComponents/Score';  
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/scores" element={<Scores />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
