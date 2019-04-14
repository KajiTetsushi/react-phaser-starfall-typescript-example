import React from 'react';

interface GameOverProps {
  score: number;
  onReplayClick: () => void;
  onEndClick: () => void;
}

export const GameOver = function GameOver({ score, onReplayClick, onEndClick }: GameOverProps) {
  return (
    <div>
      <h1>Your final score: {score}</h1>
      <div>
        <button onClick={onReplayClick}>
          Play again
        </button>
        <button onClick={onEndClick}>
          End game
        </button>
      </div>
    </div>
  );
}
