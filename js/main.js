/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
/* Setup file */
class Board {
  constructor(canvas, context, background, timeStep, player, controller) {
    this.canvas = canvas;
    this.context = context;
    this.background = background;
    this.accumulatedTime = 0;
    this.animationFrameRequest = undefined;
    this.time = undefined;
    this.timeStep = timeStep;
    this.updated = false;
    this.player = player;
    this.controller = controller;
    this.gravity = 3;
    this.friction = 0.9;
  }

  runCycle(timeStamp) {
    this.accumulatedTime = timeStamp - this.time;

    this.update();
    this.startGame();

    this.time = timeStamp;
    this.animationFrameRequest = window.requestAnimationFrame(() => this.runCycle(this.time));
  }

  start() {
    this.accumulatedTime = this.timeStep;
    this.time = window.performance.now();
    this.animationFrameRequest = window.requestAnimationFrame(() => this.runCycle(this.time));
  }

  stop() {
    window.cancelAnimationFrame(this.animationFrameRequest);
  }

  startGame() {
    this.background.drawBackground();
    this.background.render();
    this.player.render('idle', 3, 5);
    this.player.drawPlayer('idle', this.context);
  }

  checkCollision() {
    if (this.player.posX < 0) {
      this.player.posX = 0;
      this.player.speedX = 0;
    }
    if (this.player.posY > 520) {
      this.player.posY = 520;
      this.player.speedY = 0;
      this.player.jumping = false;
    }
  }

  updatePlayer() {
    this.player.speedY += this.gravity;
    this.player.posX += this.player.speedX;
    this.player.posY += this.player.speedY;
    this.player.speedX *= this.friction;
    this.player.speedY *= this.friction;
    this.checkCollision(this.player);
  }

  movePlayer() {
    window.addEventListener('keydown', (event) => {
      this.controller.keyDownUp(event);
    });
    window.addEventListener('keyup', (event) => {
      this.controller.keyDownUp(event);
    });
  }

  update() {
    if (this.controller.left.active) {
      this.player.moveLeft();
    }
    if (this.controller.right.active) {
      this.player.moveRight();
    }
    if (this.controller.up.active) {
      this.player.jump();
      this.controller.up.active = false;
    }
    this.updatePlayer();
  }
}

window.onload = () => {
  const canvas = document.getElementById('screen');
  const context = canvas.getContext('2d');
  const newPlayer = new Image();
  newPlayer.src = '/img/dog.png';
  const backGround = new Image();
  backGround.src = '/img/tiles.png';

  backGround.onload = () => {
    const controller = new Controller();
    const player = new Player(newPlayer, 70, 70, 0, 500);
    const background = new Display(backGround, canvas);
    const board = new Board(canvas, context, background, 10000 / 30, player, controller);
    board.movePlayer();
    board.start();
  };
};
