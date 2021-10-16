setInterval(getAnalogTime, 1000);

$("#digital_clock").hide();
$("#analog_clock").show();

const hour = $("#hourHand");
const minute = $("#minuteHand");
const second = $("#secondHand");

function getAnalogTime() {
  let d = new Date();
  let day = d.getDate();
  let date = d.getMonth();
  let year = d.getFullYear();
  $("#date").html(`${day}/${date + 1}/${year}`);
  let secondsRatio = d.getSeconds() / 60;
  let minutesRatio = (secondsRatio + d.getMinutes()) / 60;
  let hoursRatio = (minutesRatio + d.getHours()) / 12;
  setRotation(hour, hoursRatio);
  setRotation(minute, minutesRatio);
  setRotation(second, secondsRatio);
}

function setRotation(element, rotationRatio) {
  element.css("--rotation", rotationRatio * 360);
}

function getDigitalTime() {
  let d = new Date();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  let day = d.getDate();
  let date = d.getMonth();
  let year = d.getFullYear();
  hours = actualTime(hours);
  minutes = actualTime(minutes);
  seconds = actualTime(seconds);
  let time = hours + ":" + minutes + ":" + seconds;
  setTimeout(function () {
    getDigitalTime();
  }, 1000);
  $("#time").html(time);
  $("#date").html(`${day}/${date + 1}/${year}`);
}

function actualTime(zero) {
  if (zero < 10) {
    return "0" + zero;
  } else {
    return zero;
  }
}

function changeTime() {
  $("#digital_clock").toggle();
  $("#analog_clock").toggle();
  $("#btnTime").text(function (i, text) {
    console.log(i, text);
    return text === "Digital" ? "Analog" : "Digital";
  });
  $("body").toggleClass("digitalClass");
  $("button").toggleClass("digitalBtn");
}
