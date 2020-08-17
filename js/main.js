/* eslint-disable linebreak-style */
// 1. Criar fundo e mover
// 2. Criar obstáculos para pular
// 3. Criar Mario
// 4. Criar help spawn
window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    const canvas = document.getElementById('screen');
    const context = canvas.getContext('2d');
    const tile = new Image();
    tile.src = './img/tiles.jpg';

    tile.onload = () => {
      const spriteSky = new spriteSheet(canvas, context, tile, 95, 650, 16, 16);
      const spriteFloor = new spriteSheet (canvas, context, tile, 90, 60, 30, 30);
      spriteSky.drawTiles(0,100,0,50);
      spriteFloor.drawTiles(0, 30, 19, 22);
    }
  }
};