import React, { useState } from 'react';
import Hangman from './components/hangman/Hangman';
import Memory from './components/memorygame/Memory';
import './App.css';

function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="header-content">
          {selectedGame && (
            <button
              className="back-btn"
              onClick={() => setSelectedGame(null)}
            >
              ← Back to Home
            </button>
          )}
          <h1>Welcome to React Games!</h1>
          <div className="portfolio-dropdown">
            <button className="portfolio-btn">Portfolios ▼</button>
            <div className="portfolio-menu">
              <a href="https://portfolio1.example.com" target="_blank" rel="noopener noreferrer">Person 1</a>
              <a href="https://portfolio2.example.com" target="_blank" rel="noopener noreferrer">Person 2</a>
              <a href="https://portfolio3.example.com" target="_blank" rel="noopener noreferrer">Person 3</a>
              <a href="https://portfolio4.example.com" target="_blank" rel="noopener noreferrer">Person 4</a>
            </div>
          </div>
        </div>
      </header>
      {!selectedGame && (
        <div className="game-selection">
          <div className="game-card">
            <button className="game-btn hangman-btn" onClick={() => setSelectedGame('hangman')}>
              Play Hangman
            </button>
            <div className="game-desc">
              Guess the Tamil movie name, one letter at a time.<br />
              Choose your favorite actor's movies as the topic!
            </div>
          </div>
          <div className="game-card">
            <button className="game-btn memory-btn" onClick={() => setSelectedGame('memory')}>
              Play Memory Game
            </button>
            <div className="game-desc">
              Flip the cards and match all the fruit and veggie pairs<br />
              with the least moves possible.
            </div>
          </div>
        </div>
      )}
      <main className="game-main">
        {selectedGame === 'hangman' && <Hangman />}
        {selectedGame === 'memory' && <Memory />}
      </main>
    </div>
  );
}

export default App;