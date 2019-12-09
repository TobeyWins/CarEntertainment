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

    var menuContainer = document.getElementById("functionsCenterContainer");
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

document.getElementById("doors").addEventListener("click", function () { lock_unlock() });
document.getElementById("windows").addEventListener("click", function () { displaySelectedElement("windowAccessCenterContainer") });

document.getElementById("openAllWindow").addEventListener("click", function () { onWindowClick("openAllWindow"); });
document.getElementById("closeAllWindow").addEventListener("click", function () { onWindowClick("closeAllWindow"); });
document.getElementById("frontLeft").addEventListener("click", function () { onWindowClick("frontLeft"); });
document.getElementById("frontRight").addEventListener("click", function () { onWindowClick("frontRight"); });
document.getElementById("backLeft").addEventListener("click", function () { onWindowClick("backLeft"); });
document.getElementById("backRight").addEventListener("click", function () { onWindowClick("backRight"); });


document.getElementById("returnButton").addEventListener("click", function () { hideActiveElement() });


//locking and windows
const ACTION_BASE_URL = "http://192.168.0.79:5000/action/";
const WINDOW_BASE_URL = "http://192.168.0.79:5000/window/";
const LOCK_BTN_CLASS_STRING = "fa-lock"
const UNLOCK_BTN_CLASS_STRING = "fa-unlock"
const WINDOW_UP_BTN_CLASS_STRING = "fa-window-maximize"
const WINDOW_DOWN_BTN_CLASS_STRING = "fa-window-minimize"
const WINDOW_SYMBOLS_BUTTON_MAPPING = ["frontLeftSymbol", "frontRightSymbol", "backLeftSymbol", "backRightSymbol"]
var isWindowOpen = [false, false, false, false];
var isLocked = true;

function lock_unlock() {

    if(isLocked){
        action = "unlock";
        isLocked = false;
    }
    else {
        action = "lock";
        isLocked = true;
    }

    setLockSymbol(action);

    fetch(ACTION_BASE_URL + action).then(function (response) {
        response.text().then(function (text) {
            console.log(text);
        });
    });
}

function setLockSymbol(action) {

    var lockSymbolClassList = document.getElementById("lockSymbol").classList;

    if (action === "unlock") {
        if (lockSymbolClassList.contains(LOCK_BTN_CLASS_STRING)) {
            lockSymbolClassList.remove(LOCK_BTN_CLASS_STRING);
            lockSymbolClassList.add(UNLOCK_BTN_CLASS_STRING);
        }
    }
    else if (action === "lock") {
        if (lockSymbolClassList.contains(UNLOCK_BTN_CLASS_STRING)) {
            lockSymbolClassList.remove(UNLOCK_BTN_CLASS_STRING);
            lockSymbolClassList.add(LOCK_BTN_CLASS_STRING);
        }
    }
    else {
        //error
        console.log("unexpected string error");
    }
}

function onWindowClick(id) {
    switch (id) {
        case "openAllWindow":
            for (let i = 0; i < isWindowOpen.length; i++) { 
                isWindowOpen[i] = true;
            }
            window_up_down(isWindowOpen[0]);
            break;
        case "closeAllWindow":
            for (let i = 0; i < isWindowOpen.length; i++) {
                isWindowOpen[i] = false;
            }
            window_up_down(isWindowOpen[0]);
            break;
        case "frontLeft":
            isWindowOpen[0] = !isWindowOpen[0];
            window_up_down(isWindowOpen[0]);
            break;
        case "frontRight":
            isWindowOpen[1] = !isWindowOpen[1];
            window_up_down(isWindowOpen[1]);
            break;
        case "backLeft":
            isWindowOpen[2] = !isWindowOpen[2];
            window_up_down(isWindowOpen[2]);
            break;
        case "backRight":
            isWindowOpen[3] = !isWindowOpen[3];
            window_up_down(isWindowOpen[3]);
            break;
    }

    setWindowSymbols();
}

function setWindowSymbols() {

    let selectedElementIdx = 0;

    for (element of isWindowOpen) {
        
        var lockSymbolClassList = document.getElementById(WINDOW_SYMBOLS_BUTTON_MAPPING[selectedElementIdx]).classList;
        
        if (element === true) {
            if (lockSymbolClassList.contains(WINDOW_UP_BTN_CLASS_STRING)) {
                lockSymbolClassList.remove(WINDOW_UP_BTN_CLASS_STRING);
                lockSymbolClassList.add(WINDOW_DOWN_BTN_CLASS_STRING);
            }
        }
        else {
            if (lockSymbolClassList.contains(WINDOW_DOWN_BTN_CLASS_STRING)) {
                lockSymbolClassList.remove(WINDOW_DOWN_BTN_CLASS_STRING);
                lockSymbolClassList.add(WINDOW_UP_BTN_CLASS_STRING);
            }
        }

        selectedElementIdx++;
    }
}

function window_up_down(actionInput) {

    var action = "";

    if(actionInput){
        action = "down";
    }
    else {
        action = "up";
    }

    fetch(WINDOW_BASE_URL + action).then(function (response) {
        response.text().then(function (text) {
            console.log(text);
        });
    });
}
