"use strict";
var timeSecond = 10;
var stopFlag = false;
var interval;
var min = document.querySelector('.clock-panel__min');
var sec = document.querySelector('.clock-panel__sec');
var btnStart = document.querySelector('.control__btn-start ');
var btnReset = document.querySelector('.control__btn-reset');
changeTimer();
btnStart.addEventListener('click', function () {
  if (!stopFlag) {
    startTimer();
    stopFlag = true;
  } else {
    stopTimer(interval);
  }
});

btnReset.addEventListener('click', function () {
  stopTimer(interval);
  timeSecond = 10;
  changeTimer();
});

var stopTimer = function (timerName) {
  stopFlag = false;
  clearInterval(timerName);
};

function changeTimer() {
  if (Math.floor(timeSecond / 60) < 10) {
    min.innerHTML = '0' + Math.floor(timeSecond / 60);
  } else {
    min.innerHTML = Math.floor(timeSecond / 60);
  }
  if (Math.floor(timeSecond % 60) < 10) {
    sec.innerHTML = '0' + Math.floor(timeSecond % 60);
  } else {
    sec.innerHTML = Math.floor(timeSecond % 60);
  }
  if (timeSecond === 0) {
    stopTimer(interval);
    timeSecond = 10;
    alert('пора отдохнуть');
  }
}
  
var startTimer = function () {
  window.interval = window.setInterval(function () {
    timeSecond--;
    changeTimer();
    console.log(timeSecond);
  }, 1000);
  
};


