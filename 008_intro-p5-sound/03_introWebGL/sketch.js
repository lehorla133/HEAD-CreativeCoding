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


function preload() {
    song = loadSound("testwebgl.wav");
}

function setup() {
    createCanvas(w, h, WEBGL).id("canvas1").parent(document.getElementById("divCanvas"));
    //$("#canvas1").addClass("border");
    var smoothing = 0.6;
    fft = new p5.FFT(smoothing, binCount);
    fft.setInput(song);
    song.setVolume(0.7);


}


function draw() {
    song.setVolume(0.3);
    var spectrum = fft.analyze(binCount);




    rotateZ(frameCount * 0.01);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    for (var i = 20; i < 40; i++) {
        translate(0, 0, 0);
        box(spectrum[i]+50, 40, 40);
    }

    for (var i = 100; i < 120; i++) {
        translate(0, 0, 0);
        box(40, spectrum[i]+50, 40);
    }

    for (var i = 300; i < 320; i++) {
        translate(0, 0, 0);
        box(40, 40, spectrum[i]+50);
    }





    translate(10, 100, 0);
    noFill();
    stroke(0);
    sphere(1180);
}

function mouseClicked() {
    song.play();
}



