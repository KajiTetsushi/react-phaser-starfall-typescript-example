import React, { FunctionComponent, Fragment, useState } from 'react';

import { Welcome } from './welcome';
import { Game } from './game';
import { GameOver } from './game-over';

export const App: FunctionComponent = () => {
  const [ mode, setMode ] = useState('welcome');
  const [ score, setScore ] = useState(0);
  const title = 'Starfall';

  switch (mode) {
    case 'welcome':
      return (
        <Welcome
          header={title}
          onPlayClick={() => setMode(() => 'game')}
        />
      );
    case 'game':
      return (
        <Game
          {...{title}}
          onSceneStop={(score) => {
            setScore(() => score);
            setMode(() => 'gameover');
          }}
          onGameStop={(score) => {
            setScore(() => score);
            setMode(() => 'gameover');
          }}
        />
      );
    case 'gameover':
      return (
        <GameOver
          {...{score}}
          onReplayClick={() => {
            setScore(() => 0);
            setMode(() => 'game');
          }}
          onEndClick={() => {
            setScore(() => 0);
            setMode(() => 'welcome');
          }}
        />
      );
    default:
      return (
        <Fragment>
          Unable to run game.
        </Fragment>
      );
  }
};
