
/*
var oldX = 0;
var oldY = 0;
let difference = 0;

export function clicked(x,y){
  let filter = document.getElementById('filterButton_1');

  if(y > oldY){
    //leiser werden
    difference = oldY - y;
    //console.log("leiser werden");
    filter.style.transform = "rotate(" + degree(y)+"deg)";
  }
  if(y < oldY){
    //lauter werden
    difference = oldY - y;
    //console.log("lauter werden");
    filter.style.transform = "rotate(-" + degree(y)+"deg)";
  }
  console.log(difference);
  oldX = x;
  oldY = y;
}

function degree(y){
  let fill = 360;
  let procent = y/fill;
  return procent;
}
*/
document.addEventListener('DOMContentLoaded', function() {
  let canvas = document.getElementById('canvasPlayer');
  let ctx = canvas.getContext("2d");
  let height = canvas.height;
  console.log(height);

  ctx.beginPath();
  ctx.rect(0,height - 100,10,200);
  ctx.fillStyle = '#95989A';
  ctx.fill();
  //ctx.lineWidth = 1;
  //ctx.strokeStyle = '#00868B';
  //ctx.stroke();
});
