function init() {
  if(window.DeviceOrientationEvent){
    document.getElementById("text").innerHTML = "Supports orientation events";
    window.addEventListener("deviceorientation", orientationCallback, true);
  }
  else {
    document.getElementById("text").innerHTML = "No orientation event support";
  }
}

function orientationCallback(eventData) {
  document.getElementById("text").innerHTML = "Tilt: " + eventData.gamma + "<br />" + "Pitch: " + eventData.beta;

  var tilt = eventData.gamma, pitch = eventData.beta;

  var c = document.getElementById("ball");
  var x = (window.innerWidth - c.offsetWidth) / 2;
  var y = (window.innerHeight - c.offsetHeight) / 2;

  if(tilt < -90){
    tilt = -90;
  }
  else if(tilt > 90){
    tilt = 90;
  }

  if(pitch < -90){
    pitch = -90;
  }
  else if(pitch > 90){
    pitch = 90;
  }

  var dx = x * tilt / 90;
  var dy = y * pitch / 90;

  c.style.left = x + dx;
  c.style.top = y + dy;

  var d = document.getElementById("center");
  var x0 = (window.innerWidth - d.offsetWidth) / 2;
  var y0 = (window.innerHeight - d.offsetHeight) / 2;

  d.style.left = x0;
  d.style.top = y0;
}

alert("javascript loaded");
window.onload = init;
