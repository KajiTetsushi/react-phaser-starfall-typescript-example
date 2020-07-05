import React, { Fragment, FunctionComponent } from 'react';

import './GameScore.css';

export type GameScoreProps = {
  starsCaught?: number;
  starsFallen?: number;
  starsFallenMax?: number;
};

export const GameScore: FunctionComponent<GameScoreProps> = (props) => {
  const {
    starsCaught,
    starsFallen,
    starsFallenMax,
  } = props;

  const caughtText = `${starsCaught} caught `;
  const fallenText = `${starsFallen} fallen (max: ${starsFallenMax})`;

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
};
