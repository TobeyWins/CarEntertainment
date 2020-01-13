const PI_IP = "192.168.0.79"; //"192.168.178.56" // mobs lab 
const ACTION_BASE_URL = "http://" + PI_IP + ":5000/action/";
const WINDOW_BASE_URL = "http://" + PI_IP + ":5000/window/";
const MUSIC_BASE_URL = "http://" + PI_IP + ":5000/music";
const MAP_BASE_URL = "http://" + PI_IP + ":5000/position";
const PHONE_BASE_URL = "http://" + PI_IP + ":5000/phone/";

window.onload = function () {
    showUpdateClock();
    fetchMusic();
    fetchCarData();
    fetchPosition();
}