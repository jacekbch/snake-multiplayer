import { BoardCellType } from './board-cell-type';

export default class BoardCell {
  constructor() {
    this.content = [];
  }

  addOccupancy(id, type) {
    this.content.push({ id : id, type : type });
  }

  removeOccupancy(id, type) {
    let index = this.content.findIndex(e => e.id == id && e.type == type);

    if(index != -1) {
      this.content.splice(index, 1);
    }
  }

  isEmpty() {
    if(this.content.length == 0) {
      return true;
    }

    return false;
  }

  isCollision() {
    if(this.content.length > 1) {
      return true;
    }

    return false;
  }

  isOccupiedByPlayerHead() {
    return this.isOccupiedBy(BoardCellType.PLAYER_HEAD);
  }

  isOccupiedByPlayerTail() {
    return this.isOccupiedBy(BoardCellType.PLAYER_TAIL);
  }

  isOccupiedByObstacle() {
    return this.isOccupiedBy(BoardCellType.OBSTACLE);
  }

  isOccupiedByFood() {
    return this.isOccupiedBy(BoardCellType.FOOD);
  }

  isOccupiedBy(type) {
    let result = this.content.find(e => e.type == type);
    if(result != undefined) {
      return true;
    }

    return false;
  }

  getPlayersOccupiedByHead() {
    let players = [];
    for(let obj of this.content) {
      if(obj.type == BoardCellType.PLAYER_HEAD) {
        players.push(obj.id);
      }
    }

    return players;
  }

  getOnePlayerOccupiedByHead() {
    return this.getObjectOccupied(BoardCellType.PLAYER_HEAD);
  }

  getPlayerOccupiedByTail() {
    return this.getObjectOccupied(BoardCellType.PLAYER_TAIL);
  }

  getFoodOccupied() {
    return this.getObjectOccupied(BoardCellType.FOOD);
  }

  getObjectOccupied(type) {
    let obj = this.content.find(e => e.type == type);
    if(obj != undefined) {
      return obj.id
    }
    return null;
  }

  print() {
    let str = '';
    for(let o of this.content) {
      str += o.type + ' ';
    }
    return str;
  }
}
