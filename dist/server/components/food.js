"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Food = function () {
  function Food(id, type, position) {
    _classCallCheck(this, Food);

    this.id = id;
    this.type = type;
    this.position = position;
  }

  _createClass(Food, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        type: this.type,
        position: this.position
      };
    }
  }]);

  return Food;
}();

exports.default = Food;