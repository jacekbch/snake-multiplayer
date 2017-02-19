import { GameConfig } from '../config/game-config';
import Board from '../components/board';
import BoardCell from '../components/board-cell';
import Player from '../components/player';
import PlayerList from '../components/player-list';
import Food from '../components/food';
import FoodList from '../components/food-list';
import { FoodType } from '../components/food-type';
import Coordinate from '../components/coordinate';
import Helpers from '../components/helpers';
import { Direction } from '../components/direction';

export default class BoardController {
  constructor(io, playerList, foodList) {
    this.io = io;

    this.boardWidth = GameConfig.BOARD_WIDTH;
    this.boardHeight = GameConfig.BOARD_HEIGHT;
    this.board = new Board(this.boardWidth, this.boardHeight);

    this.playerList = playerList;
    this.foodList = foodList;
    this.boardObstacles = [];
    this.cellsWithCollisions = [];

    this.generateObstacles();
    this.generateFood();
    this.createBots();
  }

  generateObstacles() {
    if(GameConfig.BOARD_OBSTACLES) {
      let numOfObstaclesFactor = Helpers.randomMinMaxDec(0.004, 0.01); // (Math.random() * 0.006) + 0.004;
      let numOfObstacles = Math.floor(this.boardWidth * this.boardHeight * numOfObstaclesFactor);

      for(let obstacleNum = 1; obstacleNum <= numOfObstacles; obstacleNum++) {
        let length = Helpers.randomMinMax(3, 6); // Math.floor(Math.random() * 3) + 4;

        let headCoordinate;
        while(true) {
          let x = Helpers.randomMinMax(3, this.boardWidth-4); // Math.floor(Math.random() * (this.boardWidth-4)) + 3;
          let y = Helpers.randomMinMax(3, this.boardHeight-4); // Math.floor(Math.random() * (this.boardHeight-4)) + 3;
          headCoordinate = new Coordinate(x, y);

          let cellsToCheck = Direction.allArray.slice();
          cellsToCheck.push(new Coordinate(0, 0));
          let coordinatesToCheck = cellsToCheck.map((cell) => {
            let coordinateToCheck = headCoordinate.copy();
            return coordinateToCheck.add(cell)
          });

          if(this.board.areCellsEmpty(coordinatesToCheck)) {
            break;
          }
        }
        this.boardObstacles.push(headCoordinate);
        this.board.addObstacleOccupancy(headCoordinate);

        let direction = Direction.allArray[Helpers.randomMinMax(0, 3)];
        let coordinate = headCoordinate.copy();
        for(let i = 2; i <= length; i++) {
          let candidateCoordinate = coordinate.copy();
          candidateCoordinate.add(direction);
          if(!this.board.isCellEmpty(candidateCoordinate)) {
            break;
          }
          this.boardObstacles.push(candidateCoordinate);
          this.board.addObstacleOccupancy(candidateCoordinate);
          coordinate = candidateCoordinate;
        }
      }
    }
  }

  generateFood() {
    let numOfFoodFactor = Helpers.randomMinMaxDec(0.02, 0.03);
    let numOfFood = Math.floor(this.boardWidth * this.boardHeight * numOfFoodFactor);

    for(let foodNum = 1; foodNum <= numOfFood; foodNum++) {
      this.generateOneFood();
    }
  }

  generateOneFood() {
    let coordinate;
    while(true) {
      let x = Helpers.randomMinMax(1, this.boardWidth-2);
      let y = Helpers.randomMinMax(1, this.boardHeight-2);
      coordinate = new Coordinate(x, y);

      if(this.board.isCellEmpty(coordinate)) {
        break;
      }
    }

    let randomValue = Helpers.random();
    let type = (randomValue < 0.1) ? FoodType.FOOD_10 :
               (randomValue < 0.3) ? FoodType.FOOD_3  :
                                     FoodType.FOOD_1;

    let foodId = this.foodList.generateNewId();
    let food = new Food(foodId, type, coordinate);
    this.foodList.addFood(food);
    this.board.addFoodOccupancy(food.id, coordinate);
  }

  createBots() {
    for(let i = 1; i <= GameConfig.NUMBER_OF_BOTS; i++) {
      this.createOneBot();
    }
  }

  createOneBot() {
    let id = this.playerList.generateNewBotId();
    let name = 'Bot ' + id;
    this.createNewPlayer(id, name, true);
  }

  createNewPlayer(id, name, isBot) {
    if(isBot == undefined) {
      isBot = false;
    }

    let newPlayer = new Player(id, name, isBot);
    let position = this.generateNewPlayerPosition();
    newPlayer.spawn(position.x, position.y, position.direction);
    this.playerList.addPlayer(newPlayer);
    this.board.addPlayerOccupancy(newPlayer.id, newPlayer.blocks);

    return {
      id : id,
      name : name
    };
  }

