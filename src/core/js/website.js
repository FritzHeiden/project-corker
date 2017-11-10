
export function helloWorld(){
  alert("hello World");
}

export function hover(){
  var element = document.getElementById("menuButtons");
  element.classList.toggle("hover");
}

export function showMenu(){
  var element = document.getElementById("openMenu");
  element.classList.toggle("openMenu");

  let input = document.getElementById("inputFolderPath");
  input.classList.toggle("showInput");
  setTimeout(showInputField(input), 1000);

  //so the two menu divs become a cross
  let crossOne = document.getElementById('crossOne');
  crossOne.classList.toggle("cross_One_show");

  let crossTwo = document.getElementById('crossTwo');
  crossTwo.classList.toggle("cross_Two_show");
}

export function closeMenu() {
  var element = document.getElementById("openMenu");
  element.classList.toggle("closeMenu");

  let input = document.getElementById("inputFolderPath");
  input.classList.toggle("closeInput");
  setTimeout(closeInputField(input), 1000);

  //so the two menu divs become a cross
  let crossOne = document.getElementById('crossOne');
  crossOne.classList.toggle("cross_One_close");

  let crossTwo = document.getElementById('crossTwo');
  crossTwo.classList.toggle("cross_Two_close");
}

function closeInputField(input){
  input.style.display = "none";
}

function showInputField(input){
  input.style.display = "block";
}



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
