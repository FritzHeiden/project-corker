/*
export function drag(ev){
  ev.dataTransfer.setData("text", ev.target.id);
}*/

export function drag(event){
  event.dataTransfer.setData("text", event.target.id);
  console.log("Hallo");
}


export function drop(event){
  event.preventDefault();
  var data = e.dataTransfer.getData("text");
  e.target.appendChild(document.getElementById(data));
}

export function allowDrop(event){
  event.preventDefault();
}
