/* eslint-disable linebreak-style */
class Game {
  constructor(canvas, context, thisLevel) {
    this.canvas = canvas;
    this.context = context;
    this.thisLevel = thisLevel;
  }

  update() {
    this.thisLevel.updatePlayer();
  }

  draw(context) {
    this.thisLevel.drawMap(context, false);
    this.thisLevel.drawPlayer(context);
  }

  loop() {
    this.context.fillStyle = '#333';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.update();
    this.draw(this.context);
    window.requestAnimationFrame(() => this.loop());
  }
}


window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    const canvas = document.getElementById('screen');
    const context = canvas.getContext('2d');

    const level = new Level(canvas, context);
    const game = new Game(canvas, context, level);
    game.loop();
  };
}