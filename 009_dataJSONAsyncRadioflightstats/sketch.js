var w = window.innerWidth;
var h = window.innerHeight;
var departuresData;
var tableauATrie = new Array();
var leTableauTrie;
var codeDeLectureActuel;
//--------------------
// desired time : 2016-12-13T20:30:00.000
// local time   : Tue Dec 13 2016 21:49:16 GMT+0100 (Paris, Madrid)
var airportDepart;
var localTime;
var yearLocal;
var monthLocal;
var localTimeString;
var hourFull;
var hourSimple;
var dayLocal;
//--------------------------
var currentPlane;
var lastCurrentPlane;


$(function () {
    initHandler();
});


function initHandler() {
    airportDepart = "GVA";
    $('#btnCheckRadio').on('click', checkRadio);
    $('#btnCheckCurrentPlane').on('click', checkCurrentPlane);
    getTimeVariable();
    loadJSONAirport();

    setInterval(function () {
        getTimeVariable();
        //check current plane ()
        //display actual plane()
    }, 60 * 1000);

}


function setup() {
    createCanvas(400, 200).id("canvas1").parent(document.getElementById("divCanvas"));
    $("#canvas1").addClass("border");
    textSize(15);
}


function getTimeVariable() {
    localTime = new Date();
    yearLocal = localTime.getFullYear();
    monthLocal = localTime.getMonth() + 1;
    localTimeString = localTime.toString();
    var dayString = localTimeString.slice(8, 10);
    hourFull = localTimeString.slice(16, 21);
    hourSimple = localTimeString.slice(16, 18);
    dayLocal = parseInt(dayString);

    console.log("time : ");
    console.log(localTime);
    console.log(yearLocal);
    console.log(monthLocal);
    console.log(dayLocal);
    console.log(hourFull);
    console.log(hourSimple);

}


function loadJSONAirport() {
    $.get("proxyflightstats.php", {
        airport: airportDepart,
        year: yearLocal,
        month: monthLocal,
        day: dayLocal,
        hour: hourSimple
    }, function (data) {
        departuresData = data;
        console.log(departuresData);
        trieDepartures();
    })
}

function trieDepartures() {
    if (departuresData) {
        var i = 0;
        departuresData.scheduledFlights.forEach(function (element) {
            tableauATrie[i] = element;
            i = i + 1;
        });
        leTableauTrie = tableauATrie.sort(function (t1, t2) {
            return t1.departureTime.localeCompare(t2.departureTime);
        });
        afficheDeparture();
    }
}

function afficheDeparture() {
    console.log(leTableauTrie);
    for (var i = 0; i < leTableauTrie.length - 1; i++) {
        if (leTableauTrie[i].departureTime == leTableauTrie[i + 1].departureTime) {
            console.log("coucou");
        }
        var scheduleTime = leTableauTrie[i].departureTime;
        var scheduleTimeHour = scheduleTime.slice(11, 16);
        var aeroportCode = leTableauTrie[i].arrivalAirportFsCode;
        var time = $("<span></span>").text(scheduleTime);
        var scheduleTimeHourfix = $("<span></span>").text(scheduleTimeHour);
        var space = $("<span></span>").text("  /  ");
        var name = $("<span></span>").text(aeroportCode);
        var retour = $("<br/>");
        $("body").append(time, space, name, scheduleTimeHourfix, retour);
    }
    needLastCurrentPlan();
    checkCurrentPlane();
}


function needLastCurrentPlan() {
    for (var i = 0; i < leTableauTrie.length; i++) {
        var nomDuVol = leTableauTrie[i].arrivalAirportFsCode;
        var time = leTableauTrie[i].departureTime;
        var time2 = time.slice(11, 16);
        if (time2 <= hourFull) {
            lastCurrentPlane = nomDuVol;
        }
    }
    console.log("lastCurrentPlane : " + lastCurrentPlane);
}


function checkCurrentPlane() {


    for (var i = 0; i < leTableauTrie.length - 1; i++) {
        var nomDuVol = leTableauTrie[i].arrivalAirportFsCode;
        var time = leTableauTrie[i].departureTime;

        console.log("depart avion : " + nomDuVol + " // " + time);
        var time2 = time.slice(11, 16);
        console.log(hourFull + " / " + time2);

        if (time2 <= hourFull) {
            console.log("this one");
            currentPlane = nomDuVol;
        }
    }

    console.log("lastCurrentPlane : " + lastCurrentPlane);
    console.log("currentPlane : " + currentPlane);
    if (currentPlane != lastCurrentPlane) {
        console.log("new plane on the fly so new radio : this one : " + currentPlane);
        lastCurrentPlane = currentPlane;
        checkPays(currentPlane);
    } else {
        console.log("toujours meme avion");
        checkPays(currentPlane);
    }

//    var twentyMinutesLater = new Date();
//    twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 1);
//    console.log(twentyMinutesLater);

}
function checkPays(ville) {
    var countryCode;
    $.get("proxyVillePays.php", {ville: ville}, function (data) {
        console.log(data);
        if (data.airport != null) {
            countryCode = data.airport.countryCode;
            console.log(countryCode);
            checkRadio(countryCode);
        } else {
            countryCode = "CH";
            checkRadio(countryCode);
        }

    })
}

function checkRadio(codeDeLectureActuel) {
    $("#radioStation").empty();
    $.get("proxy.php", {code: codeDeLectureActuel}, function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var link = data[i].streams[0].stream;
            var name = $("<span></span>").text(data[i].name);
            var contenttype = data[i].streams[0].content_type;
            var space = $("<span></span>").text("  /  ");
            if (contenttype != null && contenttype == "audio/mpeg") {

                var linkRadio = "<a href=" + link + " target='_blank'>link<a>";
            }
            var retour = $("<br/>");

            console.log("radio type : " + name + " / " + link);
            if (link.indexOf("m3u") > -1) {
                console.log("your url contains the name M3U");
            } else if (link.indexOf("=/") > -1) {
                console.log("invalid URL");
            } else if (link.indexOf("asx") > -1) {
                console.log("your url contains the name ASX");
            }
            else if (link.indexOf("stream") > -1) {
                console.log("GOOD");
                loadRadioHTML(link, name);
            }
            else if (link.indexOf("listen") > -1) {
                console.log("GOOD");

            }

            $("#radioStation").append(name, space, linkRadio, retour);
        }


    })
}


function loadRadioHTML(linkRadio, nameRadio) {
    var nameOH = $("<span></span>").text(nameRadio);
    $("#radioName").append(nameOH);
    console.log(linkRadio);
    $("#lecteurAudio source").attr("src", linkRadio);
    console.log("radio readdy");
    $("#lecteurAudio").trigger('load');
    $("#lecteurAudio").trigger('play');
}

function draw() {
    rect(100, 100, 50, 50);
}



