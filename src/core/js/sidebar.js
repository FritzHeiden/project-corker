/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
export function showOptions() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "0px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.3)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
export function closeOptions() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "#323232";
    setTimeout(function(){
      document.getElementById('inputFolderPath').value = "";
    },1000);
}
