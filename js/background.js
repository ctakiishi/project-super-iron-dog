/* eslint-disable linebreak-style */
/* eslint-disable max-classes-per-file */
class spriteSheet {
  constructor(canvas, context, image, posX, posY, width, height) {
    this.canvas = canvas;
    this.context = context;
    this.image = image;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
  }

  draw(canvasX, canvasY) {
    this.context.drawImage(this.image, this.posX, this.posY,
      this.width, this.height,
      canvasX, canvasY,
      this.width, this.height);
  }

  drawTiles(x1, x2, y1, y2) {
    for (let i = x1; i < x2; i++) {
      for (let j = y1; j < y2; j++) {
        this.draw(i * this.width, j * this.height);
      }
    }
  }
};