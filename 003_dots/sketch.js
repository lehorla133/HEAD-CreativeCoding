var w = window.innerWidth;
var h = window.innerHeight;
var counter = 0;
var spacer;

function setup() {
    createCanvas(640, 360).id("canvas1").parent(document.getElementById("divCanvas"));
    $("#canvas1").addClass("border");
    spacer = 70;
    strokeWeight(20);
    noLoop();  // Run once and stop

}


function draw() {
    background(60);
    for (y = 0; y < height; y += spacer) {
        for (x = 0; x < width; x += spacer) {
            stroke(255);
            point(x + spacer / 2, y + spacer / 2);
        }
    }
}