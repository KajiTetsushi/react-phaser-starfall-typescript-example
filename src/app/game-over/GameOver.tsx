import React, { FunctionComponent } from 'react';

export type GameOverProps = {
  score?: number;
  onReplayClick?: () => void;
  onEndClick?: () => void;
};

export const GameOver: FunctionComponent<GameOverProps> = (props) => {
  const {
    score,
    onReplayClick,
    onEndClick,
  } = props;

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
