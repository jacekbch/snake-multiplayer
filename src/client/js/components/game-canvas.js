export default class GameCanvas {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.gameCanvas = document.getElementById('game-canvas');
    this.context = this.gameCanvas.getContext('2d');
  }

  clear() {
    this.context.fillStyle = 'black';
    this.context.globalAlpha = 1;
    this.context.fillRect(0, 0, this.width, this.height);
  }

  drawRect(x, y, w, h) {
    this.context.fillStyle = 'white';
    this.context.fillRect(x, y, w, h);
  }

  drawImageFromSpriteSheet(img, sx, sy, x, y, w, h) {
    this.context.drawImage(img, sx, sy, w, h, x, y, w, h);
  }
}
