var CanvasXSize = 800;
var CanvasYSize = 200;
var speed = 30; // lower is faster
var scale = 1.05;
var y = -4.5; // vertical offset

document.addEventListener('DOMContentLoaded', function() {
  let canvas = document.getElementById('canvasPlayer');
  let ctx = canvas.getContext("2d");
  let height = canvas.height;

  let counter = 100;
  setInterval(_createBeams(ctx, height, counter), speed);

});

function _createBeams(ctx, height, counter){
    let index = 1;
    let width = 0;

    while(index <= counter){
      let testHeight = Math.floor(Math.random() * (height - 0 + 1)) + 0;

      ctx.beginPath();
      ctx.rect(width,height - testHeight,10,testHeight);
      ctx.fillStyle = '#95989A';
      ctx.lineWidth="4";
      ctx.strokeStyle="#323232";
      ctx.stroke();
      width = width + 14;
      index = index + 1;
      ctx.fill();
    }
}

function moveCanvasElements(){

}
