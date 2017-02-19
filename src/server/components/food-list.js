import Food from './food';

export default class FoodList {
  constructor() {
    this.food = new Map();
  }

  generateNewId() {
    let keys = [];
    this.food.forEach((food, key) => {
      keys.push(key);
    });

    if(keys.length == 0) {
      return 0;
    }

    let max = Math.max(...keys);
    return max + 1;
  }

  addFood(food) {
    this.food.set(food.id, food);
  }

  getFood(id) {
    return this.food.get(id);
  }

  removeFood(id) {
    this.food.delete(id);
  }

  getAllFood() {
    return this.food.values();
  }

  toJSON() {
    let result = [];
    this.food.forEach((food) => {
      result.push(food);
    });
    return result;
  }
}
