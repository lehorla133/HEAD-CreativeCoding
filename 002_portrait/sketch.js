var w = window.innerWidth;
var h = window.innerHeight;
var counter = 0;

function setup() {
    createCanvas(w, h / 2).id("canvas1").parent(document.getElementById("divCanvas"));
}

function draw() {
    if (mouseIsPressed) {
        fill(0);
    } else {
        fill(255);
    }
    ellipse(mouseX, mouseY, 80, 80);
    check();
}

function check() {

}