  generateNewPlayerPosition() {
    while(true) {
      let direction = Direction.allArray[Helpers.randomMinMax(0, 3)];
      let x = Helpers.randomMinMax(1, this.boardWidth-2);
      let y = Helpers.randomMinMax(1, this.boardHeight-2);
      let headCoordinate = new Coordinate(x, y);

      let tailCoordinate = headCoordinate.copy();
      let tailVector = direction.copy();
      tailVector.invert();
      tailVector.multiply(GameConfig.SNAKE_INIT_LENGTH-1);
      tailCoordinate.add(tailVector);

      let coordinatesToCheck = [];
      let lastCoordinate = tailCoordinate;
      for(let i = 1; i <= GameConfig.SNAKE_INIT_LENGTH*3; i++) {
        let coordinateToCheck = lastCoordinate.copy();
        coordinateToCheck.add(direction);
        coordinatesToCheck.push(coordinateToCheck);
        lastCoordinate = coordinateToCheck;
      }

      if(this.board.areCellsEmpty(coordinatesToCheck)) {
        return {
          x : x,
          y : y,
          direction : direction
        };
      }
    }
  }

  getBoardWelcomeInfo() {
    return {
      width : this.boardWidth,
      height : this.boardHeight,
      obstacles : this.boardObstacles
    };
  }

  movePlayers() {
    for(let player of this.playerList.getAllPlayers()) {
      if(player.bot) {
        this.moveBot(player);
      }
      this.board.removePlayerOccupancy(player.id, player.blocks);
      player.move();
      this.board.addPlayerOccupancy(player.id, player.blocks);
    }
  }

  moveBot(player) {
    if(Helpers.random() < 0.1) {
      this.changeBotDirection(player);
    }

    if(this.isBotInDanger(player, player.direction)) {
      this.changeBotDirection(player);
    }
  }

  isBotInDanger(player, direction) {
    let nextCoordinate = player.getHead().copy();
    nextCoordinate.add(direction);

    if(this.board.isCellOutsideBoard(nextCoordinate)) {
      return true;
    } else {
      let nextCell = this.board.getCell(nextCoordinate);
      if(!nextCell.isEmpty() && !nextCell.isOccupiedByFood()) {
        return true;
      }
    }

    return false;
  }

  changeBotDirection(player) {
    let avDirections = Direction.getAvailable(player.direction);
    for(let i = 1; i <= 3; i++) {
      let randomIndex = Helpers.randomMinMax(0, 1);
      let direction = avDirections[randomIndex];
      if(!this.isBotInDanger(player, direction)) {
        player.direction = direction.copy();
        return;
      }
    }
  }

  generateCollisionsList() {
    this.cellsWithCollisions = this.board.getCellsWithCollisions();
  }

  handlePlayersCollisions() {
    for(let player of this.playerList.getAllPlayers()) {
      if(this.board.isCellOutsideBoard(player.getHead())) {
        this.playerDied(player.id);
      }
    }

    for(let cell of this.cellsWithCollisions) {
      this.handleCellCollisions(cell);
    }
  }

  handleCellCollisions(cell) {
    if(cell.isOccupiedByPlayerHead() && cell.isOccupiedByObstacle()) {
      let players = cell.getPlayersOccupiedByHead();
      for(let playerId of players) {
        this.playerDied(playerId);
      }

    } else if(cell.isOccupiedByPlayerHead() && cell.isOccupiedByPlayerTail()) {
      let victimsList = cell.getPlayersOccupiedByHead();
      let killerId = cell.getPlayerOccupiedByTail();
      let killer = this.playerList.getPlayer(killerId);
      let pointsForKiller = 0;

      for(let victimId of victimsList) {
        let victim = this.playerList.getPlayer(victimId);
        pointsForKiller += victim.points;
        this.playerDied(victimId);
      }

      killer.points += pointsForKiller;
      this.io.to(killerId).emit('added-points', pointsForKiller);

    } else if(false) { // by both player heads

      
    } else if(cell.isOccupiedByPlayerHead() && cell.isOccupiedByFood()) {
      let playerId = cell.getOnePlayerOccupiedByHead();
      let foodId = cell.getFoodOccupied();
      let player = this.playerList.getPlayer(playerId);
      let food = this.foodList.getFood(foodId);

      player.points += food.type;
      player.grow += food.type;
      this.foodList.removeFood(foodId);
      this.board.removeFoodOccupancy(foodId, food.position);
      this.generateOneFood();

      this.io.to(playerId).emit('added-points', food.type);
    }
  }

  playerDied(playerId) {
    let player = this.playerList.getPlayer(playerId);
    this.playerList.removePlayer(playerId);
    this.board.removePlayerOccupancy(playerId, player.blocks);

    if(player.bot) {
      setTimeout(this.createOneBot.bind(this), 3000);
    } else {
      this.io.to(playerId).emit('game-over', player.points);
    }
  }
}
