import StaticSprite from '../components/static-sprite';
import AnimatedSprite from '../components/animated-sprite';
import _ from '../../images/sprite-sheet.png'

export default class SpriteContainer {
  constructor() {
    const sheetImgSrc = 'images/sprite-sheet.png';
    this.sheetImg = new Image();
    this.sheetImg.src = sheetImgSrc;

    this.defaultStaticData = {
      width: 16,
      height: 16,
      sheetImg: this.sheetImg,
      positionInSheet: 0
    };

    this.defaultAnimatedData = {
      width: 16,
      height: 16,
      sheetImg: this.sheetImg,
      positionInSheet: 0,
      numberOfFrames: 8,
      ticksPerFrame: 8
    };

    this.sprites = new Map();
    this.createSprites();
  }

  createSprites() {
    this.sprites.set('block-green',
      new StaticSprite(Object.assign({}, this.defaultStaticData, { positionInSheet: 0 }))
    );
    this.sprites.set('block-blue',
      new StaticSprite(Object.assign({}, this.defaultStaticData, { positionInSheet: 1*16 }))
    );
    this.sprites.set('block-grey',
      new StaticSprite(Object.assign({}, this.defaultStaticData, { positionInSheet: 2*16 }))
    );

    this.sprites.set('crystal-orange',
      new AnimatedSprite(Object.assign({}, this.defaultAnimatedData, { positionInSheet: 3*16 }))
    );
    this.sprites.set('crystal-pink',
      new AnimatedSprite(Object.assign({}, this.defaultAnimatedData, { positionInSheet: 4*16 }))
    );
    this.sprites.set('coin',
      new AnimatedSprite(Object.assign({}, this.defaultAnimatedData, { positionInSheet: 5*16, numberOfFrames: 10, ticksPerFrame: 4 }))
    );
  }

  getSprite(name) {
    return this.sprites.get(name);
  }

  updateAnimatedSprites() {
    this.sprites.forEach((sprite) => {
      if(sprite.isAnimated()) {
        sprite.update();
      }
    });
  }
}
