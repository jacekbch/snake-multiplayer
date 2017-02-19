'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _boardCell = require('./board-cell');

var _boardCell2 = _interopRequireDefault(_boardCell);

var _boardCellType = require('./board-cell-type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board(width, height) {
    _classCallCheck(this, Board);

    this.boardWidth = width;
    this.boardHeight = height;

    this.board = new Array(height);
    for (var col = 0; col < height; col++) {
      this.board[col] = new Array(width);
      for (var row = 0; row < width; row++) {
        this.board[col][row] = new _boardCell2.default();
      }
    }
  }

  _createClass(Board, [{
    key: 'addPlayerOccupancy',
    value: function addPlayerOccupancy(playerId, blocks) {
      this.addOccupancy(playerId, blocks[0], _boardCellType.BoardCellType.PLAYER_HEAD);
      for (var i = 1; i < blocks.length; i++) {
        this.addOccupancy(playerId, blocks[i], _boardCellType.BoardCellType.PLAYER_TAIL);
      }
    }
  }, {
    key: 'addFoodOccupancy',
    value: function addFoodOccupancy(foodId, coordinate) {
      this.addOccupancy(foodId, coordinate, _boardCellType.BoardCellType.FOOD);
    }
  }, {
    key: 'addObstacleOccupancy',
    value: function addObstacleOccupancy(coordinate) {
      this.addOccupancy(0, coordinate, _boardCellType.BoardCellType.OBSTACLE);
    }
  }, {
    key: 'addOccupancy',
    value: function addOccupancy(id, coordinate, type) {
      var x = coordinate.x;
      var y = coordinate.y;

      if (this.doesCellExist(x, y)) {
        this.board[y][x].addOccupancy(id, type);
      }
    }
  }, {
    key: 'removePlayerOccupancy',
    value: function removePlayerOccupancy(playerId, blocks) {
      this.removeOccupancy(playerId, blocks[0], _boardCellType.BoardCellType.PLAYER_HEAD);
      for (var i = 1; i < blocks.length; i++) {
        this.removeOccupancy(playerId, blocks[i], _boardCellType.BoardCellType.PLAYER_TAIL);
      }
    }
  }, {
    key: 'removeFoodOccupancy',
    value: function removeFoodOccupancy(foodId, coordinate) {
      this.removeOccupancy(foodId, coordinate, _boardCellType.BoardCellType.FOOD);
    }
  }, {
    key: 'removeObstacleOccupancy',
    value: function removeObstacleOccupancy(coordinate) {
      this.removeOccupancy(0, coordinate, _boardCellType.BoardCellType.OBSTACLE);
    }
  }, {
    key: 'removeOccupancy',
    value: function removeOccupancy(id, coordinate, type) {
      var x = coordinate.x;
      var y = coordinate.y;

      if (this.doesCellExist(x, y)) {
        this.board[y][x].removeOccupancy(id, type);
      }
    }
  }, {
    key: 'getCell',
    value: function getCell(coordinate) {
      var x = coordinate.x;
      var y = coordinate.y;

      if (this.doesCellExist(x, y)) {
        return this.board[y][x];
      }
    }
  }, {
    key: 'isCellOutsideBoard',
    value: function isCellOutsideBoard(coordinate) {
      if (coordinate.x < 0 || coordinate.x >= this.boardWidth || coordinate.y < 0 || coordinate.y >= this.boardHeight) {
        return true;
      }

      return false;
    }
  }, {
    key: 'isCellEmpty',
    value: function isCellEmpty(coordinate) {
      var x = coordinate.x;
      var y = coordinate.y;

      if (this.isCellOutsideBoard(coordinate)) {
        return false;
      }

      if (this.doesCellExist(x, y) && this.board[y][x].isEmpty()) {
        return true;
      }

      return false;
    }
  }, {
    key: 'areCellsEmpty',
    value: function areCellsEmpty(coordinatesList) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = coordinatesList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var coordinate = _step.value;

          if (!this.isCellEmpty(coordinate)) {
            return false;
          }
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

      return true;
    }
  }, {
    key: 'doesCellExist',
    value: function doesCellExist(x, y) {
      if (this.board[y] != undefined && this.board[y][x] != undefined) {
        return true;
      }

      return false;
    }
  }, {
    key: 'getCellsWithCollisions',
    value: function getCellsWithCollisions() {
      var cellsWithCollisions = [];

      for (var col = 0; col < this.boardHeight; col++) {
        for (var row = 0; row < this.boardWidth; row++) {
          if (this.board[col][row].isCollision()) {
            cellsWithCollisions.push(this.board[col][row]);
          }
        }
      }

      return cellsWithCollisions;
    }
  }, {
    key: 'printBoard',
    value: function printBoard() {
      console.log('[---------------BOARD------------------]');
      for (var col = 0; col < this.boardHeight; col++) {
        var colStr = '';
        for (var row = 0; row < this.boardWidth; row++) {
          colStr += '[' + this.board[col][row].print() + '] ';
        }
        console.log(colStr);
      }
    }
  }]);

  return Board;
}();

exports.default = Board;