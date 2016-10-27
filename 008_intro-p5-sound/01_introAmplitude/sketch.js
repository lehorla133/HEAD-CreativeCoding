
/*
-------------------------------------
    YANN LONGCHAMP
    HEAD - GENEVA
    INTRODUCTION AMPLITUDE P5 SOUND
-------------------------------------
    - chargement d'un son audio
    - création d'un bouton play / pause
    - création de deux slider pour le volume et pour la vitesse de lecture
    - analyse de l'amplitude (volume) du son
    - création de cercle réagissant à l'amplitude
    - création d'un graphe correspondant à un historique de l'amplitude
 */

var w = window.innerWidth;
var h = window.innerHeight;
var song;
var slider;
var sliderRate;
var buttonPlayStop;
var amp; //volume
var volHistory = [];

function preload() {
    song = loadSound("arp.wav");
}

function setup() {
    createCanvas(640, 360).id("canvas1").parent(document.getElementById("divCanvas"));
    $("#canvas1").addClass("border");
    buttonPlayStop = createButton("play");
    buttonPlayStop.mousePressed(togglePlaying);
    slider = createSlider(0, 1, 0.5, 0.01);
    sliderRate = createSlider(0, 3, 1, 0.01);
    amp = new p5.Amplitude();
}


function draw() {
    background(0);
    fill(255, 0, 240);
    var vol = amp.getLevel();

    volHistory.push(vol);
    //noFill();
    beginShape();
    for (var i = 0; i < volHistory.length; i++) {
        var y = map(volHistory[i], 0, 0.1, height, 0);
        stroke(255);
        vertex(i, y);
    }
    endShape();
    if (volHistory.length > width - 50) {
        volHistory.splice(0, 1);
    }

    stroke(255, 0, 0);
    line(volHistory.length, 0, volHistory.length, height);


    //line(85, 75, 30, 75);

    var diam = map(vol, 0, 0.3, 10, 200);
    ellipse(width / 2, height / 2, diam, diam);


    song.setVolume(slider.value());
    song.rate(sliderRate.value());
    //console.log(song.duration());
}

function togglePlaying() {
    if (!song.isPlaying()) {
        song.play();
        buttonPlayStop.html("stop");
    } else {
        song.stop();
        buttonPlayStop.html("play");
    }
}

