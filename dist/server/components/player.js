'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gameConfig = require('../config/game-config');

var _coordinate = require('./coordinate');

var _coordinate2 = _interopRequireDefault(_coordinate);

var _direction = require('./direction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(id, name, isBot) {
    _classCallCheck(this, Player);

    this.id = id;
    this.name = name;
    this.bot = isBot, this.direction = _direction.Direction.UP;
    this.blocks = [];
    this.points = 0;
    this.grow = 0;
  }

  _createClass(Player, [{
    key: 'spawn',
    value: function spawn(x, y, direction) {
      this.direction = direction;
      this.blocks.push(new _coordinate2.default(x, y)); // head
      var currentCoord = this.getHead().copy();
      for (var i = 1; i < _gameConfig.GameConfig.SNAKE_INIT_LENGTH; i++) {
        currentCoord.subtract(this.direction);
        this.blocks.push(currentCoord.copy());
      }
    }
  }, {
    key: 'move',
    value: function move() {
      if (this.grow > 0) {
        this.grow--;
      } else {
        this.blocks.pop();
      }

      var newHead = this.getHead().copy();
      newHead.add(this.direction);
      this.blocks.unshift(newHead);
    }
  }, {
    key: 'getHead',
    value: function getHead() {
      return this.blocks[0];
    }
  }, {
    key: 'getBlocks',
    value: function getBlocks() {
      return this.blocks;
    }
  }, {
    key: 'changeDirection',
    value: function changeDirection(directionStr) {
      var direction = _direction.Direction.fromStr(directionStr);
      var avDirections = _direction.Direction.getAvailable(this.direction);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = avDirections[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var candidateDirection = _step.value;

          if (direction.equals(candidateDirection)) {
            this.direction = direction.copy();
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
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        id: this.id,
        name: this.name,
        blocks: this.blocks,
        points: this.points
      };
    }
  }]);

  return Player;
}();

exports.default = Player;