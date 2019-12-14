
////////////////////////////////////////////////////////////////////////////////////////////
// Music player content
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
