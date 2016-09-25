"use strict";
var timeSecond = 0;
var timeRest = 0;
var countPomodoro = 0;
var stopFlag = false;
var restFlag = false;
var interval;
var workTime = document.querySelector('.js-workTime');
var restTime = document.querySelector('.js-restTime');
var min = document.querySelector('.clock-panel__min');
var sec = document.querySelector('.clock-panel__sec');
var btnSettings = document.querySelector('.js-settings');
var btnStart = document.querySelector('.control__btn-start ');
var btnReset = document.querySelector('.control__btn-reset');
var goalWrapper  = document.querySelector('.goals');
var goalCurrent = document.querySelector('.goals__current');
var settingsPanel = document.querySelector('.setting-panel');
var wrapper = document.querySelector('.wrapper');
refreshTimer();
updateGoal();
changeTimer();


btnSettings.addEventListener('click', function () {
  settingsPanel.classList.toggle('open');
});

btnStart.addEventListener('click', function () {
  btnStart.classList.toggle('control__btn-pause');
  if (!stopFlag) {
    startTimer();
    stopFlag = true;
  } else {
    stopTimer(interval);
  }
});

btnReset.addEventListener('click', function () {
  btnStart.classList.remove('control__btn-pause');
  stopTimer(interval);
  refreshTimer();
  changeTimer();
});

var stopTimer = function (timerName) {
  stopFlag = false;
  clearInterval(timerName);
};

function updateGoal() {
  if(countPomodoro >= 12){
    goalWrapper.innerHTML = 'Отлично поработали сегодня!';
  }else {
    goalCurrent.innerHTML = countPomodoro;
  }
}

function  refreshTimer() {
  timeSecond = workTime.value*60;
  timeRest = restTime.value * 60;
}
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
    if(!restFlag){
      countPomodoro++;
      updateGoal();
      timeSecond = timeRest;
      wrapper.classList.add('wrapper--blue');
      restFlag = true;
    } else {
      wrapper.classList.remove('wrapper--blue');
      refreshTimer();
    }
    stopTimer(interval);
    startTimer();
    stopFlag = true;
  }
}
  
var startTimer = function () {
  window.interval = window.setInterval(function () {
    timeSecond--;
    changeTimer();
  }, 1000);
};

