import BoardCell from './board-cell';
import { BoardCellType } from './board-cell-type';

export default class Board {
  constructor(width, height) {
    this.boardWidth = width;
    this.boardHeight = height;

    this.board = new Array(height);
    for(let col=0; col<height; col++) {
      this.board[col] = new Array(width);
      for(let row=0; row <width; row++) {
        this.board[col][row] = new BoardCell();
      }
    }
  }

  addPlayerOccupancy(playerId, blocks) {
    this.addOccupancy(playerId, blocks[0], BoardCellType.PLAYER_HEAD);
    for(let i=1; i<blocks.length; i++) {
      this.addOccupancy(playerId, blocks[i], BoardCellType.PLAYER_TAIL);
    }
  }

  addFoodOccupancy(foodId, coordinate) {
    this.addOccupancy(foodId, coordinate, BoardCellType.FOOD);
  }

  addObstacleOccupancy(coordinate) {
    this.addOccupancy(0, coordinate, BoardCellType.OBSTACLE);
  }

  addOccupancy(id, coordinate, type) {
    let x = coordinate.x;
    let y = coordinate.y;

    if(this.doesCellExist(x, y)) {
      this.board[y][x].addOccupancy(id, type);
    }
  }

  removePlayerOccupancy(playerId, blocks) {
    this.removeOccupancy(playerId, blocks[0], BoardCellType.PLAYER_HEAD);
    for(let i=1; i<blocks.length; i++) {
      this.removeOccupancy(playerId, blocks[i], BoardCellType.PLAYER_TAIL);
    }
  }

  removeFoodOccupancy(foodId, coordinate) {
    this.removeOccupancy(foodId, coordinate, BoardCellType.FOOD);
  }

  removeObstacleOccupancy(coordinate) {
    this.removeOccupancy(0, coordinate, BoardCellType.OBSTACLE);
  }

  removeOccupancy(id, coordinate, type) {
    let x = coordinate.x;
    let y = coordinate.y;

    if(this.doesCellExist(x, y)) {
      this.board[y][x].removeOccupancy(id, type);
    }
  }

  getCell(coordinate) {
    let x = coordinate.x;
    let y = coordinate.y;

    if(this.doesCellExist(x, y)) {
      return this.board[y][x];
    }
  }

  isCellOutsideBoard(coordinate) {
    if( coordinate.x < 0 || coordinate.x >= this.boardWidth ||
        coordinate.y < 0 || coordinate.y >= this.boardHeight ) {
      return true;
    }

    return false;
  }

  isCellEmpty(coordinate) {
    let x = coordinate.x;
    let y = coordinate.y;

    if(this.isCellOutsideBoard(coordinate)) {
      return false;
    }

    if(this.doesCellExist(x, y) && this.board[y][x].isEmpty()) {
      return true;
    }

    return false;
  }

  areCellsEmpty(coordinatesList) {
    for(let coordinate of coordinatesList) {
      if(!this.isCellEmpty(coordinate)) {
        return false;
      }
    }
    return true;
  }

  doesCellExist(x, y) {
    if(this.board[y] != undefined && this.board[y][x] != undefined) {
      return true;
    }

    return false;
  }

  getCellsWithCollisions() {
    let cellsWithCollisions = [];

    for(let col=0; col<this.boardHeight; col++) {
      for(let row=0; row <this.boardWidth; row++) {
        if(this.board[col][row].isCollision()) {
          cellsWithCollisions.push(this.board[col][row]);
        }
      }
    }

    return cellsWithCollisions;
  }
}
