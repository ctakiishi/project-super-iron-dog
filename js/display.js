/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-expressions */
class Display {
  constructor(tileSheet, width, height) {
    this.tileSheet = tileSheet;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  render(name, tileX, tileY) {
    const buffer = document.createElement('canvas');
    buffer.width = this.width;
    buffer.height = this.height;
    buffer.getContext('2d').drawImage(this.tileSheet,
      tileX * this.width, tileY * this.height, this.width, this.height,
      0, 0, this.width, this.height);
    this.tiles.set(name, buffer);
  }

  drawBackground(name, context, x1, x2, y1, y2) {
    const buffer = this.tiles.get(name);
    for (let i = x1; i < x2; i++) {
      for (let j = y1; j < y2; j++) {
        context.drawImage(buffer, i * this.width, j * this.height);
      }
    }
  }
}

class Player extends Display {
  constructor(tileSheet, width, height, posX, posY) {
    super(tileSheet, width, height);
    this.posX = posX;
    this.posY = posY;
    this.jumping = true;
    this.speedX = 0;
    this.speedY = 0;
  }

  drawPlayer(name, context) {
    const buffer = this.tiles.get(name);
    context.drawImage(buffer, this.posX, this.posY);
  }

  jump() {
    if (!this.jumping) {
      this.jumping = true;
      this.speedY -= 40;
    }
  }

  moveLeft() {
    this.speedX -= 0.5;
  }

  moveRight() {
    this.speedX += 0.5;
  }
}
