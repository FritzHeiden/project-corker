class Sidebar{

  constructor(){
  }

  showSidebar(){
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "0px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.3)";
  }

  closeSidebar() {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
      document.body.style.backgroundColor = "#323232";
      setTimeout(function(){
        document.getElementById('inputFolderPath').value = "";
      },1000);
  }

}

let bar = new Sidebar();

exports.Sidebar = bar;
