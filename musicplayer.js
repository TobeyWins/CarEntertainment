const PLAY_BTN_CLASS_STRING = "fa-play"
const PAUSE_BTN_CLASS_STRING = "fa-pause"

var isPlaying = false;
var musicPlayer = document.getElementById("audioPlayer");

var titles = [
    "Mousse T. feat. Cleah - Melodie",
    "Ava Max - Sweet but Psycho",
    "Halsey - Graveyard",
    "M-22 - White Lies",
    "Daft Punk - Around The World"
];

var musicSources = [
    "media/MousseT_feat._Cleah_Melodie.mp3",
    "media/Ava Max - Sweet but Psycho.mp3",
    "media/Halsey - Graveyard.mp3",
    "media/M-22 - White Lies.mp3",
    "media/Daft Punk - Around The World.mp3"
];

window.onload = function () {

    for (title of titles) {
        var newElement = document.createElement("li");
        newElement.innerHTML = title;

        document.getElementById("songsWrapper").appendChild(newElement);
    }

    document.getElementById("audioSourceInput").setAttribute("src", musicSources[0]);
    musicPlayer.load();
}

var activeTitle = "";
var activeSource = "";
var activeTitleNumber = 0;
document.getElementById("play_pause").addEventListener("click", function () { togglePlayButton(activeTitle, activeSource) });

function togglePlayButton(title, source, forcePlay) {

    if(title === "" || source === "")
    {
        title = titles[0];
        source = musicSources[0];
    }

    var playPauseClassList = document.getElementById("play_pause_symbol").classList;

    if (forcePlay || playPauseClassList.contains(PLAY_BTN_CLASS_STRING)) {
        playPauseClassList.remove(PLAY_BTN_CLASS_STRING);
        playPauseClassList.add(PAUSE_BTN_CLASS_STRING);

        isPlaying = true;
        document.getElementById("scrollingTitle").innerHTML = title; 
        document.getElementById("audioSourceInput").setAttribute("src", source);
        musicPlayer.load();

        activeTitle = title;
        activeSource = source;
    }
    else {
        playPauseClassList.remove(PAUSE_BTN_CLASS_STRING);
        playPauseClassList.add(PLAY_BTN_CLASS_STRING);

        isPlaying = false;
        document.getElementById("scrollingTitle").innerHTML = ""; 
    }

    if(isPlaying) {
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

    for (title of titles) {
        if(target.innerHTML === title) {
            break;
        }

        titleId++;
    }

    activeTitleNumber = titleId;

    togglePlayButton(titles[titleId], musicSources[titleId], true);
};

musicPlayer.onended = function() {
   
    if(activeTitleNumber < (musicSources.length - 1))
   {
       activeTitleNumber++;

   }
   else{
       activeTitleNumber = 0;
   }

   activeSource = musicSources[activeTitleNumber];
   activeTitle = titles[activeTitleNumber];
   togglePlayButton(activeTitle, activeSource, true);
}; 