var w = window.innerWidth;
var h = window.innerHeight;
var i = 1;


function setup() {
    createCanvas(w, h);
    loadJSON("data.json", drawData);
    print("...setting up...");
    noStroke();
    textSize(24);

}


function draw() {

}

function drawData(data) {

    //var circle1 = data["person3"].age * 1;
    //ellipse(100, 100, circle1, circle1);

    for (var index in data) {

        var age = data[index].age * 2;
        var name = data[index].name;
        var ville = data[index].location;

        var color = map(age, 0, 70, 0, 255);


        fill(255, color, 0);
        ellipse(200 * i, 200, age, age);

        fill(0);
        text(name, 200 * i - 40, 280);
        text(ville, 200 * i - 40, 300);

        i += 1;

    }
}

