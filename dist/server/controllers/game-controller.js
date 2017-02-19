'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gameConfig = require('../config/game-config');

var _player = require('../components/player');

var _player2 = _interopRequireDefault(_player);

var _playerList = require('../components/player-list');

var _playerList2 = _interopRequireDefault(_playerList);

var _board = require('../components/board');

var _board2 = _interopRequireDefault(_board);

var _foodList = require('../components/food-list');

var _foodList2 = _interopRequireDefault(_foodList);

var _boardController = require('./board-controller');

var _boardController2 = _interopRequireDefault(_boardController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameController = function () {
  function GameController(io) {
    _classCallCheck(this, GameController);

    this.io = io;
    this.playerList = new _playerList2.default();
    this.foodList = new _foodList2.default();
    this.boardController = new _boardController2.default(this.io, this.playerList, this.foodList);
  }

  _createClass(GameController, [{
    key: 'start',
    value: function start() {
      console.log("[Starting game...]");

      this.setListeners();
      this.runGame();

      console.log("[Game started]");
    }
  }, {
    key: 'runGame',
    value: function runGame() {
      this.boardController.movePlayers();
      this.boardController.generateCollisionsList();
      this.boardController.handlePlayersCollisions();

      var gameState = {
        players: this.playerList,
        food: this.foodList
      };

      this.io.emit('new-game-state', gameState);

      setTimeout(this.runGame.bind(this), 1000 / _gameConfig.GameConfig.GAME_SPEED);
    }
  }, {
    key: 'setListeners',
    value: function setListeners() {
      var self = this;
      this.io.sockets.on('connection', function (socket) {
        socket.on('key-pressed', self.handleKeyPressed.bind(self, socket));
        socket.on('new-player', self.connectNewPlayer.bind(self, socket));
      });
    }
  }, {
    key: 'handleKeyPressed',
    value: function handleKeyPressed(socket, key) {
      this.playerList.getPlayer(socket.id).changeDirection(key);
    }
  }, {
    key: 'connectNewPlayer',
    value: function connectNewPlayer(socket, name) {
      console.log('[NEW PLAYER CONNECTED] ' + name + ' (' + socket.id + ')');
      var playerInfo = this.boardController.createNewPlayer(socket.id, name);
      var welcomeData = {
        board: this.boardController.getBoardWelcomeInfo(),
        player: playerInfo
      };
      socket.emit('welcome-info', welcomeData);
    }
  }]);

  return GameController;
}();

exports.default = GameController;