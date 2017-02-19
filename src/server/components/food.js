export default class Food {
  constructor(id, type, position) {
    this.id = id;
    this.type = type;
    this.position = position;
  }

  toJSON() {
    return {
      type : this.type,
      position : this.position
    };
  }
}
