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
    createCanvas(w, h, WEBGL).id("canvas1").parent(document.getElementById("divCanvas"));
    //$("#canvas1").addClass("border");
    var smoothing = 0.6;
    fft = new p5.FFT(smoothing, binCount);
    fft.setInput(song);
    x = width/2;
    y = height/2;
    z = 0;

}


function draw() {



    translate(x,y,z);
    rectMode(CENTER);
    rect(0,0,100,100);

    z++; // The rectangle moves forward as z increments.


    song.setVolume(0.3);
    var largeurRect = 0;
    var largeurTrait = h;
    var spectrum = fft.analyze(binCount);


    console.log(spectrum[100]);


}

function mouseClicked() {
    song.play();
}



