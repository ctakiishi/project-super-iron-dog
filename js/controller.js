/* eslint-disable max-classes-per-file */
/* eslint-disable default-case */
/* eslint-disable linebreak-style */
/* Class for key events when controlling player */

class ButtonInput {
  constructor() {
    this.down = false;
    this.active = undefined;
  }

  getInput(down) {
    if (this.down !== down) {
      this.active = down;
      this.down = down;
    }
  }
};

class Controller {
  constructor() {
    this.left = new ButtonInput();
    this.right = new ButtonInput();
    this.up = new ButtonInput();
  }

  keyDownUp(event) {
    const down = (event.type === 'keydown');

    switch (event.keyCode) {
      case 32:
        this.up.getInput(down);
        break;
      case 37:
        this.left.getInput(down);
        break;
      case 39:
        this.right.getInput(down);
        break;
    }
  }
};