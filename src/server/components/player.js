import { GameConfig } from '../config/game-config';
import Coordinate from './coordinate';
import { Direction } from './direction';


export default class Player {
  constructor(id, name, isBot) {
    this.id = id;
    this.name = name;
    this.bot = isBot,
    this.direction = Direction.UP;
    this.blocks = [];
    this.points = 0;
    this.grow = 0;
  }

  spawn(x, y, direction) {
    this.direction = direction;
    this.blocks.push(new Coordinate(x, y));  // head
    let currentCoord = this.getHead().copy();
    for(let i=1; i < GameConfig.SNAKE_INIT_LENGTH; i++) {
      currentCoord.subtract(this.direction);
      this.blocks.push(currentCoord.copy());
    }
  }

  move() {
    if(this.grow > 0) {
      this.grow--;
    } else {
      this.blocks.pop();
    }

    let newHead = this.getHead().copy();
    newHead.add(this.direction);
    this.blocks.unshift(newHead);
  }

  getHead() {
    return this.blocks[0];
  }

  getBlocks() {
    return this.blocks;
  }

  changeDirection(directionStr) {
    let direction = Direction.fromStr(directionStr);
    let avDirections = Direction.getAvailable(this.direction);

    for(let candidateDirection of avDirections) {
      if(direction.equals(candidateDirection)) {
        this.direction = direction.copy();
      }
    }
  }

  toJSON() {
    return {
      id : this.id,
      name : this.name,
      blocks : this.blocks,
      points: this.points
    };
  }

}
