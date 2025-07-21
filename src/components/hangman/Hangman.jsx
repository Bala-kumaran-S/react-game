import React, { useState } from 'react';
import './Hangman.css';

const MOVIES = {
  vijay: [
    "LEO", "MASTER", "BIGIL", "SARKAR", "MERSAL", "THERI", "KATHI", "THUPPAKKI", "POKKIRI", "GHILLI"
  ],
  ajith: [
    "VIDAMUYARCHI", "THUNIVU", "VALIMAI", "NERKONDA PAARVAI", "VISWASAM", "VIVEGAM", "VEDALAM", "YENNAI ARINTHAAL", "VEERAM", "ARRAMBAM"
  ],
  rajini: [
    "LAL SALAAM", "JAILER", "ANNATTHE", "DARBAR", "PETTA", "KAALA", "KABALI", "LINGAA", "KOCHADAIIYAAN", "ROBOT"
  ],
  kamal: [
    "INDIAN 2", "VIKRAM", "VISHWAROOPAM 2", "UTTAMA VILLAIN", "PAPANASAM", "VISHWAROOPAM", "DASAVATHARAM", "UNNAIPOL ORUVAN", "DASHAVATHARAM", "MANMADHAN AMBU"
  ]
};

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function getRandomMovie(topic) {
  const movies = MOVIES[topic];
  return movies[Math.floor(Math.random() * movies.length)];
}

export default function Hangman() {
  const [topic, setTopic] = useState('');
  const [word, setWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [wrong, setWrong] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  function startGame(selectedTopic) {
    const movie = getRandomMovie(selectedTopic);
    setTopic(selectedTopic);
    setWord(movie);
    setGuesses([]);
    setWrong(0);
    setGameOver(false);
    setWin(false);
  }

  function guessLetter(letter) {
    if (guesses.includes(letter) || gameOver) return;
    const newGuesses = [...guesses, letter];
    setGuesses(newGuesses);

    if (!word.includes(letter)) {
      const newWrong = wrong + 1;
      setWrong(newWrong);
      if (newWrong >= 6) setGameOver(true);
    } else {
      // Check win
      const allGuessed = word.split('').every(
        ch => ch === ' ' || newGuesses.includes(ch)
      );
      if (allGuessed) {
        setWin(true);
        setGameOver(true);
      }
    }
  }

  function renderWord() {
    return word.split('').map((ch, i) =>
      ch === ' ' ? <span key={i} style={{ margin: 4 }}> </span> :
        <span key={i} style={{
          borderBottom: '2px solid #333',
          width: 24,
          display: 'inline-block',
          textAlign: 'center',
          fontSize: 24,
          margin: 2
        }}>
          {guesses.includes(ch) ? ch : ''}
        </span>
    );
  }

  return (
    <div className="hangman-dark" style={{ textAlign: 'center', width: '100%', minHeight: '100vh' }}>
      {/* Show congrats only if win and topic is selected */}
      {win && topic && (
        <div className="hangman-congrats">
          🎉 Congrats! You proved you are a true {topic.charAt(0).toUpperCase() + topic.slice(1)} fan!
        </div>
      )}
      <h2>🎬 Tamil Movie Hangman</h2>
      {!topic && (
        <div>
          <h3>Select a Topic</h3>
          <div className="actor-selector">
            <button onClick={() => startGame('vijay')}>Vijay Movies</button>
            <button onClick={() => startGame('ajith')}>Ajith Movies</button>
            <button onClick={() => startGame('rajini')}>Rajini Movies</button>
            <button onClick={() => startGame('kamal')}>Kamal Movies</button>
          </div>
        </div>
      )}
      {topic && (
        <>
          <div className="hangman-topic">
            <strong>Topic:</strong> {topic.charAt(0).toUpperCase() + topic.slice(1)} Movies
          </div>
          {/* Hangman SVG at the top */}
          <div className="hangman-svg" style={{ margin: '2rem auto 1rem auto' }}>
            <svg height="120" width="120">
              {/* Gallows */}
              <line x1="10" y1="110" x2="110" y2="110" stroke="#333b4a" strokeWidth="4" />
              <line x1="30" y1="110" x2="30" y2="20" stroke="#333b4a" strokeWidth="4" />
              <line x1="30" y1="20" x2="80" y2="20" stroke="#333b4a" strokeWidth="4" />
              <line x1="80" y1="20" x2="80" y2="35" stroke="#333b4a" strokeWidth="4" />
              {/* Head */}
              {wrong > 0 && <circle cx="80" cy="45" r="10" stroke="#f44336" strokeWidth="3" fill="none" />}
              {/* Body */}
              {wrong > 1 && <line x1="80" y1="55" x2="80" y2="80" stroke="#f44336" strokeWidth="3" />}
              {/* Left Arm */}
              {wrong > 2 && <line x1="80" y1="60" x2="70" y2="70" stroke="#f44336" strokeWidth="3" />}
              {/* Right Arm */}
              {wrong > 3 && <line x1="80" y1="60" x2="90" y2="70" stroke="#f44336" strokeWidth="3" />}
              {/* Left Leg */}
              {wrong > 4 && <line x1="80" y1="80" x2="70" y2="100" stroke="#f44336" strokeWidth="3" />}
              {/* Right Leg */}
              {wrong > 5 && <line x1="80" y1="80" x2="90" y2="100" stroke="#f44336" strokeWidth="3" />}
            </svg>
          </div>
          {/* The guessing word at the bottom */}
          <div className="hangman-word" style={{ margin: '2rem 0 0 0', fontSize: 28 }}>
            {renderWord()}
          </div>
          <div className="hangman-status">
            Wrong guesses: {wrong} / 6
          </div>
          {/* Modern 3-row keyboard */}
          <div className="hangman-alphabet-modern">
            {[
              ['Q','W','E','R','T','Y','U','I','O','P'],
              ['A','S','D','F','G','H','J','K','L'],
              ['Z','X','C','V','B','N','M']
            ].map((row, rowIdx) => (
              <div className="hangman-keyboard-row" key={rowIdx}>
                {row.map(letter => (
                  <button
                    key={letter}
                    onClick={() => guessLetter(letter)}
                    disabled={guesses.includes(letter) || gameOver}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            ))}
          </div>
          
          {/* Overlay for win/game over */}
          {gameOver && (
            <div className="hangman-overlay">
              <div className="hangman-result">
                {win
                  ? <>🎉 You proved you are a true {topic.charAt(0).toUpperCase() + topic.slice(1)} fan!</>
                  : <>Are you truly a {topic.charAt(0).toUpperCase() + topic.slice(1)} fan?<br />The movie was <b>{word}</b></>
                }
              </div>
              <button onClick={() => setTopic('')}>Restart</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}