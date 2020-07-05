import React, { FunctionComponent, useRef, useState } from 'react';
import { Game as _Game, AUTO } from 'phaser';

import { getViewportDimensions, useWillMount, useWillUnmount } from '../utils';
import { GameScore } from './GameScore';
import { GameScene } from './GameScene';
import { GameStopButton } from './GameStopButton';

import './Game.css';

export type GameProps = {
  onSceneStop?: (score: number) => void;
  onGameStop?: (score: number) => void;
  backgroundColor?: string;
  title?: string;
};

export const Game: FunctionComponent<GameProps> = (props) => {
  const canvasContainerId = 'game';
  const {
    backgroundColor = '#18216D',
    title,
    onGameStop,
    onSceneStop,
  } = props;

  const [ starsCaught, setStarsCaught ] = useState(0);
  const [ starsFallen, setStarsFallen ] = useState(0);
  const gameRef = useRef<_Game>();
  const starsCaughtRef = useRef(starsCaught);
  starsCaughtRef.current = starsCaught;

  const handleSceneStop = () => {
    typeof onSceneStop === 'function' && onSceneStop(starsCaughtRef.current);
  };

  const handleGameStop = () => {
    typeof onGameStop === 'function' && onGameStop(starsCaught);
  };

  useWillMount(() => {
    const viewportDimensions = getViewportDimensions();
    viewportDimensions.height = viewportDimensions.height * 0.85;

    const game = new _Game({
      ...viewportDimensions,
      backgroundColor: backgroundColor,
      type: AUTO,
      parent: canvasContainerId,
      scene: GameScene,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
    });

    game.events.on('onstarcaught', setStarsCaught);
    game.events.on('onstarfallen', setStarsFallen);
    game.events.on('onscenestop', handleSceneStop);

    gameRef.current = game;
  });

  useWillUnmount(() => {
    gameRef.current && gameRef.current.destroy(true);
  });

  // gameRef.current && gameRef.current.events.on('onscenestop', handleSceneStop);

  return (
    <div className="game">
      <div
        className="game-header"
        style={{ backgroundColor }}
      >
        <h1>
          {title}
        </h1>
        <h2>
          Click on the stars to catch them!
          </h2>
      </div>
      <div className="game-controls">
        <h1>
          <GameScore
            starsCaught={starsCaught}
            starsFallen={starsFallen}
            starsFallenMax={GameScene.maxFallenStars}
          />
          <GameStopButton
            onStopClick={handleGameStop}
            content="Give up"
          />
        </h1>
      </div>
      <div id={canvasContainerId} />
    </div>
  );
};
