/* jslint browser:true */
var id = null;
var firstTime = -1;
var GPS1 = {"latitude" : 43.7707298, "longitude" : -79.5079695};
var GPS2 = {"latitude" : 43.7770194, "longitude" : -79.5012091};
var GPS = {"latitude": 20, "longitude" : 20};
var U1 = {"x" : 6, "y" : 82};
var U2 = {"x" : 92, "y" : 6};
var loc1 = {"latitude": 43.773436, "longitude": -79.5059695, "desc": "Observatory Petrie"};
var loc2 = {"latitude": 43.772218, "longitude": -79.5061200, "desc": "Bergeron Center"};
var loc3 = {"latitude": 43.773224, "longitude": -79.504834, "desc": "Lassonde Building"};
var caches = new Array();
caches[1] = loc1;
caches[2] = loc2;
caches[3] = loc3;
var currentCache = 0;

function updateCache(){
  currentCache = currentCache%3 + 1;
  showCache();
}

function showCache(){
  var cache = document.getElementById("cache");
  var target = document.getElementById("target");
  var map = document.getElementById("map");
  var x = interpolate(GPS1.longitude, GPS2.longitude, U1.x, U2.x, caches[currentCache].longitude);
  var y = interpolate(GPS1.latitude, GPS2.latitude, U1.y, U2.y, caches[currentCache].latitude);

  target.style.left = x - target.offsetWidth*100/map.offsetWidth/2 + "%";
  target.style.top = y - target.offsetHeight*100/map.offsetHeight + "%";
  cache.innerHTML = caches[currentCache].desc;
}

function interpolate(gps1, gps2, u1, u2, gps){
  return u1 + (u2 - u1) * (gps - gps1) / (gps2 - gps1);
}

function togglegps() {
    var button = document.getElementById("togglegps");
    if (navigator.geolocation) {
        if (id === null) {
            id = navigator.geolocation.watchPosition(showPosition, handleError, {enableHighAccuracy : true, timeout: 1000});
            button.innerHTML = "STOP GPS";
            firstTime = -1;
        } else {
            navigator.geolocation.clearWatch(id);
            id = null;
            button.innerHTML = "START GPS";
        }
    } else {
        alert("NO GPS AVAILABLE");
    }
}

function handleError(error) {
    var errorstr = "Really unknown error";
    switch (error.code) {
    case error.PERMISSION_DENIED:
        errorstr = "Permission deined";
        break;
    case error.POSITION_UNAVAILABLE:
        errorstr = "Permission unavailable";
        break;
    case error.TIMEOUT:
        errorstr = "Timeout";
        break;
    case error.UNKNOWN_ERROR:
        error = "Unknown error";
        break;
    }
    alert("GPS error " + error);
}

function showPosition(position) {
    var latitude = document.getElementById("latitude");
    var longitude = document.getElementById("longitude");
    var now = document.getElementById("now");
    var debug = document.getElementById("debug");
    var me = document.getElementById("me");

    latitude.innerHTML = position.coords.latitude;
    longitude.innerHTML = position.coords.longitude;
    GPS.latitude = position.coords.latitude;
    GPS.longitude = position.coords.longitude;

    var v = interpolate(GPS1.longitude, GPS2.longitude, U1.x, U2.x, GPS.longitude) - me.offsetWidth*100/map.offsetWidth/2;
    var w = interpolate(GPS1.latitude, GPS2.latitude, U1.y, U2.y, GPS.latitude) - me.offsetHeight*100/map.offsetHeight;
    var x = interpolate(GPS1.longitude, GPS2.longitude, U1.x, U2.x, GPS.longitude) - me.offsetWidth*100/map.offsetWidth/2;
    var y = interpolate(GPS1.latitude, GPS2.latitude, U1.y, U2.y, GPS.latitude) - me.offsetHeight*100/map.offsetHeight;

    if (firstTime < 0) {
      firstTime = position.timestamp;
    }

    now.innerHTML = position.timestamp - firstTime;
    debug.innerHTML = x + " " + y;
    me.style.left = x + "%";
    me.style.top = y + "%";
}
