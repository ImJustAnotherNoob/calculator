let displayValue = "";
let currentNumber = "";
let oldNumber = "";
let currentOperator = "";
let numberValue = parseInt(displayValue);

function add(first, second) {
    sum = first + second;
    return sum;
}

function subtract(first, second) {
    difference = first - second;
    return difference;
}

function multiply(first, second) {
    product = first * second;
    return product;
}

function divide(first, second) {
    quotient = first / second;
    return quotient;
}

function operate(operator, first, second) {
    let result;
    if (operator === "+") {
        result = add(first, second);
    }
    else if (operator === "-") {
        result = subtract(first, second);
    }
    return result;
}

const numberButtons = document.querySelector(".numbers").childNodes;
const operatorButtons = document.querySelector(".operators").childNodes;
const equalsButton = document.querySelector("#equals");
const display = document.querySelector(".display");

function updateDisplay(val) {
    display.textContent = val;
}

function numberClickListener(numBtn) {
    numBtn.addEventListener('click', function() {
        buttonNumber = numBtn.getAttribute("data-value");
        currentNumber += buttonNumber;
        updateDisplay(currentNumber);     
        });
}

function operatorClickListener(opBtn) {
    opBtn.addEventListener('click', function() {
        currentOperator = opBtn.getAttribute("data-value");
        oldNumber = currentNumber;
        currentNumber = "";
    });
}

function equalsClickListener(eqlsBtn) {
    eqlsBtn.addEventListener('click', function() {
        result = operate(currentOperator, oldNumber, currentNumber);
        displayValue = result;
        console.log(displayValue);
        console.log(oldNumber);
        console.log(currentNumber);
        updateDisplay(displayValue);
    });
}

numberButtons.forEach(numberClickListener);
operatorButtons.forEach(operatorClickListener);
equalsClickListener(equalsButton);

