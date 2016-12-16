var w = window.innerWidth;
var h = window.innerHeight;
var spaceData;
var issNow;


function setup() {
    createCanvas(w, h);
    loadJSON("http://api.open-notify.org/astros.json", drawData, 'jsonp');
    loadJSON("http://api.open-notify.org/iss-now.json", drawDataISS, 'jsonp');
    textSize(24);
}


function drawData(data) {
    spaceData = data;
    print(spaceData);
}

function drawDataISS(dataISS) {
    issNow = dataISS;
    print(issNow);
}

function draw() {
    background(255);

        if (spaceData) {
            for (var i = 0; i < spaceData.number; i++) {
                var number = spaceData.number;
                var name = spaceData.people[i].name;
                var craft = spaceData.people[i].craft
                text(name, 100, 400 + (i * 50));
                text(craft, 400, 400 + (i * 50));
                text(number, 200, 200);
                ellipse(random(width), random(height), 10, 10);
            }
        }
    if (issNow) {

        var lat = issNow.iss_position.latitude;
        var long = issNow.iss_position.longitude;

        var y = map(lat, 90, -90, 0, height);
        var x = map(long, -180, 180, 0, width);

        ellipse(x, y, 20, 20);

    }
}



