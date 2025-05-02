import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const HomePage = () => {
  return (
    <div className="div-home">
      <h1>Welcome to the Word Chain Game!</h1>
      <pre>
        {`Word Chain is a fun word game where each word starts with the last letter of the previous one.
         Test your vocabulary and build the longest chain possible!`}
      </pre>
      <Link to="/game">
        <button className="start-button">Play Game</button>
      </Link>

    </div>
  );
};

export default HomePage;

