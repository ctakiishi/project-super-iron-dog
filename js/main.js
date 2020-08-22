/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
/* Setup file */
class Board {
  constructor(canvas, context, background, timeStep, player, controller, obstacleConstructor) {
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
    this.obstacleConstructor = obstacleConstructor;
    this.frames = 0;
    this.obstaclesArray = [];
    this.speed = 2;
    this.animationId = 0;
    this.gameOver = false;
    this.score = {
      points: 0,
      htmlElement: document.querySelector('#score'),
    };
  }

  runCycle(timeStamp) {
    this.accumulatedTime = timeStamp - this.time;

    this.update();
    this.startGame();

    this.time = timeStamp;
    if (this.gameOver) {
      this.stop();
    } else {
      this.animationFrameRequest = window.requestAnimationFrame(() => this.runCycle(this.time));
    }
  }

  start() {
    this.accumulatedTime = this.timeStep;
    this.time = window.performance.now();
    if (this.gameOver) {
      this.stop();
    } else {
      this.animationFrameRequest = window.requestAnimationFrame(() => this.runCycle(this.time));
    }
  }

  stop() {
    window.cancelAnimationFrame(this.animationFrameRequest);
  }

  startGame() {
    this.background.drawBackground();
    this.background.render();
    this.player.render('idle', 1, 1);
    this.player.drawPlayer('idle', this.context);
    this.updateObstacles();
    this.createObstacle();
    this.checkCrash();
    this.frames += 1;
    this.scorePoints();
  }

  checkCollision() {
    if (this.player.posX < 0) {
      this.player.posX = 0;
      this.player.speedX = 0;
    }
    if (this.player.posX >= 680) {
      this.player.posX = 680;
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

  updateObstacles() {
    if (this.frames % 60 === 0) {
      const randomObstacle = this.randomObstacle();
      this.obstaclesArray.push(randomObstacle);
    }
  }

  createObstacle() {
    this.obstaclesArray.forEach((element, index) => {
      element.drawObstacle();
      element.move(this.speed);
      if (element.posY >= this.canvas.height) {
        this.obstaclesArray.splice(index, 1);
      }
    });
  }

  randomObstacle() {
    const minWidth = 50;
    const maxWidth = 100;
    const randomWidth = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
    const minPosX = 100;
    const maxPosX = this.canvas.width - randomWidth;
    const randomPosX = Math.floor(Math.random() * (maxPosX - minPosX + 1)) + minPosX;

    const image = new Image();
    image.src = './img/bug.png';

    const newObstacle = new Obstacle(this.canvas, this.context, randomPosX, 0, randomWidth, randomWidth, image);
    return newObstacle;
  }

  checkCrash() {
    this.obstaclesArray.forEach((element) => {
      if (this.player.crashWith(element)) {
        this.gameOver = true;
      }
    });
  }

  scorePoints() {
    this.score.points = Math.floor(this.frames / 5);
    this.score.htmlElement.innerText = this.score.points;
  }
}

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    const canvas = document.getElementById('screen');
    const context = canvas.getContext('2d');
    const newPlayer = new Image();
    newPlayer.src = './img/dog.png';
    const backGround = new Image();
    backGround.src = './img/tiles.png';

    backGround.onload = () => {
      const controller = new Controller();
      const player = new Player(newPlayer, 70, 70, 0, 500);
      const background = new Display(backGround, canvas);
      const board = new Board(canvas, context, background, 10000 / 30, player, controller, Obstacle);
      board.movePlayer();
      board.start();
    };
  };
};