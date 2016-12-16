/*
 -------------------------------------
 YANN LONGCHAMP
 HEAD - GENEVA
 INTRODUCTION AMPLITUDE P5 SOUND
 -------------------------------------
 - chargement d'un son audio
 - analayse des frequences, stockage dans un tableau
 - création de trois cubes en WEBGL réagissant à différente fréquence (bass, mid, high)
 */

var w = window.innerWidth;
var h = window.innerHeight;
var song;
var fft;

var binCount = 1024;
var capture;

var particles = new Array(binCount);

function preload() {
    song = loadSound("testwebgl.wav");
}

function setup() {
    createCanvas(w, h).id("canvas1").parent(document.getElementById("divCanvas"));
    //$("#canvas1").addClass("border");
    var smoothing = 0.6;
    fft = new p5.FFT(smoothing, binCount);
    fft.setInput(song);
    song.setVolume(0.7);

    // instantiate the particles.
    for (var i = 0; i < particles.length; i++) {
        var x = map(i, 0, binCount, 0, width * 2);
        var y = random(0, height);
        var position = createVector(x, y);
        particles[i] = new Particle(position);
    }

}


function draw() {
    background(250);
    //image(capture, 0, 0);
    //filter('INVERT');
    song.setVolume(0.7);
    var spectrum = fft.analyze(binCount);


    for (var i = 0; i < binCount; i++) {
        var thisLevel = map(spectrum[i], 0, 255, 0, 1);


        particles[i].update(thisLevel);
        // draw the particle
        particles[i].draw();



        // update x position (in case we change the bin count while live coding)
        particles[i].position.x = map(i, 0, binCount, 0, width * 2);
    }
}


var Particle = function (position) {
    this.position = position;
    this.scale = random(0, 1);
    this.speed = createVector(0, random(0, 10));
    this.color = [random(0, 255), random(0, 255), random(0, 255)];
}

var theyExpand = 1;

// use FFT bin level to change speed and diameter
Particle.prototype.update = function (someLevel) {
    this.position.y += this.speed.y / (someLevel * 2);
    if (this.position.y > height) {
        this.position.y = 0;
    }
    this.diameter = map(someLevel, 0, 1, 0, 100) * this.scale * theyExpand;

}

Particle.prototype.draw = function () {
    fill(this.color);
    ellipse(
        this.position.x, this.position.y,
        this.diameter, this.diameter
    );
}

function mouseClicked() {
    song.play();
}



