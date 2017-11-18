export function hover(){
  var element = document.getElementById("menuButtons");
  element.classList.toggle("hover");
}
/*
export function showMenu(){

  // Open the menu to write down the next directory 
  var element = document.getElementById("openMenu");
  element.style.animation = "showMenu 1s ease-in-out 0s";
  element.style.animationFillMode = "forwards";
  element.style.animationDirection = "normal";


  let input = document.getElementById("inputFolderPath");
  var delayInMilliseconds = 275; //1 second
  setTimeout(function() {
    input.style.display = "block";
    input.style.animation = "showInput 0.5s ease-in-out 0s";
    input.style.animationFillMode = "forwards";
    input.style.animationDirection = "normal";
  }, delayInMilliseconds);


  //so the two menu divs become a cross
  let crossOne = document.getElementById('crossOne');
  crossOne.style.animationName = "showCrossOne";
  crossOne.style.animation = "showCrossOne 1s ease-in-out 0s";
  crossOne.style.animationFillMode = "forwards";
  crossOne.style.animationDirection = "normal";

  let crossTwo = document.getElementById('crossTwo');
  crossTwo.style.animation = "showCrossTwo 1s ease-in-out 0s";
  crossTwo.style.animationFillMode = "forwards";
  crossTwo.style.animationDirection = "normal";
}

export function closeMenu() {
  // Close the menu
  let input = document.getElementById("inputFolderPath");
  input.style.display = "none"; // nicht so schön
  input.value = "";

  var delayInMilliseconds = 200;
  setTimeout(function() {
    var element = document.getElementById("openMenu");
    element.style.animation = "closeMenu 1s ease-in-out 0s";
    element.style.animationFillMode = "backwards";
    element.style.animationDirection = "reverse";
  }, delayInMilliseconds);

  //so the crosses become a menu symbole
  let crossOne = document.getElementById('crossOne');
  crossOne.style.animation = "closeCrossOne 1s ease-in-out 0s";
  crossOne.style.animationFillMode = "backwards";
  crossOne.style.animationDirection = "reverse";

  let crossTwo = document.getElementById('crossTwo');
  crossTwo.style.animation = "closeCrossTwo 1s ease-in-out 0s";
  crossTwo.style.animationFillMode = "backwards";
  crossTwo.style.animationDirection = "reverse";
}
*/

/*
let audioVideo;

document.addEventListener('DOMContentLoaded', function() {
  var heightAudio = document.getElementById('firstAudio').offsetHeight;

  console.log(heightAudio);
  //document.getElementById('secondAudio').style.height = heightAudio;
  document.getElementById('secondAudio').setAttribute("style","height:500px");
});

document.addEventListener("DOMContentLoaded", function(event) {
});


function audioVideoClicked(functionality) {
 //Sollte nochmal definiert werden
  if(functionality == 0){
    document.getElementById('buttonContainer').style.display = "block";
    document.getElementById('perspective').style.display = "none";
  }
  else if(audioVideo != 1 | audioVideo != 2){
    document.getElementById('buttonContainer').style.display = "none";
    document.getElementById('perspective').style.display = "block";

    if(functionality == 1 && audioVideo != 1){ //show AudioPart
      document.getElementById('containerAudio').style.display = "block";
      document.getElementById('containerVideo').style.display = "none";
      audioVideo = 1;
    }

    else if(functionality == 2 && audioVideo != 2){ //show VideoPart
      document.getElementById('containerAudio').style.display = "none";
      document.getElementById('containerVideo').style.display = "block";
      audioVideo = 2;
    }
  }
}

function menuClicked(){
  console.log("halloMenu");
}*/
