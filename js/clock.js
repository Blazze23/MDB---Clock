setInterval(getAnalogTime, 1000);

$("#digital_clock").hide();
$("#analog_clock").show();

const hour   = $("#hourHand");
const minute = $("#minuteHand");
const second = $("#secondHand");

function getAnalogTime() {
  let d    = new Date();
  let day  = d.getDate();
  let date = d.getMonth();
  let year = d.getFullYear();
  $("#date").html(`${day}/${date + 1}/${year}`);
  let secondsRatio = d.getSeconds() / 60;
  let minutesRatio = (secondsRatio + d.getMinutes()) / 60;
  let hoursRatio   = (minutesRatio + d.getHours()) / 12;
  setRotation(hour, hoursRatio);
  setRotation(minute, minutesRatio);
  setRotation(second, secondsRatio);
}

function setRotation(element, rotationRatio) {
  element.css("--rotation", rotationRatio * 360);
}

function getDigitalTime() {
  let d       = new Date();
  let hours   = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  let day     = d.getDate();
  let date    = d.getMonth();
  let year    = d.getFullYear();
  hours       = actualTime(hours);
  minutes     = actualTime(minutes);
  seconds     = actualTime(seconds);
  let time    = hours + ":" + minutes + ":" + seconds;
  setTimeout(function () {
    getDigitalTime();
  }, 1000);
  $("#time").html(time);
  $("#date").html(`${day}/${date + 1}/${year}`);
}

function actualTime(zero) {
  if(zero < 10) {
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

class Clock {

  /**
   * Returns the Hour hand degrees
   * @return
   */
  getDegH() {
    return 0;
  }

  /**
   * Returns the Minute hand degrees
   * @return
   */
  getDegM() {
    return 0;
  }

  /**
   * Returns the Second hand degrees
   * @return
   */
  getDegS() {
    return 0;
  }


  /**
   * Returns the Digital time string representation (HH:MM:ss|H:MM:ss AM/PM)
   * @param {boolean} [seconds] Whether to display seconds
   * @param {boolean} [is24]    Whether to display as 24h or 12h am/pm
   */
  toDigital(seconds = true, is24 = true) {
    return "";
  }

  /**
   * Return an object with the all degrees for each analog clock hand
   * @param {boolean} [seconds] Wheter to include the seconds
   * @return {{S?: number, H: number, M: number}}
   */
  toAnalog(seconds = true) {
    return {
      H: 0,
      M: 0,
      S: 0,
    }
  }

}

$(document).ready(function () {
  const clock = new Clock();

  const $clockDigital = $("#digital_clock");
  const $clockAnalog  = $("#analog_clock");

  const $handH = $("#hourHand");
  const $handM = $("#minuteHand");
  const $handS = $("#secondHand");

  setInterval(function () {
    const {H, M, S} = clock.toAnalog();
    $handH.css("--rotation", H);
    $handM.css("--rotation", M);
    $handS.css("--rotation", S);

    $clockDigital.text(clock.toDigital());
    // $handH.css("--rotation", clock.getDegH())
    // $handM.css("--rotation", clock.getDegM())
    // $handS.css("--rotation", clock.getDegS())
  }, 1000);

})

