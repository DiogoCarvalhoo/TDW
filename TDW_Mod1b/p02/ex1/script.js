const output_div = document.getElementById("outputDiv");
const input_number = document.getElementById("inputNumber");
const check_button = document.getElementById("checkButton");

check_button.addEventListener("click", checkNumber);

function checkNumber() {
    var val = input_number.value
    output_div.innerHTML = verifyNumber(val);
}

function verifyNumber(num) {
    var message;
    if (num % 2 == 0) 
        message = "Número é par."
    else 
        message = "Número é ímpar."

    return message;
}