"use strict";

class Clock {
  constructor() {
    const tick = () => (this.time = new Date());
    tick();

    setInterval(tick.bind(this), 1000);
  }

  // Returns Day
  getDay() {
    return this.time.getDate();
  }

  // Returns Month
  getMonth() {
    return this.time.getMonth();
  }

  // Returs Year
  getYear() {
    return this.time.getFullYear();
  }

  getDate() {
    return {
      Day: this.getDay(),
      Month: this.getMonth(),
      Year: this.getYear(),
    };
  }

  /**
   * Returns the Hour hand degrees
   * @return
   */
  getDegH() {
    const hoursDeg = ((this.getDegM() / 360 + this.time.getHours()) / 12) * 360;
    return hoursDeg;
  }
  /**
   * Returns the Minute hand degrees
   * @return
   */
  getDegM() {
    const minutesDeg =
      ((this.getDegS() / 360 + this.time.getMinutes()) / 60) * 360;
    return minutesDeg;
  }

  /**
   * Returns the Second hand degrees
   * @return
   */
  getDegS() {
    return (this.time.getSeconds() / 60) * 360;
  }

  /**
   * Returns the Digital time string representation (HH:MM:ss|H:MM:ss AM/PM)
   * @param {boolean} [seconds] Whether to display seconds
   * @param {boolean} [is24]    Whether to display as 24h or 12h am/pm
   */
  toDigital(seconds = true, is24 = true) {
    const h = String(this.time.getHours());
    const m = String(this.time.getMinutes()).padStart(2, "0");
    const s = String(this.time.getSeconds()).padStart(2, "0");
    if (is24) return `${h.padStart(2, "0")}:${m}${seconds ? ":" + s : ""}`;
    else
      return `${h - 12}:${m}${seconds ? ":" + s : ""}${h < 12 ? "AM" : "PM"}`;
  }

  /**
   * Return an object with the all degrees for each analog clock hand
   * @param {boolean} [seconds] Wheter to include the seconds
   * @return {{S?: number, H: number, M: number}}
   */
  toAnalog(seconds = true) {
    if (seconds)
      return {
        H: this.getDegH(),
        M: this.getDegM(),
        S: this.getDegS(),
      };
    else
      return {
        H: this.getDegH(),
        M: this.getDegM(),
        S: $("#secondHand").hide(),
      };
  }
}

$(document).ready(function () {
  $("#digital_clock").hide();
  $("#analog_clock").show();

  const clock = new Clock();

  const $date = $("#date");
  const $clockDigital = $("#digital_clock");
  const $clockAnalog = $("#analog_clock");

  const $handH = $("#hourHand");
  const $handM = $("#minuteHand");
  const $handS = $("#secondHand");

  const init = function () {
    const { Day, Month, Year } = clock.getDate();
    $date.text(`${Day}/${Month + 1}/${Year}`);

    const { H, M, S } = clock.toAnalog();
    $handH.css("--rotation", H);
    $handM.css("--rotation", M);
    $handS.css("--rotation", S);

    $clockDigital.children().text(clock.toDigital());
    // $handH.css("--rotation", clock.getDegH())
    // $handM.css("--rotation", clock.getDegM())
    // $handS.css("--rotation", clock.getDegS())
  };
  init();

  setInterval(init, 1000);
});

function changeTime() {
  $("#digital_clock").toggle();
  $("#analog_clock").toggle();
  $("#btnTime").text((_, text) => (text === "Analog" ? "Digital" : "Analog"));
  $("body").toggleClass("digitalClass");
  $("button").toggleClass("digitalBtn");
}
