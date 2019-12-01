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
    
    var gridButtons = document.getElementsByClassName("gridButton");
    for (button of gridButtons) {
        button.style.display='none';    
    }

    var gridText = document.getElementsByClassName("gridText");
    for (text of gridText) {
        text.style.display='none';    
    }
}

function showGridButtons() {
    
    var gridButtons = document.getElementsByClassName("gridButton");
    for (button of gridButtons) {
        button.style.display='block';    
    }

    var gridText = document.getElementsByClassName("gridText");
    for (text of gridText) {
        text.style.display='block';    
    }
}

document.getElementById("B1").addEventListener("click", function () { displaySelectedElement("v1") });
document.getElementById("B2").addEventListener("click", function () { displaySelectedElement("v2") });
document.getElementById("B3").addEventListener("click", function () { displaySelectedElement("v3") });
document.getElementById("B4").addEventListener("click", function () { displaySelectedElement("v4") });
document.getElementById("B5").addEventListener("click", function () { displaySelectedElement("v5") });
document.getElementById("B6").addEventListener("click", function () { displaySelectedElement("v6") });

document.getElementById("returnButton").addEventListener("click", function () { hideActiveElement() });
