import React from 'react';
import io from 'socket.io-client';

import { GameConfig } from '../config/game-config';
import GameCanvas from '../components/game-canvas';
import SpriteContainer from '../components/sprite-container';
import StaticSprite from '../components/static-sprite';
import AnimatedSprite from '../components/animated-sprite';

const KeyCodes = {
  LEFT:  37,
  RIGHT: 39,
  UP:    38,
  DOWN:  40
};

export default class GameController extends React.Component  {
  constructor() {
    super();
    this.state = {
      game : {
        players : [],
        food : []
      },
      player : {
        id : 0,
        name : ''
      },
      board : {
        width : 0,
        height : 0,
        obstacles : []
      },
      addedPointsMessages : '',
      addedPoints : 0,
      playerPoints : 0
    };
    this.getBoardSize = this.getBoardSize.bind(this);
  }

  componentDidMount() {
    this.socket = io();
    this.initSocketListeners();
    this.handleKeysEvents();

    this.socket.emit('new-player', this.props.playerName);

    this.spriteContainer = new SpriteContainer();
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  initSocketListeners() {
    this.socket.on('welcome-info', this.initGame.bind(this));
    this.socket.on('new-game-state', this.updateGameState.bind(this));
    this.socket.on('added-points', this.addedPoints.bind(this));
    this.socket.on('game-over', this.gameOver.bind(this));
  }

  handleKeysEvents() {
    let self = this;
     window.addEventListener('keydown', (e) => {
       e.preventDefault();
       let key = e.which || e.keyCode;

       switch(key) {
         case KeyCodes.LEFT:  self.socket.emit('key-pressed', 'left');  break;
         case KeyCodes.RIGHT: self.socket.emit('key-pressed', 'right'); break;
         case KeyCodes.UP:    self.socket.emit('key-pressed', 'up');    break;
         case KeyCodes.DOWN:  self.socket.emit('key-pressed', 'down');  break;
       }
     });
  }

  initGame(data) {
    this.setState({
      player : data.player,
      board : data.board
    });

    this.gameCanvas = new GameCanvas(this.getBoardSize().width, this.getBoardSize().height);
    this.renderGame();
  }

  updateGameState(gameState) {
    gameState.players.sort((p1, p2) => {
      return p2.points-p1.points
    });
    this.setState({ game : gameState });
  }

  addedPoints(points) {
    let addedPointsMessage = (
      <p className="points-message">+{points} P.</p>
    );
    this.setState({
      addedPointsMessages : this.state.addedPointsMessages + addedPointsMessage,
      addedPoints : points,
      playerPoints : this.state.playerPoints + points
    });
  }

  gameOver(points) {
    this.props.handleGameOver(points);
  }

  renderGame() {
    this.spriteContainer.updateAnimatedSprites();

    this.gameCanvas.clear();
    this.renderObstacles();
    this.renderFood();
    this.renderPlayers();

    setTimeout(this.renderGame.bind(this), 1000 / GameConfig.FPS);
  }

  renderPlayers() {
    for(const player of this.state.game.players) {
      let blockType = player.id == this.state.player.id ? 'block-green' : 'block-blue';
      for(const block of player.blocks) {
        let x = block.x * GameConfig.BLOCK_SIZE;
        let y = block.y * GameConfig.BLOCK_SIZE;
        this.spriteContainer.getSprite(blockType).render(x, y, this.gameCanvas);
      }
    }
  }

  renderObstacles() {
    for(const obstacle of this.state.board.obstacles) {
      let x = obstacle.x * GameConfig.BLOCK_SIZE;
      let y = obstacle.y * GameConfig.BLOCK_SIZE;
      this.spriteContainer.getSprite('block-grey').render(x, y, this.gameCanvas);
    }
  }

  renderFood() {
    for(const food of this.state.game.food) {
      let blockType = food.type == 1 ? 'crystal-orange' : food.type == 3 ? 'crystal-pink' : 'coin';
      let x = food.position.x * GameConfig.BLOCK_SIZE;
      let y = food.position.y * GameConfig.BLOCK_SIZE;
      this.spriteContainer.getSprite(blockType).render(x, y, this.gameCanvas);
    }
  }

  getBoardSize() {
    return {
      width  : this.state.board.width * GameConfig.BLOCK_SIZE,
      height : this.state.board.height * GameConfig.BLOCK_SIZE
    }
  }

  render() {
    let playerList = this.state.game.players.map((player) =>
      <tr><td>{player.name}</td><td>{player.points} P.</td></tr>
    );

    return (
      <div className="game-container clearfix">
        <div className="board-container">
          <div className="player-points">
            Points: {this.state.playerPoints}
          </div>
          <canvas id="game-canvas" width={this.getBoardSize().width} height={this.getBoardSize().height}></canvas>
          <div className="move-info">Use <span className="arrows">[←][↑][↓][→]</span> to MOVE</div>
        </div>
        <div className="player-list">
          <table>
            <tr><th>Player:</th><th>Points:</th></tr>
            {playerList}
          </table>
        </div>
      </div>
    );
  }
}
