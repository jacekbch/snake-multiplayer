'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _food = require('./food');

var _food2 = _interopRequireDefault(_food);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FoodList = function () {
  function FoodList() {
    _classCallCheck(this, FoodList);

    this.food = new Map();
  }

  _createClass(FoodList, [{
    key: 'generateNewId',
    value: function generateNewId() {
      var keys = [];
      this.food.forEach(function (food, key) {
        keys.push(key);
      });

      if (keys.length == 0) {
        return 0;
      }

      var max = Math.max.apply(Math, keys);
      return max + 1;
    }
  }, {
    key: 'addFood',
    value: function addFood(food) {
      this.food.set(food.id, food);
    }
  }, {
    key: 'getFood',
    value: function getFood(id) {
      return this.food.get(id);
    }
  }, {
    key: 'removeFood',
    value: function removeFood(id) {
      this.food.delete(id);
    }
  }, {
    key: 'getAllFood',
    value: function getAllFood() {
      return this.food.values();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var result = [];
      this.food.forEach(function (food) {
        result.push(food);
      });
      return result;
    }
  }]);

  return FoodList;
}();

exports.default = FoodList;