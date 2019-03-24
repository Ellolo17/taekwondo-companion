/////////////////////////////////////////////
// Variables
/////////////////////////////////////////////
var currentSolution = 0;
var points          = 0;
var filter          = "white" ;
var kategorie       = "names" ;
var usedDict        = dict.eng;

/////////////////////////////////////////////
// Names questions
/////////////////////////////////////////////

function loadQuestion() {
    //get
    var value = Math.round(Math.random() * (questions.length - 1));
    var currentQuestion = questions[value];

    //remove previous
    var frage = document.getElementById("frage");
    while (frage.firstChild) {
        frage.removeChild(frage.firstChild);
    }
    //set question
    frage.insertAdjacentHTML('afterbegin', currentQuestion[1]);
    //set answers
    var isAnswerSet = false;

    //if es ist image, we get the aswers from images
    var isImage = currentQuestion[0] === "image";
    var answerList = isImage ? imageList : wordList;

    for (var i = 0; i < 2; i++) {
        if (i === 0) {
            if (Math.random() >= 0.33) {
                //current solution here
                document.getElementById('antwort1').innerHTML = currentQuestion[2];
                isAnswerSet = true;
                currentSolution = 0;
            } else {
                value = Math.round(Math.random() * (answerList.length - 1));
                var falseText = answerList[value];
                while (falseText === currentQuestion[2]) {
                    value = Math.round(Math.random() * (answerList.length - 1));
                    falseText = answerList[value];
                }
                document.getElementById('antwort1').innerHTML = falseText;
            }
        } else if (i === 1) {
            if (!isAnswerSet) {
                if (Math.random() >= 0.5) {
                    //current solution here
                    document.getElementById('antwort2').innerHTML = currentQuestion[2];
                    currentSolution = 1;

                    //false antwort in 3
                    value = Math.round(Math.random() * (answerList.length - 1));
                    var falseText = answerList[value];
                    while (falseText === currentQuestion[2]) {
                        value = Math.round(Math.random() * (answerList.length - 1));
                        falseText = answerList[value];
                    }
                    document.getElementById('antwort3').innerHTML = falseText;
                } else {
                    value = Math.round(Math.random() * (answerList.length - 1));
                    var falseText = answerList[value];
                    while (falseText === currentQuestion[2]) {
                        value = Math.round(Math.random() * (answerList.length - 1));
                        falseText = answerList[value];
                    }
                    document.getElementById('antwort2').innerHTML = falseText;

                    //gute Antwort in 3
                    document.getElementById('antwort3').innerHTML = currentQuestion[2];
                    currentSolution = 2;
                }
            } else {
                //beide falsche
                value = Math.round(Math.random() * (answerList.length - 1));
                var falseText = answerList[value];
                while (falseText === currentQuestion[2]) {
                    value = Math.round(Math.random() * (answerList.length - 1));
                    falseText = answerList[value];
                }
                document.getElementById('antwort2').innerHTML = falseText;

                value = Math.round(Math.random() * (answerList.length - 1));
                var falseText = answerList[value];
                while (falseText === currentQuestion[2]) {
                    value = Math.round(Math.random() * (answerList.length - 1));
                    falseText = answerList[value];
                }
                document.getElementById('antwort3').innerHTML = falseText;
            }
        }
    }
}

function buttonOnClick(option) {
    if (option == currentSolution) {
        //Show Ok
        points++;
        document.getElementById("result").innerText = "Genau, +1 Punkt. Du hast " + points + " Punkte";
    }
    else {
        //show fail
        points--;
        document.getElementById("result").innerText = "Falsch, -1 Punkt. Du hast " + points + " Punkte";
    }

    //show cover
    document.getElementById("cover").style.visibility = "visible";
    loadQuestion();
}

function speak(text) {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[10]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10 // speed of lecture
    msg.pitch = 1; //0 to 2
    msg.text = text;
    msg.lang = 'en-US';

    msg.onend = function (e) {
        console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };

    speechSynthesis.speak(msg);
}

/////////////////////////////////////////////
// Called when the document is loaded
/////////////////////////////////////////////
function documentReady() {
    //preload the images so it loads faster
    var img = new Image;
    for (var i = 0; i < imageList.length; i++) {
        img.src = imageList[i];
    }
    //we show the first question
    loadQuestion();
}

////////////////////////////////////////////
// filter
////////////////////////////////////////////
function expandFilter() {
    var elem = document.getElementById("filmyDropdown");
    if (elem.classList.contains("dropdown-content-hidden")) {
        //change class for "dropdown-content-shown" to show list
        elem.classList.remove("dropdown-content-hidden");
        elem.classList.add("dropdown-content-shown");
    } else {
        //change class for "dropdown-content-hiddden" to hide list
        elem.classList.remove("dropdown-content-shown");
        elem.classList.add("dropdown-content-hidden");
    }
}

function applyfilter(color, newtext) {
    //set filter variable
    filter = color;
    //change the elements
    var ball = document.querySelector("#selectedfilter>#filterball");
    ball.style.backgroundColor = color;

    var text = document.querySelector("#selectedfilter>#filtertext");
    text.innerText = newtext;

}

////////////////////////////////////////////
// Kategorie
////////////////////////////////////////////
function expandKategorie() {
    var elem = document.getElementById("katmyDropdown");
    if (elem.classList.contains("dropdown-content-hidden")) {
        //change class for "dropdown-content-shown" to show list
        elem.classList.remove("dropdown-content-hidden");
        elem.classList.add("dropdown-content-shown");
    } else {
        //change class for "dropdown-content-hiddden" to hide list
        elem.classList.remove("dropdown-content-shown");
        elem.classList.add("dropdown-content-hidden");
    }
}

function applyKategorie(kat, image, newtext) {
    //set filter variable
    kategorie = kat;
    //change the elements
    var ball = document.querySelector("#selectedkategorie>#kategorieball");
    ball.style.backgroundImage = image;

    var text = document.querySelector("#selectedkategorie>#kategorietext");
    text.innerText = newtext;

    text = document.getElementById("selectedkategorietext");
    text.innerText = newtext;
}
