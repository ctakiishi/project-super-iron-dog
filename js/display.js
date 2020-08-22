/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-expressions */
class Display {
  constructor(tileSheet, canvas) {
    this.tileSheet = {
      image: tileSheet,
      rows: 35,
      columns: 34,
      tileSize: 16,
    };
    this.buffer = document.createElement('canvas').getContext('2d');
    this.buffer.canvas.width = canvas.width * 0.5;
    this.buffer.canvas.height = canvas.height * 0.5;
    this.context = canvas.getContext('2d');
    this.map = [717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,
      717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,
      717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,
      717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,
      717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,
      717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,
      717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,
      717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,
      717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,
      717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,
      717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,
      717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,
      717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,
      717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,
      717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,
      717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,
      717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,717,
      71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,
      71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,
      71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71];
    this.columns = 24;
    this.rows = 24;
  }

  render() {
    this.context.drawImage(this.buffer.canvas,
      0, 0, this.buffer.canvas.width, this.buffer.canvas.height,
      0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  drawBackground() {
    for (let i = this.map.length - 1; i > -1; i--) {
      const value = this.map[i];
      const sourceX = (value % this.tileSheet.columns) * this.tileSheet.tileSize;
      const sourceY = Math.floor(value / this.tileSheet.columns) * this.tileSheet.tileSize;
      const destinationX = (i % this.columns) * this.tileSheet.tileSize;
      const destinationY = Math.floor(i / this.columns) * this.tileSheet.tileSize;

      this.buffer.drawImage(this.tileSheet.image,
        sourceX, sourceY, this.tileSheet.tileSize, this.tileSheet.tileSize,
        destinationX, destinationY, this.tileSheet.tileSize, this.tileSheet.tileSize);
    }
  }
}

class Player {
  constructor(tileSheet, width, height, posX, posY) {
    this.tileSheet = tileSheet;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
    this.posX = posX;
    this.posY = posY;
    this.jumping = true;
    this.speedX = 0;
    this.speedY = 0;
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

  left() {
    return this.posX;
  }

  right() {
    return this.posX + this.width;
  }

  top() {
    return this.posY;
  }

  bottom() {
    return this.posY;
  }

  crashWith(obstacle) {
    return !(this.bottom() < obstacle.top() || 
    this.top() > obstacle.bottom() || 
    this.right() < obstacle.left() || 
    this.left() > obstacle.right());
  }
}

class Obstacle {
  constructor(canvas, context, posX, posY, width, height, image) {
    this.image = image;
    this.canvas = canvas;
    this.context = context;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
  }

  drawObstacle() {
    this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
  }

  move(speed) {
    if (this.posY === 700) {
      this.posY = 0;
    } else {
      this.posY += speed;
    }
  }

  left() {
    return this.posX;
  }

  right() {
    return this.posX + this.width;
  }

  top() {
    return this.posY;
  }

  bottom() {
    return this.posY;
  }
}