import React, { Fragment } from 'react';

import './GameScore.css';

interface GameScoreProps {
  caught: number;
  fallen: number;
  maxFallen: number;
}

export const GameScore = function GameScore({ caught, fallen, maxFallen }: GameScoreProps) {
  const caughtText = `${caught} caught `;
  const fallenText = `${fallen} fallen (max: ${maxFallen})`;

  return (
    <Fragment>
      <div className="score-caught">
        {caughtText}
      </div>
      <div className="score-fallen">
        {fallenText}
      </div>
    </Fragment>
  );
}
