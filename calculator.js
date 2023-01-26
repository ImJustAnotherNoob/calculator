
function add(firstTerm, secondTerm) {
    sum = firstTerm + secondTerm;
    return sum;
}

function subtract(firstTerm, secondTerm) {
    difference = firstTerm - secondTerm;
    return difference;
}

function multiply(firstTerm, secondTerm) {
    product = firstTerm * secondTerm;
    return product;
}

function divide(firstTerm, secondTerm) {
    quotient = firstTerm / secondTerm;
    return quotient;
}

function operate(operator, firstNum, secondNum) {
}

const numberButtons = document.querySelectorAll(".number");
const display = document.querySelector(".display");

function clickListener(btn) {
    btn.addEventListener('click', function() {
        display.textContent = display.textContent + btn.getAttribute("data-value");
    });
}



numberButtons.forEach(clickListener);

