export default class AnimatedSprite {
  constructor(data) {
    this.frameIndex = 0;
    this.width = data.width;
    this.height = data.height;
    this.numberOfFrames = data.numberOfFrames;
    this.ticksPerFrame = data.ticksPerFrame;
    this.sheetImg = data.sheetImg;
    this.positionInSheet = data.positionInSheet;
    this.gameCanvas = data.gameCanvas;
    this.ticksCounter = 1;
  }

  update() {
    if(this.ticksCounter >= this.ticksPerFrame) {
      if (this.frameIndex < this.numberOfFrames-1) {
        this.frameIndex++;
      } else {
        this.frameIndex = 0;
      }
      this.ticksCounter = 1;
    } else {
      this.ticksCounter++;
    }
  }

  render(x, y, gameCanvas) {
    gameCanvas.drawImageFromSpriteSheet(
      this.sheetImg,
      this.frameIndex * this.width,
      this.positionInSheet,
      x,
      y,
      this.width,
      this.height
    );
  }

  isAnimated() {
    return true;
  }
}
