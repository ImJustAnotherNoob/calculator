const ADD = "+";
const SUBTRACT = "-";
const MULTIPLY = "*";
const DIVIDE = "/";

let displayValue = "";
let currentNumber = "";
let oldNumber = "";
let currentOperator = "";

function getNumberValue(num) {
    return parseInt(num);
}

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
    if (operator === ADD) {
        result = add(first, second);
    }
    else if (operator === SUBTRACT) {
        result = subtract(first, second);
    }
    else if (operator === MULTIPLY) {
        result = multiply(first, second);
    }
    else if (operator === DIVIDE) {
        result = divide(first, second);
    }
    return result;
}

const numberButtons = document.querySelector(".numbers").childNodes;
const operatorButtons = document.querySelector(".operators").childNodes;
const equalsButton = document.querySelector("#equals");
const allClearButton = document.querySelector("#clear");
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
        if (currentNumber !== "") {
            oldNumber = currentNumber;
            currentNumber = "";
        }
    });
}

function equalsClickListener(eqlsBtn) {
    eqlsBtn.addEventListener('click', function() {
        result = operate(currentOperator, getNumberValue(oldNumber), getNumberValue(currentNumber));
        console.log(displayValue);
        console.log(typeof displayValue)
        console.log(oldNumber);
        console.log(currentNumber);
        currentNumber = result.toString();
        displayValue = currentNumber;
        updateDisplay(displayValue);
    });
}

function allClearClickListener(acBtn) {
    acBtn.addEventListener('click', function() {
        currentNumber = "";
        oldNumber = "";
        updateDisplay("");
    });
}

numberButtons.forEach(numberClickListener);
operatorButtons.forEach(operatorClickListener);
equalsClickListener(equalsButton);
allClearClickListener(allClearButton);

