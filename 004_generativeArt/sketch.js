var w = window.innerWidth;
var h = window.innerHeight;
var mappedX;
var mappedY;
var spacer;

function setup() {
    createCanvas(w, h);
    background(255);
    spacer = 70;
    frameRate(2);

}


function draw() {
    mappedX = map(mouseX, 0, width, 0, 255);
    mappedY = map(mouseY, 0, height, 0, 255);
    stroke(mappedX);
    fill(mappedX, mappedY, mappedX);
    console.log("hello");
    rect(mouseX, mouseY, mappedX, mappedY);
}

