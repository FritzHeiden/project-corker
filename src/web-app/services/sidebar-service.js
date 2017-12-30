class Sidebar {

    constructor() {
    }

    showSidebar() {
        document.getElementById("fullTransparent").style.width = "100vw";
        document.getElementById("transparentPart").style.width = "85%";
        document.getElementById("sideBar").style.width = "15%";
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("sideBarInput").focus();
    }

    closeSidebar() {
        document.getElementById("fullTransparent").style.width = "0";
        document.getElementById("transparentPart").style.width = "0";
        document.getElementById("sideBar").style.width = "0";

        document.getElementById("main").style.marginLeft = "0";
        document.body.style.backgroundColor = "#1e1e1e";

        setTimeout(function () {
            document.getElementById('sideBarInput').value = "";
        }, 1000);
    }

}

let bar = new Sidebar();

exports.Sidebar = bar;
