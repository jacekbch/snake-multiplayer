'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gameConfig = require('../config/game-config');

var _board = require('../components/board');

var _board2 = _interopRequireDefault(_board);

var _boardCell = require('../components/board-cell');

var _boardCell2 = _interopRequireDefault(_boardCell);

var _player = require('../components/player');

var _player2 = _interopRequireDefault(_player);

var _playerList = require('../components/player-list');

var _playerList2 = _interopRequireDefault(_playerList);

var _food = require('../components/food');

var _food2 = _interopRequireDefault(_food);

var _foodList = require('../components/food-list');

var _foodList2 = _interopRequireDefault(_foodList);

var _foodType = require('../components/food-type');

var _coordinate = require('../components/coordinate');

var _coordinate2 = _interopRequireDefault(_coordinate);

var _helpers = require('../components/helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _direction3 = require('../components/direction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BoardController = function () {
  function BoardController(io, playerList, foodList) {
    _classCallCheck(this, BoardController);

    this.io = io;

    this.boardWidth = _gameConfig.GameConfig.BOARD_WIDTH;
    this.boardHeight = _gameConfig.GameConfig.BOARD_HEIGHT;
    this.board = new _board2.default(this.boardWidth, this.boardHeight);

    this.playerList = playerList;
    this.foodList = foodList;
    this.boardObstacles = [];
    this.cellsWithCollisions = [];

    this.generateObstacles();
    this.generateFood();
    this.createBots();
  }

  _createClass(BoardController, [{
    key: 'generateObstacles',
    value: function generateObstacles() {
      var _this = this;

      if (_gameConfig.GameConfig.BOARD_OBSTACLES) {
        var numOfObstaclesFactor = _helpers2.default.randomMinMaxDec(0.004, 0.01); // (Math.random() * 0.006) + 0.004;
        var numOfObstacles = Math.floor(this.boardWidth * this.boardHeight * numOfObstaclesFactor);

        var _loop = function _loop(obstacleNum) {
          var length = _helpers2.default.randomMinMax(3, 6); // Math.floor(Math.random() * 3) + 4;

          var headCoordinate = void 0;
          while (true) {
            var x = _helpers2.default.randomMinMax(3, _this.boardWidth - 4); // Math.floor(Math.random() * (this.boardWidth-4)) + 3;
            var y = _helpers2.default.randomMinMax(3, _this.boardHeight - 4); // Math.floor(Math.random() * (this.boardHeight-4)) + 3;
            headCoordinate = new _coordinate2.default(x, y);

            var cellsToCheck = _direction3.Direction.allArray.slice();
            cellsToCheck.push(new _coordinate2.default(0, 0));
            var coordinatesToCheck = cellsToCheck.map(function (cell) {
              var coordinateToCheck = headCoordinate.copy();
              return coordinateToCheck.add(cell);
            });

            if (_this.board.areCellsEmpty(coordinatesToCheck)) {
              break;
            }
          }
          _this.boardObstacles.push(headCoordinate);
          _this.board.addObstacleOccupancy(headCoordinate);

          var direction = _direction3.Direction.allArray[_helpers2.default.randomMinMax(0, 3)];
          var coordinate = headCoordinate.copy();
          for (var i = 2; i <= length; i++) {
            var candidateCoordinate = coordinate.copy();
            candidateCoordinate.add(direction);
            if (!_this.board.isCellEmpty(candidateCoordinate)) {
              break;
            }
            _this.boardObstacles.push(candidateCoordinate);
            _this.board.addObstacleOccupancy(candidateCoordinate);
            coordinate = candidateCoordinate;
          }
        };

        for (var obstacleNum = 1; obstacleNum <= numOfObstacles; obstacleNum++) {
          _loop(obstacleNum);
        }
      }
    }
  }, {
    key: 'generateFood',
    value: function generateFood() {
      var numOfFoodFactor = _helpers2.default.randomMinMaxDec(0.02, 0.03);
      var numOfFood = Math.floor(this.boardWidth * this.boardHeight * numOfFoodFactor);

      for (var foodNum = 1; foodNum <= numOfFood; foodNum++) {
        this.generateOneFood();
      }
    }
  }, {
    key: 'generateOneFood',
    value: function generateOneFood() {
      var coordinate = void 0;
      while (true) {
        var x = _helpers2.default.randomMinMax(1, this.boardWidth - 2);
        var y = _helpers2.default.randomMinMax(1, this.boardHeight - 2);
        coordinate = new _coordinate2.default(x, y);

        if (this.board.isCellEmpty(coordinate)) {
          break;
        }
      }

      var randomValue = _helpers2.default.random();
      var type = randomValue < 0.1 ? _foodType.FoodType.FOOD_10 : randomValue < 0.3 ? _foodType.FoodType.FOOD_3 : _foodType.FoodType.FOOD_1;

      var foodId = this.foodList.generateNewId();
      var food = new _food2.default(foodId, type, coordinate);
      this.foodList.addFood(food);
      this.board.addFoodOccupancy(food.id, coordinate);
    }
  }, {
    key: 'createBots',
    value: function createBots() {
      for (var i = 1; i <= _gameConfig.GameConfig.NUMBER_OF_BOTS; i++) {
        this.createOneBot();
      }
    }
  }, {
    key: 'createOneBot',
    value: function createOneBot() {
      var id = this.playerList.generateNewBotId();
      var name = 'Bot ' + id;
      this.createNewPlayer(id, name, true);
    }
  }, {
    key: 'createNewPlayer',
    value: function createNewPlayer(id, name, isBot) {
      if (isBot == undefined) {
        isBot = false;
      }

      var newPlayer = new _player2.default(id, name, isBot);
      var position = this.generateNewPlayerPosition();
      newPlayer.spawn(position.x, position.y, position.direction);
      this.playerList.addPlayer(newPlayer);
      this.board.addPlayerOccupancy(newPlayer.id, newPlayer.blocks);

      return {
        id: id,
        name: name
      };
    }
  }, {
    key: 'generateNewPlayerPosition',
    value: function generateNewPlayerPosition() {
      while (true) {
        var _direction = _direction3.Direction.allArray[_helpers2.default.randomMinMax(0, 3)];
        var x = _helpers2.default.randomMinMax(1, this.boardWidth - 2);
        var y = _helpers2.default.randomMinMax(1, this.boardHeight - 2);
        var _headCoordinate = new _coordinate2.default(x, y);

        var tailCoordinate = _headCoordinate.copy();
        var tailVector = _direction.copy();
        tailVector.invert();
        tailVector.multiply(_gameConfig.GameConfig.SNAKE_INIT_LENGTH - 1);
        tailCoordinate.add(tailVector);

        var coordinatesToCheck = [];
        var lastCoordinate = tailCoordinate;
        for (var i = 1; i <= _gameConfig.GameConfig.SNAKE_INIT_LENGTH * 3; i++) {
          var coordinateToCheck = lastCoordinate.copy();
          coordinateToCheck.add(_direction);
          coordinatesToCheck.push(coordinateToCheck);
          lastCoordinate = coordinateToCheck;
        }

        if (this.board.areCellsEmpty(coordinatesToCheck)) {
          return {
            x: x,
            y: y,
            direction: _direction
          };
        }
      }
    }
  }, {
    key: 'getBoardWelcomeInfo',
    value: function getBoardWelcomeInfo() {
      return {
        width: this.boardWidth,
        height: this.boardHeight,
        obstacles: this.boardObstacles
      };
    }
  }, {
    key: 'movePlayers',
    value: function movePlayers() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.playerList.getAllPlayers()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var player = _step.value;

          if (player.bot) {
            this.moveBot(player);
          }
          this.board.removePlayerOccupancy(player.id, player.blocks);
          player.move();
          this.board.addPlayerOccupancy(player.id, player.blocks);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'moveBot',
    value: function moveBot(player) {
      if (_helpers2.default.random() < 0.1) {
        this.changeBotDirection(player);
      }

      if (this.isBotInDanger(player, player.direction)) {
        this.changeBotDirection(player);
      }
    }
  }, {
    key: 'isBotInDanger',
    value: function isBotInDanger(player, direction) {
      var nextCoordinate = player.getHead().copy();
      nextCoordinate.add(direction);

      if (this.board.isCellOutsideBoard(nextCoordinate)) {
        return true;
      } else {
        var nextCell = this.board.getCell(nextCoordinate);
        if (!nextCell.isEmpty() && !nextCell.isOccupiedByFood()) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: 'changeBotDirection',
    value: function changeBotDirection(player) {
      var avDirections = _direction3.Direction.getAvailable(player.direction);
      for (var i = 1; i <= 3; i++) {
        var randomIndex = _helpers2.default.randomMinMax(0, 1);
        var _direction2 = avDirections[randomIndex];
        if (!this.isBotInDanger(player, _direction2)) {
          player.direction = _direction2.copy();
          return;
        }
      }
    }
  }, {
    key: 'generateCollisionsList',
    value: function generateCollisionsList() {
      this.cellsWithCollisions = this.board.getCellsWithCollisions();
    }
  }, {
    key: 'handlePlayersCollisions',
    value: function handlePlayersCollisions() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.playerList.getAllPlayers()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var player = _step2.value;

          if (this.board.isCellOutsideBoard(player.getHead())) {
            this.playerDied(player.id);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.cellsWithCollisions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var cell = _step3.value;

          this.handleCellCollisions(cell);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: 'handleCellCollisions',
    value: function handleCellCollisions(cell) {
      if (cell.isOccupiedByPlayerHead() && cell.isOccupiedByObstacle()) {
        var players = cell.getPlayersOccupiedByHead();
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = players[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var playerId = _step4.value;

            this.playerDied(playerId);
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      } else if (cell.isOccupiedByPlayerHead() && cell.isOccupiedByPlayerTail()) {
        var victimsList = cell.getPlayersOccupiedByHead();
        var killerId = cell.getPlayerOccupiedByTail();
        var killer = this.playerList.getPlayer(killerId);
        var pointsForKiller = 0;

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = victimsList[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var victimId = _step5.value;

            var victim = this.playerList.getPlayer(victimId);
            pointsForKiller += victim.points;
            this.playerDied(victimId);
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        killer.points += pointsForKiller;
        this.io.to(killerId).emit('added-points', pointsForKiller);
      } else if (false) {// by both player heads


      } else if (cell.isOccupiedByPlayerHead() && cell.isOccupiedByFood()) {
        var _playerId = cell.getOnePlayerOccupiedByHead();
        var foodId = cell.getFoodOccupied();
        var player = this.playerList.getPlayer(_playerId);
        var food = this.foodList.getFood(foodId);

        player.points += food.type;
        player.grow += food.type;
        this.foodList.removeFood(foodId);
        this.board.removeFoodOccupancy(foodId, food.position);
        this.generateOneFood();

        this.io.to(_playerId).emit('added-points', food.type);
      }
    }
  }, {
    key: 'playerDied',
    value: function playerDied(playerId) {
      var player = this.playerList.getPlayer(playerId);
      this.playerList.removePlayer(playerId);
      this.board.removePlayerOccupancy(playerId, player.blocks);

      if (player.bot) {
        setTimeout(this.createOneBot.bind(this), 3000);
      } else {
        this.io.to(playerId).emit('game-over', player.points);
      }
    }
  }]);

  return BoardController;
}();

exports.default = BoardController;