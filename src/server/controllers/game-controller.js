import { GameConfig } from '../config/game-config';
import Player from '../components/player';
import PlayerList from '../components/player-list';
import Board from '../components/board';
import FoodList from '../components/food-list';
import BoardController from './board-controller';

export default class GameController {
  constructor(io) {
    this.io = io;
    this.playerList = new PlayerList();
    this.foodList = new FoodList();
    this.boardController = new BoardController(this.io, this.playerList, this.foodList);
  }

  start() {
    console.log("[Starting game...]");

    this.setListeners();
    this.runGame();

    console.log("[Game started]");
  }

  runGame() {
    this.boardController.movePlayers();
    this.boardController.generateCollisionsList();
    this.boardController.handlePlayersCollisions();

    const gameState = {
      players : this.playerList,
      food : this.foodList
    };

    this.io.emit('new-game-state', gameState);

    setTimeout(this.runGame.bind(this), 1000 / GameConfig.GAME_SPEED);
  }

  setListeners() {
    let self = this;
    this.io.sockets.on('connection', (socket) => {
      socket.on('key-pressed', self.handleKeyPressed.bind(self, socket));
      socket.on('new-player', self.connectNewPlayer.bind(self, socket));
    });
  }

  handleKeyPressed(socket, key) {
    this.playerList.getPlayer(socket.id).changeDirection(key);
  }

  connectNewPlayer(socket, name) {
    console.log('[NEW PLAYER CONNECTED] ' + name + ' (' + socket.id + ')');
    let playerInfo = this.boardController.createNewPlayer(socket.id, name);
    let welcomeData = {
      board : this.boardController.getBoardWelcomeInfo(),
      player : playerInfo
    };
    socket.emit('welcome-info', welcomeData);
  }
}
