import React from 'react';

export default class GameOverBox extends React.Component  {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="login-box">
        <h1>Game Over</h1>
        <p>Your points: {this.props.points}</p>
        <button type="button" className="btn btn-primary" onClick={this.props.handleContinueGame}>Continue</button>
      </div>
    );
  }
}
