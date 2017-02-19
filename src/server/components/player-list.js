import Player from './player';

export default class PlayerList {
  constructor() {
    this.players = new Map();
  }

  generateNewBotId() {
    let botsKeys = [];
    this.players.forEach((player, key) => {
      if(player.bot) {
        botsKeys.push(key);
      }
    });

    if(botsKeys.length == 0) {
      return 0;
    }

    let max = Math.max(...botsKeys);
    return max + 1;
  }

  addPlayer(player) {
    this.players.set(player.id, player);
  }

  getPlayer(id) {
    return this.players.get(id);
  }

  removePlayer(id) {
    this.players.delete(id);
  }

  getAllPlayers() {
    return this.players.values();
  }

  toJSON() {
    let result = [];
    this.players.forEach((player) => {
      result.push(player);
    });
    return result;
  }
}
