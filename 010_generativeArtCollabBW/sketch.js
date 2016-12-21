// le petit code ä bato......

var w = window.innerWidth;
var h = window.innerHeight;
//-------------------------

// nombre de lignes display dans la matrice
var nombreDeLignes = 10;

//vitesse de roation de toute la matrice ! (fonctionne uniquement quand la matrice est déroganisé)
var matriceRotateSpeed = 0.1;

//vitesse de rotation d'une ligne (sur elle même)
var lineAutoRotateSpeed = 0.098;

//position en X de la ligne de référence
var posX = 0;
//position en Y de la ligne de référence
var posY = 0;

// boolean rotation de la matrice
var matriceRotation = false;

//discoColor
var discoColor;
//boolean background actif = permet d'effacer ou non le background
var backgroundActive = false;

// variables pour Tone.js
var synth;
var part;
var chorus;
var reverb;
var feedbackDelay;
var bellPart;
var congaPart;

//VAriablea play / pause

var melodiePlay = false;
var drumPlay = false;


$(function () {
    initHandler();
    initToneJS();
});


function initToneJS() {
    console.log("coucou tone");
    Tone.Transport.timeSignature = [6, 4];
    Tone.Transport.bpm.value = 100;


    feedbackDelay = new Tone.PingPongDelay({
        "delayTime": "8n",
        "feedback": 0,
        "wet": 0
    }).toMaster();

    chorus = new Tone.Chorus({
        frequency: 1.5,
        delayTime: 3.5,
        depth: 0.7,
        feedback: 0.1,
        type: "sine",
        spread: 180,
    }).toMaster();

    reverb = new Tone.JCReverb({
        "roomSize": 0,
        "wet": 0
    }).toMaster();

    var reverb2 = new Tone.Freeverb({
        "roomSize": 0.6,
        "wet": 0.3
    }).toMaster();

    var feedbackDelay2 = new Tone.PingPongDelay({
        "delayTime": "8n",
        "feedback": 0.3,
        "wet": 0.1
    }).toMaster();


    //the synth settings
    var synthSettings = {
        "oscillator": {
            "detune": 0,
            "type": "custom",
            "partials": [2, 1, 2, 2],
            "phase": 0,
            "volume": 0
        },
        "envelope": {
            "attack": 0.850,
            "decay": 0.3,
            "sustain": 0.2,
            "release": 1,
        },
        "portamento": 0.01,
        "volume": -15
    };


    //synthSettings.envelope.attack = 1;

    synth = new Tone.Synth(synthSettings).chain(reverb, feedbackDelay, Tone.Master);


    //synth.triggerAttackRelease("C4");
    part = new Tone.Sequence(function (time, note) {

        synth.triggerAttackRelease(note, "8n", time);

    }, ["E3", "F#3", "B3", "C#4", "D4", "F#3", "E3", "C#4", "B3", "F#3", "D4", "C#4"], "4n");


//.................................................................................................
//.................................................................................................
//.................................................................................................
//.................................................................................................
    var bell = new Tone.MetalSynth({
        "harmonicity": 12,
        "resonance": 800,
        "modulationIndex": 20,
        "envelope": {
            "decay": 0.4,
        },
        "volume": -50
    }).chain(reverb, feedbackDelay, Tone.Master);

    bellPart = new Tone.Sequence(function (time, freq) {
        bell.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
        bell.triggerAttack(time);
    }, [300, null, 200, null, 200, 200, null, 200, null, 200, null, 200], "8t");

    bellPart.playbackRate = 0.985;

    var conga = new Tone.MembraneSynth({
        "pitchDecay": 0.008,
        "octaves": 2,
        "envelope": {
            "attack": 0.0006,
            "decay": 0.5,
            "sustain": 0
        },
        "volume": -15
    }).chain(reverb, Tone.Master);

    congaPart = new Tone.Sequence(function (time, pitch) {
        conga.triggerAttack(pitch, time, Math.random() * 1.5 + 0.5);
    }, ["G3", "C4", "C4", "C4"], "4n");


    //.................................................................................................
//.................................................................................................
//.................................................................................................
//.................................................................................................


    Tone.Transport.start();

}

function initHandler() {
    console.log("coucou art");
    keyPressedCheck();
}


function setup() {
    createCanvas(w, h).id("canvas1").parent(document.getElementById("divCanvas"));
//  $("#canvas1").addClass("border");
    frameRate(25);
}


function draw() {


    if (backgroundActive) {
        background(0);

    }


    // deplace le système de coordonée au centre
    translate(width / 2, height / 2);

    //-------- FOR sur le nombre de lignes  -----
    for (var i = 0; i < nombreDeLignes; i++) {
        // duplique le nombre de ligne de manière homogène
        var racineCarre = Math.round(Math.sqrt(nombreDeLignes));
        var px = (i % racineCarre) * w / racineCarre;
        var py = (i / racineCarre) * h / racineCarre;
        //duplique 4 fois le resultat pour remplir la totalité de l'écran
        px -= w / 2 - (w / racineCarre) / 2;
        py -= h / 2 - (h / racineCarre) / 2;

        //-- check boolean matriceBoolean -- if true : rotate all matrice with radian
        if (matriceRotation) {
            rotate(radians(frameCount * matriceRotateSpeed + 360 / nombreDeLignes));
        }
        //-------- dessine une ligne dans la matrice -----
        push();
        translate(px, py);

        if (discoColor) {
            stroke(random(0, 255), random(0, 255), random(0, 255));
            strokeWeight(5);
        } else {
            stroke(255);
        }

        //display une ligne
        line(posX, posY, posY, posX);

        // --- agrandi automatiquement la taille des lignes ----
        posY = posY - (0.01 / (nombreDeLignes / 10));
        if (posY > width) {
            posY = 0;
        }
        posX = posX + (0.01 / (nombreDeLignes / 10));
        if (posX > height) {
            posX = 0;
        }
        pop();

    }
}


function keyPressedCheck() {
    // ------ matriceRotateSpeed ----
    $("body").keypress(function (event) {
        if (event.which == 49) {
            console.log("1");
            matriceRotateSpeed = 0.00099;
            Tone.Transport.bpm.value = 20;
            synth.envelope.attack = 1.5;
            synth.envelope.decay = 0.5;
            synth.envelope.sustain = 0.2;
            synth.envelope.release = 2;
        } else if (event.which == 50) {
            console.log("2");
            matriceRotateSpeed = 0.005;
            Tone.Transport.bpm.value = 100;
            synth.envelope.attack = 1;
            synth.envelope.decay = 0.5;
            synth.envelope.sustain = 0.2;
            synth.envelope.release = 1;
        } else if (event.which == 51) {
            console.log("3");
            matriceRotateSpeed = 0.0099;
            Tone.Transport.bpm.value = 180;
            synth.envelope.attack = 0.43;
            synth.envelope.decay = 0.5;
            synth.envelope.sustain = 0.2;
            synth.envelope.release = 0.66;
        } else if (event.which == 52) {
            console.log("4");
            matriceRotateSpeed = 99;
            Tone.Transport.bpm.value = 350;
            synth.envelope.attack = 0.22;
            synth.envelope.decay = 0.5;
            synth.envelope.sustain = 0.2;
            synth.envelope.release = 0.88;
        }

    })


    $("body").keydown(function (event) {
        //---- nombre de lignes -----
        if (event.keyCode == 81) {
            console.log("q");
            nombreDeLignes = 10;
            reverb.roomSize.value = 0.2;
            reverb.wet.value = 0.1;
            feedbackDelay.feedback.value = 0.1;
            feedbackDelay.wet.value = 0.1;
            feedbackDelay.delayTime.value = 2;


            //synth.portamento = 10;

        } else if (event.keyCode == 87) {
            console.log("w");
            nombreDeLignes = 30;
            reverb.roomSize.value = 0.3;
            reverb.wet.value = 0.2;
            feedbackDelay.feedback.value = 0.2;
            feedbackDelay.wet.value = 0.1;
            feedbackDelay.delayTime.value = 4;

        } else if (event.keyCode == 69) {
            console.log("e");
            nombreDeLignes = 50;
            reverb.roomSize.value = 0.4;
            reverb.wet.value = 0.2;
            feedbackDelay.feedback.value = 0.3;
            feedbackDelay.wet.value = 0.1;
            feedbackDelay.delayTime.value = 8;


        } else if (event.keyCode == 82) {
            console.log("r");
            nombreDeLignes = 100;
            reverb.roomSize.value = 0.4;
            reverb.wet.value = 0.3;
            feedbackDelay.feedback.value = 0.4;
            feedbackDelay.wet.value = 0.2;
            feedbackDelay.delayTime.value = 8;
            // chorus.delayTime = 0.5;
            // chorus.frequency = 6;
            // chorus.depth = 1.6;
        } else if (event.keyCode == 84) {
            console.log("t");
            nombreDeLignes = 300;
            reverb.roomSize.value = 0.5;
            reverb.wet.value = 0.3;
            feedbackDelay.feedback.value = 0.5;
            feedbackDelay.wet.value = 0.3;
            feedbackDelay.delayTime.value = 16;

        } else if (event.keyCode == 90) {
            console.log("z");
            nombreDeLignes = 500;
            reverb.roomSize.value = 0.5;
            reverb.wet.value = 0.4;
            feedbackDelay.feedback.value = 0.5;
            feedbackDelay.wet.value = 0.5;
            feedbackDelay.delayTime.value = 16;

        } else if (event.keyCode == 85) {
            console.log("u");
            nombreDeLignes = 1200;
            reverb.roomSize.value = 0.6;
            reverb.wet.value = 0.4;
            feedbackDelay.feedback.value = 0.6;
            feedbackDelay.wet.value = 0.5;


        } else if (event.keyCode == 73) {
            console.log("i");
            nombreDeLignes = 2900;
            reverb.roomSize.value = 0.6;
            reverb.wet.value = 0.5;
            feedbackDelay.feedback.value = 0.8;
            feedbackDelay.wet.value = 0.5;
            feedbackDelay.delayTime.value = 16;
        }
        //---- réinitialize la taille des lignes -----
        else if (event.keyCode == 77) {
            console.log("m");
            posX = 0;
            posY = 0;
        }
        //--- rotate matrice : matriceRotate = true/false
        else if (event.keyCode == 66) {
            console.log("b");
            matriceRotation = !matriceRotation;
            //-----------------------------------------------
        }//--- laisse une trainé : backgroundActive = true/false
        //---------------------------------------------------
        else if (event.keyCode == 78) {
            console.log("n");

            backgroundActive = !backgroundActive;
            if (!backgroundActive) {
                feedbackDelay.feedback.value = 0.5;
                feedbackDelay.wet.value = 0.4;
                feedbackDelay.delayTime.value = 1;
                reverb.roomSize.value = 0.4;
                reverb.wet.value = 0.4;
                synth.portamento = 1.5;
            } else {
                feedbackDelay.feedback.value = 0;
                feedbackDelay.wet.value = 0;
                reverb.roomSize.value = 0;
                reverb.wet.value = 0;
                synth.portamento = 0.01;
            }
        }


        //Disco color ---------------------------------------
        else if (event.keyCode == 68) {
            discoColor = !discoColor;
        } else if (event.keyCode == 83) {
            if (!drumPlay) {
                bellPart.start(0);
                congaPart.start(0);
                drumPlay = true;
            } else if (drumPlay) {
                bellPart.stop(0);
                congaPart.stop(0);
                drumPlay = false;
            }
            bellPart.start();
            congaPart.start();
        }
        else if (event.keyCode == 65) {
            if (!melodiePlay) {
                part.start();
                melodiePlay = true;
            } else if (melodiePlay) {
                part.stop();
                melodiePlay = false;
            }
        }
    })
}





// est devenu grand :)

// prösentation demain ! oh top