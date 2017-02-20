import React from 'react';
import GameController from './game-controller';
import LoginBox from '../components/login-box';
import GameOverBox from '../components/game-over-box';

export default class ClientController extends React.Component  {
  constructor() {
    console.log('[Client Constructor]');
    super();
    this.state = {
      joinedGame : false,
      playerName : '',
      gameOver   : false,
      lastGamePoints : 0
    };
    this.joinGame = this.joinGame.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.continueGame = this.continueGame.bind(this);
  }

  createGameController() {
    return <GameController playerName={this.state.playerName} handleGameOver={this.gameOver} />;
  }

  createLoginBox() {
    return <LoginBox playerName={this.state.playerName} handleJoinGame={this.joinGame} />;
  }

  createGameOverBox() {
    return <GameOverBox points={this.state.lastGamePoints} handleContinueGame={this.continueGame} />;
  }

  joinGame(_playerName) {
    console.log('[Joining the Game] ' + _playerName);
    this.setState({ playerName : _playerName, joinedGame : true });
  }

  gameOver(points) {
    this.setState({
      joinedGame : false,
      gameOver   : true,
      lastGamePoints : points
    });
  }

  continueGame() {
    this.setState({
      gameOver : false,
    });
  }

  render() {
    let loginBox, gameOverBox, gameController;

    if(this.state.joinedGame) {
      gameController = this.createGameController();
    } else if(this.state.gameOver) {
      gameOverBox = this.createGameOverBox();
    } else {
      loginBox = this.createLoginBox();
    }

    return (
      <div className="site-wrapper">
        <header>
          <h3>Snake Multiplayer</h3>
        </header>
        <div className="content">
          { loginBox }
          { gameOverBox }
          { gameController }
        </div>
        <footer>
          <p>Snake Multiplayer © 2016/2017</p>
        </footer>
      </div>
    );
  }
}
