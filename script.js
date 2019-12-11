//header clock element and functions
//load clock when content is loaded
window.onload = function () {
    showUpdateClock();
    fetchMusic();
    fetchCarData();
}

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

document.getElementById("carDataButton").addEventListener("click", function () { displaySelectedElement("carDataCenterContainer"); updateCarDataItems(); });
document.getElementById("musicButton").addEventListener("click", function () { displaySelectedElement("musicPlayerContainer") });
document.getElementById("phoneButton").addEventListener("click", function () { displaySelectedElement("phoneCenterContainer") });
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
const PI_IP = "192.168.178.56" // mobs lab "192.168.0.79"
const ACTION_BASE_URL = "http://" + PI_IP + ":5000/action/";
const WINDOW_BASE_URL = "http://" + PI_IP + ":5000/window/";

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
// Music player content
const MUSIC_BASE_URL = "http://" + PI_IP + ":5000/music";

const PLAY_BTN_CLASS_STRING = "fa-play"
const PAUSE_BTN_CLASS_STRING = "fa-pause"
const TRACK_IS_PLAYING_CLASS = "trackIsPlaying"
const MUSIC_IS_PLAYING_CLASS = "isPlaying"

var emmittedByButton = false;

var isPlaying = false;
var musicPlayer = document.getElementById("audioPlayer");
musicPlayer.ontimeupdate = function() { updateProgressbar(); };

var tracks;
var activeTrack = null;

function fetchMusic() {
    fetch(MUSIC_BASE_URL).then(function (response) {
        response.text().then(function (text) {
            tracks = JSON.parse(text);
            console.log(text);
            createMusicPlayerItems();
        });
    });
}

function createMusicPlayerItems() {
    for (track of tracks) {
        var newElement = document.createElement("li");
        newElement.setAttribute("class", "");
        newElement.innerHTML = track.artist + " - " + track.title;

        document.getElementById("songsWrapper").appendChild(newElement);
    }

    if(activeTrack == null) {
        activeTrack = tracks[0];
        activeTitleNumber = 0;

        var listElements = document.getElementById("songsWrapper").childNodes;
        listElements[0].classList.add(TRACK_IS_PLAYING_CLASS);
    }

    var newElement = document.createElement("source");
    newElement.setAttribute("id", "audioSourceInput");
    newElement.setAttribute("type", "audio/mp3");
    newElement.setAttribute("src", tracks[0].path);

    document.getElementById("audioPlayer").appendChild(newElement);
    musicPlayer.load();
}

document.getElementById("backward").addEventListener("click", function () {

    var listElements = document.getElementById("songsWrapper").childNodes;

    if (listElements[activeTitleNumber].classList.contains(TRACK_IS_PLAYING_CLASS)) {
        listElements[activeTitleNumber].classList.remove(TRACK_IS_PLAYING_CLASS)

        if ((activeTitleNumber - 1) > 0) {
            activeTitleNumber--;
        }
        else {
            activeTitleNumber = 0;
        }
    } else {
        console.warn("mismatching active title number detected, resetting");
        activeTitleNumber = 0;
        activeTrack = tracks[0];
    }

    activeTrack = tracks[activeTitleNumber];

    updateActiveTrackListElement()
    playTrack(activeTrack, true)
});


document.getElementById("forward").addEventListener("click", function () {
    var listElements = document.getElementById("songsWrapper").childNodes;

    if (listElements[activeTitleNumber].classList.contains(TRACK_IS_PLAYING_CLASS)) {
        listElements[activeTitleNumber].classList.remove(TRACK_IS_PLAYING_CLASS)

        if ((activeTitleNumber + 1) < listElements.length) {
            activeTitleNumber++;
        }
        else {
            activeTitleNumber = (listElements.length - 1);
        }
    } else {
        console.warn("mismatching active title number detected, resetting");
        activeTitleNumber = 0;
        activeTrack = tracks[0];
    }

    activeTrack = tracks[activeTitleNumber];

    emmittedByButton = true;

    updateActiveTrackListElement()
    playTrack(activeTrack, true)
});


document.getElementById("play_pause").addEventListener("click", function () { playTrack(activeTrack, false) });
function playTrack(track, forcePlay) {

    if(track == null) {
        track = tracks[0];

        var listElements = document.getElementById("songsWrapper").childNodes;
        listElements[0].classList.add(TRACK_IS_PLAYING_CLASS);
    }

    var playPauseClassList = document.getElementById("play_pause_symbol").classList;

    if (forcePlay || playPauseClassList.contains(PLAY_BTN_CLASS_STRING)) {
        playPauseClassList.remove(PLAY_BTN_CLASS_STRING);
        playPauseClassList.add(PAUSE_BTN_CLASS_STRING);
        playPauseClassList.add(MUSIC_IS_PLAYING_CLASS);

        document.getElementById("scrollingTitle").innerHTML = track.artist + " - " + track.title; 
        
        //just reload if track is not already loaded
        if(document.getElementById("audioSourceInput").getAttribute("src") != track.path) {
            document.getElementById("audioSourceInput").setAttribute("src", track.path);
            musicPlayer.load();
        }
    }
    else {
        playPauseClassList.remove(PAUSE_BTN_CLASS_STRING);
        playPauseClassList.add(PLAY_BTN_CLASS_STRING);
        playPauseClassList.remove(MUSIC_IS_PLAYING_CLASS);

        document.getElementById("scrollingTitle").innerHTML = ""; 
    }

    if(playPauseClassList.contains(MUSIC_IS_PLAYING_CLASS)) {
        musicPlayer.play();
    }
    else {
        musicPlayer.pause();
    }
}


var ulWrapper = document.getElementById('songsWrapper');
//not compatible with IE
ulWrapper.onclick = function(event) {
    var target = event.target;

    let titleId = 0;

    for (track of tracks) {
        if(target.innerHTML === (track.artist + " - " + track.title)) {
            break;
        }

        titleId++;
    }

    activeTitleNumber = titleId;
    activeTrack = tracks[activeTitleNumber];
    updateActiveTrackListElement();
    playTrack(activeTrack, true);
};

musicPlayer.onended = function () {

    if(activeTitleNumber == null) {
        activeTitleNumber = 0;
    }
    
    if (activeTitleNumber < (tracks.length - 1)) {
        activeTitleNumber++;
    }
    else {
        activeTitleNumber = 0;
    }
    
    activeTrack = tracks[activeTitleNumber];

    updateActiveTrackListElement();
    playTrack(activeTrack, true);
}; 

function updateActiveTrackListElement() {
    var listElements = document.getElementById("songsWrapper").childNodes;
    
    for(let i = 0; i < listElements.length; i++)
    {
        if(listElements[i].classList.contains(TRACK_IS_PLAYING_CLASS)) {
            listElements[i].classList.remove(TRACK_IS_PLAYING_CLASS);
        }
    }
    listElements[activeTitleNumber].classList.add(TRACK_IS_PLAYING_CLASS);
}

document.getElementById("progressBar").addEventListener("click", function (event) {
    var x = event.pageX - this.offsetLeft, 
        y = event.pageY - this.offsetTop, 
        clickedValue = x * this.max / this.offsetWidth;

        musicPlayer.currentTime = ((musicPlayer.duration / 100) * clickedValue);
    });

function updateProgressbar() {

    var progressValue = ((musicPlayer.currentTime / musicPlayer.duration)  * 100);

    if(isNaN(progressValue)) {
        progressValue = 0;
    }

    document.getElementById("progressBar").setAttribute("value", progressValue.toString());
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