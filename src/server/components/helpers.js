export default class Helpers {

  static random() {
    return Math.random();
  }

  static randomMinMax(min, max) {
    return Math.floor( Math.random() * (max-min+1) ) + min;
  }

  static randomMinMaxDec(min, max) {
    return ( Math.random() * (max-min) ) + min;
  }
}
