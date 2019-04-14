import React, { useState, Fragment } from 'react';

import { Welcome } from './welcome/Welcome';
import { Game } from './game/Game';
import { GameOver } from './game-over/GameOver';

export const App = function App() {
  const [ mode, setModeState ] = useState('welcome');
  const [ score, setScoreState ] = useState(0);
  const title = 'Starfall';

  switch (mode) {
    case 'welcome':
      return (
        <Welcome
          header={title}
          onPlayClick={() => setModeState(() => 'game')}
        />
      );
    case 'game':
      return (
        <Game
          {...{title}}
          onSceneStop={(score) => {
            setScoreState(() => score);
            setModeState(() => 'gameover');
          }}
          onGameStop={(score) => {
            setScoreState(() => score);
            setModeState(() => 'gameover');
          }}
        />
      );
    case 'gameover':
      return (
        <GameOver
          {...{score}}
          onReplayClick={() => {
            setScoreState(() => 0);
            setModeState(() => 'game');
          }}
          onEndClick={() => {
            setScoreState(() => 0);
            setModeState(() => 'welcome');
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
}
