var CanvasXSize = 800;
var CanvasYSize = 200;
var speed = 30; // lower is faster
var scale = 1.05;
var y = -4.5; // vertical offset
var x;
var y;
var ctx;
var canvas;
let height;
let width;
var counter;
document.addEventListener('DOMContentLoaded', function() {
  _init()
});

function _init(){
  canvas = document.getElementById('canvasPlayer');
  ctx = canvas.getContext("2d");
  height = canvas.height;
  width = canvas.width;
  x=10;
  y=100;

  counter = 10;
  draw();
  //_createBeams(ctx, height, counter);
}

function _createBeams(ctx, height, counter){
    let index = 1;
    let width = 0;
/*
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
      requestAnimationFrame(_createBeams(ctx, height, counter));


      //setInterval(moveCanvasElements(ctx), 5000);
    }*/
}

function draw(){
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
    index = index + 10;
    ctx.fill();
    x+=2;
    ctx.fillStyle="rgba(34,45,23,0.4)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    requestAnimationFrame(draw);
  }
  //ctx.clearRect(0,0,can.width,can.height);
}
