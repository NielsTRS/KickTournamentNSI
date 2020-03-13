function rndmInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function playSound(source, volume) {
    var sound = new Audio(source);
    sound.volume = volume;
    sound.play();
}

function rndmKey(object) {
    var keys = Object.keys(object);
    return object[keys[Math.floor(keys.length * Math.random())]];
}

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
}, false);

function getDate() {
    date = new Date();
    hours = date.getHours();
    mint = date.getMinutes();
    seco = date.getSeconds();
    return `${hours}h:${mint}m:${seco}s`
}

let img;
let sweepLeft;
let sweepRight;
let parchment;
let dialog;
let display;
let skull;
let pixelFont;
let volume = 1.0;

function loadImages() {
    img = loadImage('public/assets/images/alucard.png');
    sweepLeft = loadImage('public/assets/images/sprite-left.png');
    sweepRight = loadImage('public/assets/images/sprite-right.png');
    skull = loadImage('public/assets/images/skull.png');
    parchment = loadImage('public/assets/images/ui/parchment.png');
    dialog = loadImage('public/assets/images/ui/dialog.png');
    display = loadImage('public/assets/images/ui/display.png');
    pixelFont = loadFont('public/assets/fonts/pixel.ttf')
}