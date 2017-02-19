export default class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(coordinate) {
    this.x += coordinate.x;
    this.y += coordinate.y;
    return this;
  }

  subtract(coordinate) {
    this.x -= coordinate.x;
    this.y -= coordinate.y;
    return this;
  }

  multiply(value) {
    this.x *= value;
    this.y *= value;
    return this;
  }

  invert() {
    this.x = -this.x
    this.y = -this.y;
    return this;
  }

  equals(coordinate) {
    if(this.x == coordinate.x && this.y == coordinate.y) {
      return true;
    }
    return false;
  }

  copy() {
    return new Coordinate(this.x, this.y);
  }

  toJSON() {
    return {
      x : this.x,
      y : this.y
    };
  }
}
