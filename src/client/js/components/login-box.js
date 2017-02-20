import React from 'react';

export default class LoginBox extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      playerName : props.playerName
    };
    this.handlePlayerNameChange = this.handlePlayerNameChange.bind(this);
    this.handleJoinGame = this.handleJoinGame.bind(this);
  }

  handlePlayerNameChange(e) {
    this.setState({ playerName : e.target.value });
  }

  handleJoinGame(e) {
    e.preventDefault();
    this.props.handleJoinGame(this.state.playerName);
  }

  render() {
    return (
      <div className="login-box">
        <p>Type in your nick you want to use in game in order to join.</p>
        <form onSubmit={this.handleJoinGame}>
          <div className="form-group">
            <label>Your Nick:</label>
            <input type="text" className="form-control" placeholder="Type in your nick in game..." value={this.state.playerName} onChange={this.handlePlayerNameChange} />
          </div>
          <button type="submit" className="btn btn-primary">Join Game</button>
        </form>
      </div>
    );
  }
}
