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
var mic;

var tabD = [];

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
    //capture = createCapture(VIDEO);
    //capture.size(w, h);
    mic = new p5.AudioIn();

    for (var i = 0; i < 10; i++) {
        tabD[i] = [];
        for (var x = 0; x < 10; x++) {
            tabD[i][x] = box(40, 40, 40);
        }
    }

}


function draw() {
    //background(capture);
    //image(capture, 0, 0);
    //filter('INVERT');
    song.setVolume(0.7);
    var spectrum = fft.analyze(binCount);

    camera(20.0, -130.0, -120.0, 50.0, 50.0, 0.0, 0.0, 1.0, 0.0);


    rotateZ(frameCount * 0.01);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);


    for (var i = 0; i < 10; i++) {

        translate(30, 0, 0);
        var p = map(i, 0, 10, 0, 700);
        box(20, 20, spectrum[p] + 20);

        for (var x = 0; x < 10; x++) {
            push();
            translate(0, 0, -30 + x * 30);
            var d = map(x, 0, 10, 0, 700);
            box(20, spectrum[d]+20, 20);
            pop();
        }
    }

    for (var i = 100; i < 120; i++) {
        push();
        translate(200, 0, 0);
       // box(40, spectrum[i] + 50, 40);
        sphere(spectrum[i]+20);
        pop();
   }

    //for (var i = 300; i < 320; i++) {
//        translate(0, 0, 0);
//        box(40, 40, spectrum[i] + 50);
//    }

    /*    for (var i = 200; i < 620; i++) {
     translate(50, 0, 0);
     box(40, 40, spectrum[i]+50);
     }
     */
    translate(10, 100, 0);
    noFill();
    stroke(0);

}

function mouseClicked() {
    song.play();
}



