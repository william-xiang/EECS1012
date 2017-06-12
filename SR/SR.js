var TARGET_SIZE = 10;
var RESCUE_SIZE;
var direction, target, rescue, startTime, intervalID;

function start(){
  var canvas = document.getElementById("searchArea");
  canvas.width = verifyWidth();
  canvas.height = verifyHeight();

  rescue = {x: canvas.width / 2, y: canvas.width / 2};
  target = {x: (canvas.width - TARGET_SIZE) * Math.random(), y: (canvas.height - TARGET_SIZE)*Math.random()};
  direction = {dx: 1, dy: 1};

  RESCUE_SIZE = parseInt(document.getElementById("radar").value);

  startTime = new Date().getTime();

  intervalID = setInterval(simulate, 5);
}

function simulate()
{
  clear();
  drawTarget();
  drawRescue();
  updateProgress();

  if(found())
  {
    clearInterval(intervalID);
  }
  else
  {
    if (xBoundary())
    {
      direction.dx = -direction.dx;
    }
    if (yBoundary())
    {
      direction.dy = -direction.dy;
    }
  rescue.x += direction.dx;
  rescue.y += direction.dy;
  }
}

function clear(){
  var canvas = document.getElementById("searchArea");
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawTarget()
{
  var canvas = document.getElementById("searchArea");
  var context = canvas.getContext("2d");
  context.beginPath();
  context.lineWidth = 4;
  context.strokeStyle = "red";
  context.rect(target.x, target.y, TARGET_SIZE, TARGET_SIZE);
  context.stroke();
}

function drawRescue()
{
  var canvas = document.getElementById("searchArea");
  var context = canvas.getContext("2d");
  context.beginPath();
  context.lineWidth = "4";
  context.fillStyle = "blue";
  context.arc(rescue.x, rescue.y, RESCUE_SIZE, 0, 2*Math.PI);
  context.fill();
}

function updateProgress(){
  var time = document.getElementById("elapsed");
  var dis = document.getElementById("distance");
  var currentTime = new Date().getTime();

  time.innerHTML = parseInt((currentTime - startTime)/1000);

  var dist1 = Math.sqrt(Math.pow((rescue.x-target.x),2) + Math.pow((rescue.y-target.y),2)) - RESCUE_SIZE;
  var dist2 = Math.sqrt(Math.pow((rescue.x-TARGET_SIZE-target.x),2) + Math.pow((rescue.y-target.y),2)) - RESCUE_SIZE;
  var dist3 = Math.sqrt(Math.pow((rescue.x-target.x),2) + Math.pow((rescue.y-TARGET_SIZE-target.y),2)) - RESCUE_SIZE +1;
  var dist4 = Math.sqrt(Math.pow((rescue.x-TARGET_SIZE-target.x),2) + Math.pow((rescue.y-TARGET_SIZE-target.y),2)) - RESCUE_SIZE +1;

  var distance = [dist1, dist2, dist3, dist4];
  distance.sort();
  dis.innerHTML = parseInt(distance[0]);
}

function xBoundary(){
  var canvas = document.getElementById("searchArea");
  if (rescue.x + RESCUE_SIZE >= canvas.width || rescue.x - RESCUE_SIZE <= 0)
  {
    return true;
  }
  return false;
}

function yBoundary(){
  var canvas = document.getElementById("searchArea");
  if (rescue.y + RESCUE_SIZE >= canvas.height || rescue.y - RESCUE_SIZE <= 0)
  {
    return true;
  }
  return false;
}

function verifyWidth(){
  var widthDialog = window.prompt("Search area width:", "450");

  if(widthDialog != null && widthDialog != "" && widthDialog <= 450 && widthDialog > 0){
    return widthDialog;
  }
  else{
    alert("Please input the correct width!");
    return verifyWidth();
  }
}

function verifyHeight(){
  var heightDialog = window.prompt("Search area height:", "300");

  if(heightDialog == null || heightDialog == "" || heightDialog > 300){
    alert("Please input the height!");
    return verifyHeight();
  }
  else{
    return heightDialog;
  }
}

function found(){
  if(rescue.x >= target.x && rescue.x <= target.x + TARGET_SIZE){
    if(rescue.y <= target.y + TARGET_SIZE/2){
      if(rescue.y + RESCUE_SIZE >= target.y){return true;}
    }
    else{
      if(rescue.y - RESCUE_SIZE <= target.y + TARGET_SIZE){return true;}
    }
  }

  else if(rescue.y >= target.y && rescue.y <= target.y + TARGET_SIZE){
    if(rescue.x <= target.x + TARGET_SIZE/2){
      if(rescue.x + RESCUE_SIZE >= target.x){return true;}
    }
    else{
      if(rescue.x - RESCUE_SIZE <= target.x + TARGET_SIZE){return true;}
    }
  }

  else{
    if(Math.sqrt(Math.pow((rescue.x-target.x),2) +
        Math.pow((rescue.y-target.y),2)) <= RESCUE_SIZE ||
        Math.sqrt(Math.pow((rescue.x-TARGET_SIZE-target.x),2) +
        Math.pow((rescue.y-target.y),2)) <= RESCUE_SIZE ||
        Math.sqrt(Math.pow((rescue.x-target.x),2) +
        Math.pow((rescue.y-TARGET_SIZE-target.y),2)) <= RESCUE_SIZE ||
        Math.sqrt(Math.pow((rescue.x-TARGET_SIZE-target.x),2) +
        Math.pow((rescue.y-TARGET_SIZE-target.y),2)) <= RESCUE_SIZE)
    {
      return true;
    }
  }
  return false;
}
