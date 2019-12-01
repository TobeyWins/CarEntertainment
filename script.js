var activeItem;

function setVisibleById(idToShow) {
    document.getElementById(idToShow).style.display='block';
    document.getElementById("returnButton").style.display='block';
    
    activeItem = idToShow;
}

function setHiddenById() {
    document.getElementById(activeItem).style.display='none';
    document.getElementById("returnButton").style.display='none';
}

document.getElementById("B1").addEventListener("click", function () { setVisibleById("v1") });
document.getElementById("B2").addEventListener("click", function () { setVisibleById("v2") });
document.getElementById("B3").addEventListener("click", function () { setVisibleById("v3") });
document.getElementById("B4").addEventListener("click", function () { setVisibleById("v4") });
document.getElementById("B5").addEventListener("click", function () { setVisibleById("v5") });
document.getElementById("B6").addEventListener("click", function () { setVisibleById("v6") });

document.getElementById("returnButton").addEventListener("click", function () { setHiddenById() });
