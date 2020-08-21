/* eslint-disable no-unused-expressions */
/* eslint-disable linebreak-style */
const Engine = function(timeStep, update) {
  this.accumulatedTime = 0;
  this.animationFrameRequest = undefined,
  this.time = undefined,
  this.timeStep = timeStep,
  this.updated = false;
  this.update = update;

  this.run = (timeStamp) => {
    this.accumulatedTime += timeStamp - this.time;
    this.time = timeStamp;

    if (this.accumulatedTime >= this.timeStep * 3) {
      this.accumulatedTime = this.timeStep;
    }

    while (this.accumulatedTime >= this.timeStep) {
      this.accumulatedTime -= this.timeStep;

      this.update;

      this.updated = true;
    }

    this.animationFrameRequest = window.requestAnimationFrame(this.handleRun);
  };

  this.handleRun = (timeStep) => { this.run(timeStep); };
};

Engine.prototype = {

  constructor:Engine,

  start() {
    this.accumulated_time = this.time_step;
    this.time = window.performance.now();
    this.animationFrameRequest = window.requestAnimationFrame(this.handleRun);
  },

  stop() { window.cancelAnimationFrame(this.animationFrameRequest);}

};