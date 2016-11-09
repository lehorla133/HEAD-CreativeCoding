/*
 -------------------------------------
 YANN LONGCHAMP
 HEAD - GENEVA
 INTRODUCTION AMPLITUDE P5 SOUND
 -------------------------------------
 - chargement d'un son audio
 - analayse des frequences, stockage dans un tableau
 - création de rect réagissant au différentes case du tableau (donc au différente frequence)
 - création de ligne
 - création de square


 */

var w = window.innerWidth;
var h = window.innerHeight;
var song;
var fft;
var binCount = 1024;


function preload() {
    song = loadSound("bass.wav");
}

function setup() {
    createCanvas(w, h).id("canvas1").parent(document.getElementById("divCanvas"));
    //$("#canvas1").addClass("border");
    var smoothing = 0.6;
    fft = new p5.FFT(smoothing, binCount);
    fft.setInput(song);

}


function draw() {
    background(255);
    fill(0);
    noStroke();
    text("mouse click to start", 200, h / 2);
    fill(255, 0, 50);
    stroke(0);

    song.setVolume(0.3);
    var largeurRect = 0;
    var largeurTrait = h;
    var spectrum = fft.analyze(binCount);


    console.log(spectrum[100]);
    for (var i = 0; i < spectrum.length; i++) {
        //var map = map(largeurRect, 0, 1024)
        line(largeurRect, spectrum[i], largeurRect + 10, spectrum[i]);
        rect(largeurRect, h, 10, -spectrum[i]);
        text(i, largeurRect,h-largeurRect+4);
        largeurRect = largeurRect + 10;
    }

    for (var i = 20; i < 30; i++) {
        fill(255);
        rect(200, 200, spectrum[i]+100, spectrum[i]+100);

    }

    for (var i = 60; i < 70; i++) {
        fill(255);
        rect(600, 200, spectrum[i]+100, spectrum[i]+100);
    }

    for (var i = 100; i < 110; i++) {
        fill(255);
        rect(900, 200, spectrum[i]+100, spectrum[i]+100);

    }

}

function mouseClicked() {
    song.play();
}



