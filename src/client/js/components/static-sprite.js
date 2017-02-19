export default class AnimatedSprite {
  constructor(data) {
    this.width = data.width;
    this.height = data.height;
    this.sheetImg = data.sheetImg;
    this.positionInSheet = data.positionInSheet;
    this.gameCanvas = data.gameCanvas;
  }

  render(x, y, gameCanvas) {
    gameCanvas.drawImageFromSpriteSheet(
      this.sheetImg,
      0,
      this.positionInSheet,
      x,
      y,
      this.width,
      this.height
    );
  }

  isAnimated() {
    return false;
  }
}
