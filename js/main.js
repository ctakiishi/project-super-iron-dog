/* eslint-disable linebreak-style */
window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    const canvas = document.getElementById('screen');
    const context = canvas.getContext('2d');

    const level = new Level(canvas, context);
    level.drawMap(context, false);
    level.drawPlayer();
    //level.movePlayer();
  };
}