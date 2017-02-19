'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerList = function () {
  function PlayerList() {
    _classCallCheck(this, PlayerList);

    this.players = new Map();
  }

  _createClass(PlayerList, [{
    key: 'generateNewBotId',
    value: function generateNewBotId() {
      var botsKeys = [];
      this.players.forEach(function (player, key) {
        if (player.bot) {
          botsKeys.push(key);
        }
      });

      if (botsKeys.length == 0) {
        return 0;
      }

      var max = Math.max.apply(Math, botsKeys);
      return max + 1;
    }
  }, {
    key: 'addPlayer',
    value: function addPlayer(player) {
      this.players.set(player.id, player);
    }
  }, {
    key: 'getPlayer',
    value: function getPlayer(id) {
      return this.players.get(id);
    }
  }, {
    key: 'removePlayer',
    value: function removePlayer(id) {
      this.players.delete(id);
    }
  }, {
    key: 'getAllPlayers',
    value: function getAllPlayers() {
      return this.players.values();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var result = [];
      this.players.forEach(function (player) {
        result.push(player);
      });
      return result;
    }
  }]);

  return PlayerList;
}();

exports.default = PlayerList;