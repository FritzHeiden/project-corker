class Sidebar{

  constructor(){
  }

  showSidebar(){
    document.getElementById("sideBar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "0px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.3)";
    document.getElementById("sideBarInput").focus();

  }

  closeSidebar() {
      document.getElementById("sideBar").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
      document.body.style.backgroundColor = "#1e1e1e";

      setTimeout(function(){
        document.getElementById('sideBarInput').value = "";
      },1000);
  }

}

let bar = new Sidebar();

exports.Sidebar = bar;
