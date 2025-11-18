
var TIME_LIMIT;
var warningThreshold,alertThreshold;
// Initially, no time has passed, but this will count up
// and subtract from the TIME_LIMIT
var timePassed = 0;
var timeLeft = TIME_LIMIT;
var timerInterval = null;

var start;
var pause=false;

function getInputTime() {
  const min = parseInt(document.getElementById("minutes").value) || 0;
  const sec = parseInt(document.getElementById("seconds").value) || 0;

  TIME_LIMIT = min * 60 + sec;
  // Warning occurs at 10s
  warningThreshold = 0.5*TIME_LIMIT;
  // Alert occurs at 5s
  alertThreshold = 0.25*TIME_LIMIT;
}

function formatTime(time) {
  // The largest round integer less than or equal to the result of time divided being by 60.
  const minutes = Math.floor(time / 60);
  
  // Seconds are the remainder of the time divided by 60 (modulus operator)
  let seconds = time % 60;
  
  // If the value of seconds is less than 10, then display seconds with a leading zero
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // The output in MM:SS format
  return `${minutes}:${seconds}`;
}

// Divides time left by the defined time limit.
function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}
    
// Update the dasharray value as time passes, starting with 283
function setCircleDashArray() {
    const circleDasharray = `${(calculateTimeFraction() * 283).toFixed(0)} 283`;
    document.getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
    setRemainingPathColor(timeLeft)
}

function startTimer(button) {
  if (timeLeft <= 0 || pause === false && timePassed === 0) {
    TIME_LIMIT = getInputTime();
    timePassed = 0;
    timeLeft = TIME_LIMIT;
  }

  // Defensive: stop any existing timer
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  getInputTime();

  const startBtn = button;
  const pauseBtn = document.getElementById("pause");

  startBtn.disabled = true;
  pauseBtn.disabled = false;
  pause = false;

  timerInterval = setInterval(() => {

   

    if (pause) {
      clearInterval(timerInterval);
      return;
    }

    timePassed++;
    timeLeft = TIME_LIMIT - timePassed;

    if (timeLeft == 0) {
      clearInterval(timerInterval);
      document.getElementById("base-timer-label").innerHTML = "0:00";
      setCircleDashArray();
      return;
    }

    document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
    setCircleDashArray();

  }, 1000);
}

function pauseTimer(button) {
  pause = true;
  button.disabled = true;

  const startBtn = document.getElementById("start");
  startBtn.disabled = false;
}

function resetTimer(button) {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  timePassed = 0;
  getInputTime();
  timeLeft = TIME_LIMIT;
  document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
  setCircleDashArray();
  const startBtn = document.getElementById("start");
  const pauseBtn = document.getElementById("pause");

  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

const colorCodes = {
  info: {
    color: "white"
  },
  warning: {
    color: "light-red",
    threshold: warningThreshold
  },
  alert: {
    color: "red",
    threshold: alertThreshold
  }
};

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = colorCodes;
  
  // If the remaining time is less than or equal to 5, remove the "warning" class and apply the "alert" class.
  if (timeLeft <= alertThreshold) {
    document.getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document.getElementById("base-timer-path-remaining")
      .classList.add(alert.color);

  // If the remaining time is less than or equal to 10, remove the base color and apply the "warning" class.
  } else if (timeLeft <= warningThreshold) {
    document.getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document.getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  } else {
    document.getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document.getElementById("base-timer-path-remaining")
      .classList.remove(alert.color);
    document.getElementById("base-timer-path-remaining")
      .classList.add(info.color);
  }
}


