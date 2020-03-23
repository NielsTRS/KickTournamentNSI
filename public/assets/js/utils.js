function rndmInt(max) {return Math.floor(Math.random() * Math.floor(max));}

function playSound(source, volume){var sound = new Audio(source);sound.volume = volume;sound.play();}

function rndmKey(object) {var keys = Object.keys(object);return object[keys[Math.floor(keys.length * Math.random())]];};

document.addEventListener("contextmenu", function(event){event.preventDefault();}, false);

function getDate(){date = new Date();hours = date.getHours();mint = date.getMinutes();seco = date.getSeconds();return `${hours}h:${mint}m:${seco}s`}

let alucard;
let bloodborn;
let sweepLeft;
let sweepRight;
let parchment;
let dialog;
let display;
let skull;
let pixelFont;
let volume = 0.5;

function loadImages(){
	alucard = loadImage('/public/assets/images/alucard.png')
  bloodborn = loadImage('/public/assets/images/bloodborn.png')
	sweepLeft = loadImage('/public/assets/images/sprite-left.png')
	sweepRight = loadImage('/public/assets/images/sprite-right.png')
	skull = loadImage('/public/assets/images/skull.png')
	parchment = loadImage('/public/assets/images/ui/parchment.png')
	dialog = loadImage('/public/assets/images/ui/dialog.png')
	display = loadImage('/public/assets/images/ui/display.png')
	pixelFont = loadFont('/public/assets/fonts/pixel.ttf')
}

function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (24*10*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}