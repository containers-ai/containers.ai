"use strict";

function applyStyleSheet(title) {
  var i, a;
  for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
    if (
      a.getAttribute("rel").indexOf("style") !== -1 &&
      a.getAttribute("title")
    ) {
      a.disabled = true;
      if (a.getAttribute("title") === title) {
        a.disabled = false;
      }
    }
  }

  // set the active theme menu item

  var item = document.getElementById("light-theme-item");
  if (item !== null) {
    if (title === "light") {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  }

  item = document.getElementById("dark-theme-item");
  if (item !== null) {
    if (title === "dark") {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  }
}

function getPreferredStyleSheet() {
  var i, a;
  for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
    if (
      a.getAttribute("rel").indexOf("style") !== -1 &&
      a.getAttribute("rel").indexOf("alt") === -1 &&
      a.getAttribute("title")
    ) {
      return a.getAttribute("title");
    }
  }
  return null;
}

function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

function setActiveStyleSheet(title) {
  applyStyleSheet(title);
  createCookie("style", title);
}

function loadActiveStyleSheet() {
  var cookie = readCookie("style");
  if (cookie === null) {
    applyStyleSheet(getPreferredStyleSheet());
  } else {
    applyStyleSheet(cookie);
  }
}

window.onload = function(e) {
  loadActiveStyleSheet();
};

loadActiveStyleSheet();
