// /* eslint-disable class-methods-use-this */
// /* eslint-disable max-classes-per-file */
// /* eslint-disable linebreak-style */
// /* eslint-disable no-unused-expressions */
// class Display2 {
//   constructor(canvas, tileSheet) {
//     this.tileSheet = tileSheet;
//     this.buffer = document.createElement('canvas');
//     this.context = canvas.getContext('2d');
//     this.scaledSize = 32;
//     this.spriteSize = 16;
//     this.columns = 24;
//     this.rows = 24;
//     this.map = [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
//       3,2,1,1,0,0,3,3,3,2,1,0,3,0,0,0,3,0,0,1,2,2,2,3,
//       3,1,1,0,0,0,3,3,3,1,0,0,3,0,2,0,3,0,1,1,2,1,1,3,
//       3,0,0,0,0,0,3,3,2,0,0,0,3,0,0,0,3,1,2,2,2,1,1,3,
//       3,1,1,0,0,0,3,1,1,0,0,0,3,3,3,0,1,1,2,2,1,0,0,3,
//       3,0,0,1,2,1,3,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,3,
//       3,0,1,2,2,1,3,0,1,0,0,0,0,0,0,0,0,1,0,1,0,1,0,3,
//       3,0,0,1,1,1,3,1,1,1,0,1,0,0,0,3,0,0,3,3,3,0,0,3,
//       3,0,0,0,1,1,3,3,3,3,3,3,3,3,3,3,0,0,3,3,3,3,3,3,
//       3,3,0,3,3,3,3,3,3,3,3,1,0,0,0,3,0,0,3,3,3,2,1,3,
//       3,3,1,0,0,1,3,3,3,3,3,0,0,0,0,0,0,1,1,0,1,1,0,3,
//       3,3,3,3,1,1,3,3,3,3,3,1,0,0,0,0,1,1,2,2,1,0,0,3,
//       3,3,3,3,0,1,0,0,3,3,1,0,0,1,1,2,1,2,0,1,2,1,0,3,
//       3,2,3,0,0,0,1,0,1,1,0,0,1,0,0,2,1,2,2,1,2,1,1,3,
//       3,1,1,1,0,0,0,0,1,1,0,0,0,1,1,0,2,1,1,1,2,0,1,3,
//       3,1,1,1,1,1,0,1,3,3,1,0,0,0,1,1,1,2,2,2,1,1,2,3,
//       3,0,0,0,1,0,1,1,3,3,1,0,0,0,0,1,0,1,1,1,1,1,1,3,
//       3,1,1,0,0,0,0,3,3,3,1,1,2,2,0,0,3,3,3,3,3,3,3,3,
//       3,0,1,0,1,0,1,3,3,3,3,2,2,2,2,1,3,1,0,0,0,0,1,3,
//       3,1,0,0,0,1,3,3,3,2,1,0,1,2,0,1,0,0,0,1,1,0,0,3,
//       3,2,0,0,0,0,3,3,3,3,1,1,0,1,1,0,3,0,1,2,2,1,0,3,
//       3,3,1,0,1,1,3,3,3,3,3,3,0,0,1,1,3,0,0,1,1,0,0,3,
//       3,3,1,1,2,3,3,3,3,3,3,3,1,0,1,2,3,1,0,0,0,0,1,3,
//       3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
//   }

//   render() {
//     this.context.drawImage(this.buffer.canvas, 
//       0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 
//       0, 0, this.context.canvas.width, this.context.canvas.height); 
//   }

//   drawBackground(x, y, width, height) {
//     let xMin = Math.floor(x / this.scaledSize);
//     let yMin = Math.floor(y / this.scaledSize);
//     let xMax = Math.ceil((x + width) / this.scaledSize);
//     let yMax = Math.ceil((y + height) / this.scaledSize);

//     if (xMin < 0) { xMin = 0; }
//     if (yMin < 0) { yMin = 0; }
//     if (xMax > this.columns) { xMax = this.columns; }
//     if (yMax > this.rows) { yMax = this.rows; }

//     for (let i = xMin; i < xMax; i ++) {
//       for (let j = yMin; j < yMax; j ++) {
//         let value = map[j * this.columns + i];
//         let tileX = Math.floor(i * this.scaledSize - x + this.context.canvas.width * 0.5 - width * 0.5);
//         let tileY = Math.floor(j * this.scaledSize - y + this.context.canvas.height * 0.5 - height * 0.5);

//         this.buffer.drawImage(this.tileSheet, 
//           value * this.spriteSize, 0, this.spriteSize, this.spriteSize,
//           tileX, tileY, this.scaledSize, this.scaledSize);
//   }
// }

// class Player {
//   constructor(tileSheet, width, height, posX, posY) {
//     this.tileSheet = tileSheet;
//     this.width = width;
//     this.height = height;
//     this.tiles = new Map();
//     this.posX = posX;
//     this.posY = posY;
//     this.jumping = true;
//     this.speedX = 0;
//     this.speedY = 0;
//   }

//   render(name, tileX, tileY) {
//     const buffer = document.createElement('canvas');
//     buffer.width = this.width;
//     buffer.height = this.height;
//     buffer.getContext('2d').drawImage(this.tileSheet,
//       tileX * this.width, tileY * this.height, this.width, this.height,
//       0, 0, this.width, this.height);
//     this.tiles.set(name, buffer);
//   }

//   drawPlayer(name, context) {
//     const buffer = this.tiles.get(name);
//     context.drawImage(buffer, this.posX, this.posY);
//   }

//   jump() {
//     if (!this.jumping) {
//       this.jumping = true;
//       this.speedY -= 40;
//     }
//   }

//   moveLeft() {
//     this.speedX -= 1;
//   }

//   moveRight() {
//     this.speedX += 1;
//   }
// }

// class viewPort {
//   constructor(x, width) {
//     this.x = x;
//     this.width = width;
//   }

//   scrollTo(x) {
//     this.x += (x - this.x - this.width * 0.5) * 0.05;
//   }
// }
