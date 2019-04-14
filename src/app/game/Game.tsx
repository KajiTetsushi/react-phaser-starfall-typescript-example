import React, { Component } from 'react';
import { Game as _Game, AUTO } from 'phaser';

import { getViewportDimensions } from '../utils/get-viewport-dimensions';
import { GameScore } from './GameScore';
import { GameScene } from './GameScene';
import { GameStopButton } from './GameStopButton';

import './Game.css';

interface GameConfig {
  type: number;
  width: number;
  height: number;
  backgroundColor: string;
  parent: string;
  scene: any;
  physics: object;
}

interface GameProps {
  onSceneStop: (score: number) => void;
  onGameStop: (score: number) => void;
  backgroundColor: string;
  title: string;
}

interface GameState {
  starsCaught: number;
  starsFallen: number;
  starsMaxFallen: number;
}

export class Game extends Component<GameProps, GameState> {
  game: _Game;
  parentId: string = 'game';

  static defaultProps = {
    backgroundColor: '#18216D',
  };

  constructor(props: GameProps) {
    super(props);

    const viewportDimensions = getViewportDimensions();
    viewportDimensions.height = viewportDimensions.height * 0.85;

    const gameConfig: GameConfig = {
      ...viewportDimensions,
      backgroundColor: props.backgroundColor,
      type: AUTO,
      parent: this.parentId,
      scene: GameScene,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
    };

    this.game = new _Game(gameConfig);
    this.game.events.on('onstarcaught', this.handleStarCaught);
    this.game.events.on('onstarfallen', this.handleStarFallen);
    this.game.events.on('onscenestop', this.handleSceneStop);

    this.state = {
      starsCaught: 0,
      starsFallen: 0,
      starsMaxFallen: GameScene.maxFallenStars,
    };
  }

  componentWillUnmount() {
    this.game.destroy(true);
  }
  
  handleStarCaught = ({ starsCaught }: { starsCaught: number }) => {
    this.setState(() => ({
      starsCaught,
    }));
  }

  handleStarFallen = ({ starsFallen }: { starsFallen: number }) => {
    this.setState(() => ({
      starsFallen,
    }));
  }

  handleSceneStop = () => {
    this.props.onSceneStop(this.state.starsCaught);
  }

  handleGameStop = () => {
    this.props.onGameStop(this.state.starsCaught);
  }

  render() {
    const {
      starsCaught: caught,
      starsFallen: fallen,
      starsMaxFallen: maxFallen,
    } = this.state;

    const { backgroundColor, title } = this.props;

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
              {...{ caught }}
              {...{ fallen }}
              {...{ maxFallen }}
            />
            <GameStopButton
              onStopClick={this.handleGameStop}
              content="Give up"
            />
          </h1>
        </div>
        <div id={this.parentId} />
      </div>
    );
  }
}
