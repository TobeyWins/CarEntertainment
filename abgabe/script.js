//header clock element and functions
//load clock when content is loaded

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

// click listeners
document.getElementById("carDataButton").addEventListener("click", function () { displaySelectedElement("carDataCenterContainer"); updateCarDataItems(); });
document.getElementById("musicButton").addEventListener("click", function () { displaySelectedElement("musicPlayerContainer") });
document.getElementById("phoneButton").addEventListener("click", function () { displaySelectedElement("phoneCenterContainer") });
document.getElementById("mapButton").addEventListener("click", function () {displaySelectedElement("mapContainer"); drawmap(); });
document.getElementById("carFunctionsButton").addEventListener("click", function () { displaySelectedElement("functionsCenterContainer") });
document.getElementById("settingsButton").addEventListener("click", function () { displaySelectedElement("settingsCenterContainer") });

document.getElementById("doors").addEventListener("click", function () { lock_unlock() });
document.getElementById("windows").addEventListener("click", function () { displaySelectedElement("windowAccessCenterContainer") });

document.getElementById("openAllWindow").addEventListener("click", function () { onWindowClick("openAllWindow"); });
document.getElementById("closeAllWindow").addEventListener("click", function () { onWindowClick("closeAllWindow"); });
document.getElementById("frontLeft").addEventListener("click", function () { onWindowClick("frontLeft"); });
document.getElementById("frontRight").addEventListener("click", function () { onWindowClick("frontRight"); });
document.getElementById("backLeft").addEventListener("click", function () { onWindowClick("backLeft"); });
document.getElementById("backRight").addEventListener("click", function () { onWindowClick("backRight"); });

document.getElementById("returnButton").addEventListener("click", function () { hideActiveElement() });

document.getElementById("call").addEventListener("click", function () { 
    fetchPhone("call");
    document.getElementById("dialPanel").style.fontWeight="bold"; 
});

document.getElementById("stop").addEventListener("click", function () {
    fetchPhone("stop");
    document.getElementById("dialPanel").innerText = "";
    document.getElementById("dialPanel").style.fontWeight = "normal";
});

document.getElementById("delete").addEventListener("click", function () { document.getElementById("dialPanel").innerText = ""; });

document.getElementById("dialButtons").addEventListener("click", function (event) {

    if (!event.target.classList.contains("gridElement")) {

        document.getElementById("dialPanel").innerText += event.target.innerText;
        console.log(event.target)
    }
}
);

document.getElementById("bright").addEventListener("click", function () { document.getElementsByTagName("html")[0].setAttribute("visual_style", "brightDesign") });
document.getElementById("dark").addEventListener("click", function () { document.getElementsByTagName("html")[0].setAttribute("visual_style", "darkDesign") });
document.getElementById("black").addEventListener("click", function () { document.getElementsByTagName("html")[0].setAttribute("visual_style", "black") });
document.getElementById("neo").addEventListener("click", function () { document.getElementsByTagName("html")[0].setAttribute("visual_style", "neo") });


//end listeners


//call
function fetchPhone(action) {
    fetch(PHONE_BASE_URL + action).then(function (response) {
        response.text().then(function (text) {
            console.log(text);
        });
    });
}

//locking and windows
const LOCK_BTN_CLASS_STRING = "fa-lock"
const UNLOCK_BTN_CLASS_STRING = "fa-unlock"
const WINDOW_UP_BTN_CLASS_STRING = "fa-window-maximize"
const WINDOW_DOWN_BTN_CLASS_STRING = "fa-window-minimize"
const WINDOW_SYMBOLS_BUTTON_MAPPING = ["frontLeftSymbol", "frontRightSymbol", "backLeftSymbol", "backRightSymbol"]
var isWindowOpen = [false, false, false, false];
var isLocked = true;

const WINDOW_DOWN = true;
const WINDOW_UP = false;

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
            var elements = document.getElementsByClassName("editableWindowButton");
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].classList.contains(WINDOW_UP_BTN_CLASS_STRING)) {
                    elements[i].classList.remove(WINDOW_UP_BTN_CLASS_STRING);
                    elements[i].classList.add(WINDOW_DOWN_BTN_CLASS_STRING);
                }
            }

            window_up_down(WINDOW_DOWN);
            break;

        case "closeAllWindow":
            var elements = document.getElementsByClassName("editableWindowButton");
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].classList.contains(WINDOW_DOWN_BTN_CLASS_STRING)) {
                    elements[i].classList.remove(WINDOW_DOWN_BTN_CLASS_STRING);
                    elements[i].classList.add(WINDOW_UP_BTN_CLASS_STRING);         
                }
            }

            window_up_down(WINDOW_UP);
            break;

        case "frontLeft":
        case "frontRight":
        case "backLeft":
        case "backRight":
            setWindowSymbol(id + "Symbol");
            break;

        default:
            break;
    }
}

function setWindowSymbol(id) {

    var element = document.getElementById(id);

    if (element.classList.contains(WINDOW_DOWN_BTN_CLASS_STRING)) {
        element.classList.remove(WINDOW_DOWN_BTN_CLASS_STRING);
        element.classList.add(WINDOW_UP_BTN_CLASS_STRING);
        window_up_down(WINDOW_UP);
    } else if (element.classList.contains(WINDOW_UP_BTN_CLASS_STRING)) {
        element.classList.remove(WINDOW_UP_BTN_CLASS_STRING);
        element.classList.add(WINDOW_DOWN_BTN_CLASS_STRING);
        window_up_down(WINDOW_DOWN);
    } else {
        //do nothing
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


////////////////////////////////////////////////////////////////////////////////////////////
// Car Data content

const CAR_DATA_BASE_URL = "http://" + PI_IP + ":5000/status";

var carData;

function fetchCarData() {
    fetch(CAR_DATA_BASE_URL).then(function (response) {
        response.text().then(function (text) {
            carData = JSON.parse(text);
            //console.log(text);
        });
    });
}

var carDataContainer = document.getElementById("carDataCenterContainer");
function updateCarDataItems() {

    if(carDataContainer.style.display != 'none') {
        fetchCarData();
        setupUpdateTimer();

        document.getElementById("speed").innerText = carData.speed;
        document.getElementById("temp").innerText = carData.temp.toFixed(2);
        document.getElementById("consumption").innerText = carData.consumption.toFixed(2);
        document.getElementById("fuelremains").innerText = carData.remainingFuel.toFixed(2);
    }
    else {
        console.log("ended cardata update");
    }
}

function setupUpdateTimer() {
    var refreshRateMs = 1000;
    mytime = setTimeout("updateCarDataItems()", refreshRateMs);
}