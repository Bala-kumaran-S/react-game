import React, { useState, useEffect } from 'react';
import './Memory.css';

const CARD_VALUES = [
  '🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🥕', '🍆'
];
const CARDS = [...CARD_VALUES, ...CARD_VALUES]; // duplicate for pairs

function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Memory() {
  const [cards, setCards] = useState(() => shuffle(CARDS));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (flipped.length === 2) {
      setTimeout(() => {
        const [i, j] = flipped;
        if (cards[i] === cards[j]) {
          setMatched((prev) => [...prev, i, j]);
        }
        setFlipped([]);
        setMoves((m) => m + 1);
      }, 800);
    }
  }, [flipped, cards]);

  function handleFlip(idx) {
    if (flipped.length < 2 && !flipped.includes(idx) && !matched.includes(idx)) {
      setFlipped([...flipped, idx]);
    }
  }

  function handleRestart() {
    setCards(shuffle(CARDS));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  }

  return (
    <div className="memory-dark">
      <div className="memory-header">
        <button onClick={handleRestart}>Restart</button>
        <h2>Memory Flip Game</h2>
        <div className="memory-moves">
          Moves: {moves}
        </div>
      </div>
      <div className="memory-grid">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          return (
            <div
              key={idx}
              className={`memory-card${isFlipped ? ' flipped' : ''}`}
              onClick={() => handleFlip(idx)}
              style={{ pointerEvents: isFlipped ? 'none' : 'auto' }}
            >
              <div className="memory-card-inner">
                <div className="memory-card-front">❓</div>
                <div className="memory-card-back">{card}</div>
              </div>
            </div>
          );
        })}
      </div>
      {matched.length === cards.length && (
        <div className="memory-overlay">
          <div className="memory-congrats">🎉 You Win!</div>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
}