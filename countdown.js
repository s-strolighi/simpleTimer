
let textElem = document.getElementById("clocktext");
const targetWidth = 0.9;  // Proportion of full screen width
let curFontSize = 20;  // Do not change
let countdownDate = new Date(0, 0, 0, 0, 0, 5, 0);
let timeoutid = 1
let timerIsGoing = false

function defaultCountDownValue() {countdownDate = new Date(0, 0, 0, 0, 0, 5, 0)}

function displayTime(){
    document.body.style.backgroundColor = "black";
    let s = "";
    s += (10 > countdownDate.getHours()   ? "0" : "") + countdownDate.getHours()   + ":";
    s += (10 > countdownDate.getMinutes() ? "0" : "") + countdownDate.getMinutes() + ":";
    s += (10 > countdownDate.getSeconds() ? "0" : "") + countdownDate.getSeconds();
    textElem.textContent = s;

    if(countdownDate.getHours() == 0 && countdownDate.getMinutes() == 0 && countdownDate.getSeconds() == 0){
        stopTimeout()
        stopScreen()
        defaultCountDownValue()
    }
}

function stopScreen(){
    textElem.textContent = "STOP";
    document.body.style.backgroundColor = "red";
}

function startTimeout() {
    updateClock()
    timeoutid = setInterval(updateClock, 1000);
    timerIsGoing = true
}

function stopTimeout() {
    clearInterval(timeoutid)
    timerIsGoing = false
}

function updateClock() {
    countdownDate = new Date(countdownDate.getTime() - 1000)
    displayTime()
}

function updateTextSize() {
    for (let i = 0; i < 3; i++) {  // Iterate for better better convergence
        curFontSize *= targetWidth / (textElem.offsetWidth / textElem.parentNode.offsetWidth);
        textElem.style.fontSize = curFontSize + "pt";
    }
}

function bumpTimer(bumpMilliSeconds){
    let d = new Date(countdownDate.getTime() + bumpMilliSeconds)
    d.setSeconds(Math.floor(d.getSeconds()/10)*10)
    if(new Date(0, 0, 0, 0, 0, 0, 0) >= d){
        d = new Date(0, 0, 0, 0, 0, 10, 0)
    }
        countdownDate = d
    displayTime()
}


// Find the right method, call on correct element fpr fullscreen
function launchFullScreen(element) {
    if(element.requestFullScreen) {
      element.requestFullScreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    }
  }

window.onkeypress = function(event) {
    if (event.keyCode == 13 || event.keyCode == 32 ) { //enter or spacebar
        if(timerIsGoing){
            stopTimeout();
        }
        else{
            startTimeout()
        }
    }
}

window.onkeydown = function(event){
    launchFullScreen(document.documentElement); // the whole page

    if (event.keyCode == 38 && !timerIsGoing) { //arrow up
        bumpTimer(10000); //10 sec
    }

    if (event.keyCode == 40 && !timerIsGoing) { //arrow down
        bumpTimer(-10000) //10 sec;
    }

    if (event.keyCode == 82 ) { //r for reset
        location.reload()
    }

    if (event.keyCode == 70 ) { //f for fullscreen
        document.exitFullscreen()
    }
 }


displayTime()
updateTextSize();
window.addEventListener("resize", updateTextSize);