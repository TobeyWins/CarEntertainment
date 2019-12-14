const PI_IP = "192.168.178.56" // mobs lab "192.168.0.79"
const ACTION_BASE_URL = "http://" + PI_IP + ":5000/action/";
const WINDOW_BASE_URL = "http://" + PI_IP + ":5000/window/";
const MUSIC_BASE_URL = "http://" + PI_IP + ":5000/music";

window.onload = function () {
    showUpdateClock();
    fetchMusic();
    fetchCarData();
}