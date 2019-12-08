
//header clock element and functions

//load clock when content is loaded
window.onload = showUpdateClock;

function setupClock() {
    var refreshRateMs = 1000;
    mytime = setTimeout("showUpdateClock()", refreshRateMs);
}

function showUpdateClock() {
    var dateTime = new Date()
    var seconds = dateTime.getSeconds();
    var minutes =  dateTime.getMinutes();
    var hours = dateTime.getHours();
    var days = dateTime.getDate();
    var months = dateTime.getMonth() + 1;

    if(seconds < 10) {
        seconds = "0" + seconds;
    }

    if(minutes < 10) {
        minutes = "0" + minutes;
    }

    if(hours < 10) {
        hours = "0" + hours;
    }

    if(days < 10) {
        days = "0" + days;
    }

    if(months < 10) {
        months = "0" + months;
    }

    var timeString = hours + ":" + minutes + ":" +  seconds; 
    var dateString = days + "." + months + "." + dateTime.getFullYear(); 

    document.getElementById("time").innerHTML = timeString; 
    document.getElementById("date").innerHTML = dateString; 
    setupClock(); //reset timer
}


// menu selector code, used to show and hide blocks and navigate through the web app - pages
var activeItem;

function displaySelectedElement(idToShow) {

    hideGridButtons();

    document.getElementById(idToShow).style.display='block';
    document.getElementById("returnButton").style.display='block';
    
    activeItem = idToShow;
}

function hideActiveElement() {

    showGridButtons();

    document.getElementById(activeItem).style.display='none';
    document.getElementById("returnButton").style.display='none';
}

function hideGridButtons() {
    var menuContainer = document.getElementById("menuCenterContainer");
    menuContainer.style.display='none';    
    
}

function showGridButtons() {
    var menuContainer = document.getElementById("menuCenterContainer");
    menuContainer.style.display='block';   
}

document.getElementById("carDataButton").addEventListener("click", function () { displaySelectedElement("carDataCenterContainer") });
document.getElementById("musicButton").addEventListener("click", function () { displaySelectedElement("musicPlayerContainer") });
document.getElementById("B3").addEventListener("click", function () { displaySelectedElement("v3") });
document.getElementById("B4").addEventListener("click", function () { displaySelectedElement("v4") });
document.getElementById("carFunctionsButton").addEventListener("click", function () { displaySelectedElement("functionsCenterContainer") });
document.getElementById("B6").addEventListener("click", function () { displaySelectedElement("v6") });

document.getElementById("returnButton").addEventListener("click", function () { hideActiveElement() });
