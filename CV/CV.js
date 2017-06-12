function start() /*when the page is loaded, implement this function*/
{
  var now = document.getElementById("now");
  now.innerHTML = "Last updated: " + Date();
}

var image_tracker = "pic1";

function swap(){
  var picture = document.getElementById("picture");

  if(image_tracker == "pic1")
  {
    picture.src = "pic2.jpg"
    image_tracker = "pic2";
  }
  else{
    picture.src = "pic1.jpg";
    image_tracker = "pic1"
  }
}
