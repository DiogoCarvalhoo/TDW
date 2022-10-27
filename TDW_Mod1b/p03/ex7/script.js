var numeroJogadas = 0;
var random; 

function main() {
    // Gera número aleatório
    createRandom();
    
    // Add Event Listener to Play Button
    var playButton = document.getElementById("play");
    playButton.addEventListener("click", handlePlay);

    // Add Event Listener to Input Field
    var inputNumber = document.getElementById("number");
    inputNumber.addEventListener("focus", handleFocus);
    inputNumber.addEventListener("keypress", handleEnter);

    // Add Event Listener to Restart Button
    var restartButton = document.getElementById("restart");
    restartButton.addEventListener("click", handleRestart);

  };

function createRandom() {
    let nrMin = 1;
    let nrMax = 20;
    random = Math.floor(Math.random() * (nrMax - nrMin)) + nrMin;
}
  

function handleEnter(e) {

    if (e.key === "Enter") {
        handlePlay();
    }

}

function handleRestart() {
    // Clear fields
    handleFocus()

    // Generate new Random
    createRandom();

    // Replace attempts
    var attemptSpan = document.getElementById("attempts");
    for (let i = 0; i<numeroJogadas; i++) {
        let span = document.createElement("span");
        span.setAttribute("name", "attemptX")
        span.innerText = "x ";
        attemptSpan.appendChild(span);
    }

    // Reset numeroJogadas
    numeroJogadas = 0;
}

function handlePlay() {

    var numberInput = document.getElementById("number");
    var feedbackH2 = document.getElementById("feedback");

    if (numberInput.value.length === 0) {
        return
    }

    var attemptSpans = document.getElementsByName("attemptX");
    if (attemptSpans.length === 0) {
        feedbackH2.innerText = "Voçe já esgotou todas as suas tentativas. Deve reiniciar o jogo."
        return
    }
    attemptSpans[0].remove()
    numeroJogadas++;

    var value = parseInt(numberInput.value);
    var returnMessage = "";

    if (value === random) {
        returnMessage = "Voçe acertou no número correto em " + numeroJogadas + " jogadas! Parabéns!";
        feedbackH2.innerText = returnMessage;
        return
    } else if (value > random) {
        returnMessage = "A sua tentativa foi demasiado alta!";
    } else {
        returnMessage = "A sua tentativa foi demasiado baixa!";
    }

    feedbackH2.innerText = returnMessage;

    if (attemptSpans.length === 0) {
        feedbackH2.innerText = returnMessage + "Voçe esgotou todas as suas tentativas."
    }

}

function handleFocus() {
    var numberInput = document.getElementById("number");
    var feedbackH2 = document.getElementById("feedback");

    numberInput.value = "";
    feedbackH2.innerText = "";

}