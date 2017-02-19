"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Coordinate = function () {
  function Coordinate(x, y) {
    _classCallCheck(this, Coordinate);

    this.x = x;
    this.y = y;
  }

  _createClass(Coordinate, [{
    key: "add",
    value: function add(coordinate) {
      this.x += coordinate.x;
      this.y += coordinate.y;
      return this;
    }
  }, {
    key: "subtract",
    value: function subtract(coordinate) {
      this.x -= coordinate.x;
      this.y -= coordinate.y;
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(value) {
      this.x *= value;
      this.y *= value;
      return this;
    }
  }, {
    key: "invert",
    value: function invert() {
      this.x = -this.x;
      this.y = -this.y;
      return this;
    }
  }, {
    key: "equals",
    value: function equals(coordinate) {
      if (this.x == coordinate.x && this.y == coordinate.y) {
        return true;
      }
      return false;
    }
  }, {
    key: "copy",
    value: function copy() {
      return new Coordinate(this.x, this.y);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        x: this.x,
        y: this.y
      };
    }
  }]);

  return Coordinate;
}();

exports.default = Coordinate;