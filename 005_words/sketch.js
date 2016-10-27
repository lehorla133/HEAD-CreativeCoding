var w = window.innerWidth;
var h = window.innerHeight;
var words = ["hello", "simon", "this", "is", "you"];

var outputText = "";
var offset = 0;

function setup() {
    createCanvas(w, h);
    print(words);
    textSize(40);
}


function draw() {
    //background(255);
    //for (i = 0; i < words.length; i++) {
    //    text(words[i], i * 100, i * 100);
    //}
}

function mousePressed() {
    shuffle(words, true);

}

