"use strict";
var timeSecond = 3;
var timeRest = 4;
var countPomodoro = 0;
var stopFlag = false;
var restFlag = false;
var interval;
var wav = 'audio/sound.mp3';
var audio = new Audio(wav);
var workTime = document.querySelector('.js-workTime');
var restTime = document.querySelector('.js-restTime');
var min = document.querySelector('.clock-panel__min');
var sec = document.querySelector('.clock-panel__sec');
var btnSettings = document.querySelector('.js-settings');
var btnStart = document.querySelector('.control__btn-start ');
var btnReset = document.querySelector('.control__btn-reset');
var goalWrapper = document.querySelector('.goals');
var goalCurrent = document.querySelector('.goals__current');
var settingsPanel = document.querySelector('.setting-panel');
var wrapper = document.querySelector('.wrapper');
var settingList = document.querySelector('.setting__list');
var btnMinus = document.querySelector('.setting__btn--minus');
setTimer();
refreshTimer();
updateGoal();
changeTimer();

settingList.addEventListener('click', function (evt) {
  var target = evt.target;
  var input = target.parentNode.querySelector('.setting__input');
  if (target.classList.contains('setting__btn--plus') && input.value >= 0) {
    input.value++
  } else if (target.classList.contains('setting__btn--minus') && input.value > 0) {
    input.value--;
  }
});


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
  wrapper.classList.remove('wrapper--blue');
  stopTimer(interval);
  refreshTimer();
  changeTimer();
});

var stopTimer = function (timerName) {
  stopFlag = false;
  clearInterval(timerName);
};

function updateGoal() {
  
  if (countPomodoro >= 12) {
    goalWrapper.innerHTML = 'Perfectly worked today!';
  } else {
    goalCurrent.innerHTML = countPomodoro;
  }
}

function refreshTimer() {
  // timeSecond = workTime.value * 60;
  // timeRest = restTime.value * 60;
  timeSecond = 3;
  timeRest = 4;
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
    if (!restFlag) {
      audio.play();
      countPomodoro++;
      localStorage.setItem('pomodoro', countPomodoro);
      updateGoal();
      timeSecond = timeRest;
      wrapper.classList.add('wrapper--blue');
      restFlag = true;
    } else {
      wrapper.classList.remove('wrapper--blue');
      restFlag = false;
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

var saveStats = function () {
  
};

function setTimer() {
  var day = localStorage.getItem('time'),
      dayNow = new Date().getDate();
  localStorage.setItem('time', new Date().getDate());
  if (day) {
    if (dayNow != day) {
      localStorage.setItem('pomodoro', 0);
    } else {
      countPomodoro = localStorage.getItem('pomodoro') ? localStorage.getItem('pomodoro') : 0;
    }
  } else {
    localStorage.setItem('time', new Date().getDate());
  }
}