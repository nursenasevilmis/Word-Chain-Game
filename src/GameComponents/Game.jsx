import React, { useState, useEffect, useRef } from 'react';
import './Game.css';

const Game = () => {
  const [enterWord, setWord] = useState('');
  const [wordChain, setChain] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [feedbackColor, setFeedbackColor] = useState('');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [longestWord, setLongestWord] = useState('');
  const interval = useRef(null);


  const [bestScore, setBestScore] = useState(() => {
    const savedScore = sessionStorage.getItem('bestScore');
    return savedScore ? parseInt(savedScore) : 0;
  });


  useEffect(() => {
    if (gameStarted && !gameOver) {
      interval.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(interval.current);
            endGame();
            return 0;
          }
          return prevTimer - 1;
        });
        setTotalTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval.current);
  }, [gameStarted, gameOver]);

  const checkWordInDictionary = async (word) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      return response.ok;
    } catch (error) {
      console.error('API Error:', error);
      return false;
    }
  };


  const endGame = () => {
    setGameOver(true);
    if (score > bestScore) {
      setBestScore(score);
      sessionStorage.setItem('bestScore', score);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (gameOver) return;

    const word = enterWord.trim().toLowerCase();
    if (!word) return;

    if (!gameStarted) {
      setGameStarted(true);
    }
    if (wordChain.length > 0) {
      const lastWord = wordChain[wordChain.length - 1];
      if (word[0] !== lastWord[lastWord.length - 1]) {
        setFeedback('Word must start with: ' + lastWord[lastWord.length - 1].toUpperCase());
        setFeedbackColor('rgb(245, 93, 93)');
        return;
      }
    }
    if (wordChain.includes(word)) {
      setFeedback('This word has already been used!');
      setFeedbackColor('rgb(250, 159, 98)');
      return;
    }
    const isValid = await checkWordInDictionary(word);
    if (!isValid) {
      setFeedback('Invalid word!');
      setFeedbackColor('rgb(245, 93, 93)');
      return;
    }
    if (word.length > longestWord.length) {
      setLongestWord(word);
    }
    setChain([...wordChain, word]);
    setScore(score + word.length);
    const nextLetter = word[word.length - 1].toUpperCase();
    setFeedback(`Next word must start with: ${nextLetter}`);
    setFeedbackColor('rgb(103, 174, 110)');
    setWord('');
    setTimer(15);
  };


  const handleRestart = () => {

    if (score > bestScore) {
      setBestScore(score);
      sessionStorage.setItem('bestScore', score);
    }


    setWord('');
    setChain([]);
    setScore(0);
    setTimer(15);
    setGameOver(false);
    setGameStarted(false);
    setTotalTime(0);
    setFeedback('');
    setFeedbackColor('');
    setLongestWord('');
  };

  return (

    <div className="div-game">

      <h1>Word Chain Game</h1>
      <div className="div-score">
        <div id='score1'>Score:
          <p> {score} </p>
        </div>

        <div id='timer'>Timer:
          <p> {timer}s</p>
        </div>
        <div id='score2'>Best Score:
          <p>{bestScore}</p>
        </div>
      </div>

      {!gameOver ? (
        <>
          <form onSubmit={handleSubmit} className="word-form">
            <input
              type="text"
              value={enterWord}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Enter a word"
              className="word-input"
            />
            <button type="submit" className="submit-btn">Submit</button>
          </form>

          <div className="feedback" style={{ backgroundColor: feedbackColor }}>
            {feedback}
          </div>

          <div className="div-chain">
            {wordChain.map((word, index) => (
              <span key={index} className="word-item">{word}</span>
            ))}
          </div>
        </>
      ) : (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p id='p_score'>Your score: {score}</p>
          <p>Total Time: {totalTime} seconds</p>
          {longestWord && <p>Your Longest Word: {longestWord}</p>}
          {score > bestScore && bestScore !== 0 && (
            <p>🎉 Congratulations! New High Score! 🎉</p>

          )}
          <button onClick={handleRestart} className="restart-btn">Play Again</button>
          <div className="div-chain">
            {wordChain.map((word, index) => (
              <span key={index} className="word-item">{word}</span>
            ))}
          </div>
        </div>
      )}
    </div>

  );
};

export default Game;





















