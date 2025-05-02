import React from 'react'
import { Link } from 'react-router-dom';

import './Navbar.css'
const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <h1 className="navbar-title">Word Chain Game</h1>
        <div className='div-nav'>
          <Link to="/">Home</Link>
          <Link to="/game">Game</Link>
          <Link to="/scores">Scores</Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar