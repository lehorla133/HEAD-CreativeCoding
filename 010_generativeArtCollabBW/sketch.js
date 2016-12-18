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

//boolean background actif = permet d'effacer ou non le background
var backgroundActive = false;


$(function () {
    initHandler();
});


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
        stroke(255);
//      stroke(random(0, 255),random(0, 255),random(0, 255));
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
        if (event.which == 13) {
            console.log("Enter");
        } else if (event.which == 49) {
            console.log("1");
            matriceRotateSpeed = 0.1;
        } else if (event.which == 50) {
            console.log("2");
            matriceRotateSpeed = 0.00099;
        } else if (event.which == 51) {
            console.log("3");
            matriceRotateSpeed = 0.00001;
        } else if (event.which == 52) {
            console.log("4");
            matriceRotateSpeed = 2147435999;
        }

    })


    $("body").keydown(function (event) {
        //---- nombre de lignes -----
        if (event.keyCode == 81) {
            console.log("q");
            nombreDeLignes = 10;
        } else if (event.keyCode == 87) {
            console.log("w");
            nombreDeLignes = 30;
        } else if (event.keyCode == 69) {
            console.log("e");
            nombreDeLignes = 50;
        } else if (event.keyCode == 82) {
            console.log("r");
            nombreDeLignes = 100;
        } else if (event.keyCode == 84) {
            console.log("t");
            nombreDeLignes = 300;
        } else if (event.keyCode == 90) {
            console.log("z");
            nombreDeLignes = 500;
        } else if (event.keyCode == 85) {
            console.log("u");
            nombreDeLignes = 1200;
        } else if (event.keyCode == 73) {
            console.log("i");
            nombreDeLignes = 2900;
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
        }//--- laisse une trainé : backgroundActive = true/false
        else if (event.keyCode == 78) {
            console.log("n");
            backgroundActive = !backgroundActive;
        }
    })


}

function mousePressed() {
    //toggleFullScreen();
}


function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}



