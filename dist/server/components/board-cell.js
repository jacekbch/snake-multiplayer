'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _boardCellType = require('./board-cell-type');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BoardCell = function () {
  function BoardCell() {
    _classCallCheck(this, BoardCell);

    this.content = [];
  }

  _createClass(BoardCell, [{
    key: 'addOccupancy',
    value: function addOccupancy(id, type) {
      this.content.push({ id: id, type: type });
    }
  }, {
    key: 'removeOccupancy',
    value: function removeOccupancy(id, type) {
      var index = this.content.findIndex(function (e) {
        return e.id == id && e.type == type;
      });

      if (index != -1) {
        this.content.splice(index, 1);
      }
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      if (this.content.length == 0) {
        return true;
      }

      return false;
    }
  }, {
    key: 'isCollision',
    value: function isCollision() {
      if (this.content.length > 1) {
        return true;
      }

      return false;
    }
  }, {
    key: 'isOccupiedByPlayerHead',
    value: function isOccupiedByPlayerHead() {
      return this.isOccupiedBy(_boardCellType.BoardCellType.PLAYER_HEAD);
    }
  }, {
    key: 'isOccupiedByPlayerTail',
    value: function isOccupiedByPlayerTail() {
      return this.isOccupiedBy(_boardCellType.BoardCellType.PLAYER_TAIL);
    }
  }, {
    key: 'isOccupiedByObstacle',
    value: function isOccupiedByObstacle() {
      return this.isOccupiedBy(_boardCellType.BoardCellType.OBSTACLE);
    }
  }, {
    key: 'isOccupiedByFood',
    value: function isOccupiedByFood() {
      return this.isOccupiedBy(_boardCellType.BoardCellType.FOOD);
    }
  }, {
    key: 'isOccupiedBy',
    value: function isOccupiedBy(type) {
      var result = this.content.find(function (e) {
        return e.type == type;
      });
      if (result != undefined) {
        return true;
      }

      return false;
    }
  }, {
    key: 'getPlayersOccupiedByHead',
    value: function getPlayersOccupiedByHead() {
      var players = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.content[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var obj = _step.value;

          if (obj.type == _boardCellType.BoardCellType.PLAYER_HEAD) {
            players.push(obj.id);
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

      return players;
    }
  }, {
    key: 'getOnePlayerOccupiedByHead',
    value: function getOnePlayerOccupiedByHead() {
      return this.getObjectOccupied(_boardCellType.BoardCellType.PLAYER_HEAD);
    }
  }, {
    key: 'getPlayerOccupiedByTail',
    value: function getPlayerOccupiedByTail() {
      return this.getObjectOccupied(_boardCellType.BoardCellType.PLAYER_TAIL);
    }
  }, {
    key: 'getFoodOccupied',
    value: function getFoodOccupied() {
      return this.getObjectOccupied(_boardCellType.BoardCellType.FOOD);
    }
  }, {
    key: 'getObjectOccupied',
    value: function getObjectOccupied(type) {
      var obj = this.content.find(function (e) {
        return e.type == type;
      });
      if (obj != undefined) {
        return obj.id;
      }
      return null;
    }
  }, {
    key: 'print',
    value: function print() {
      var str = '';
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.content[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var o = _step2.value;

          str += o.type + ' ';
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

      return str;
    }
  }]);

  return BoardCell;
}();

exports.default = BoardCell;