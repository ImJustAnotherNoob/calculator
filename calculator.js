const OPERATORS = {
    add: "+",
    subtract: "-",
    multiply: "*",
    divide: "/",
}

const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];


let currentExpression = ["0"];
let answers = []; // answer history
let currentNumber = "0"; // the current number that the user is in the middle of typing, which might be different from what is displayed (e.g. if an answer is being displayed)

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
    if (second === 0) {
        return "undefined";
    }
    quotient = first / second;
    return quotient;
}

function operate(operator, first, second) {
    let result;
    if (operator === OPERATORS.add) {
        result = add(first, second);
    }
    else if (operator === OPERATORS.subtract) {
        result = subtract(first, second);
    }
    else if (operator === OPERATORS.multiply) {
        result = multiply(first, second);
    }
    else if (operator === OPERATORS.divide) {
        result = divide(first, second);
    }
    return result;
}

const numberButtons = document.querySelector(".numbers").childNodes;
const operatorButtons = document.querySelector(".operators").childNodes;
const equalsButton = document.querySelector("#equals");
const allClearButton = document.querySelector("#clear");
const display = document.querySelector(".display");

function updateDisplay(expression) {
    display.textContent = "";
    for (let i = 0; i < expression.length; i++) {
    display.textContent += expression[i];
    }
}

function countOccurences(char, string) {
    count = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] === char) {
            count++;
        }
    }
    return count;
}

// remove leading zeros from beginning of number (e.g. '005.4' becomes '5.4')
function removeLeadingZeros(number) 
{
    // number is a decimal
    if (number.indexOf(".") != -1) {
        integerPart = number.substring(0, number.indexOf(".")); 
        decimalPart = number.substring(number.indexOf("."));
        while (integerPart[0] === "0" && integerPart.length > 1) {
            integerPart = integerPart.substring(1);
        }
        return integerPart + decimalPart;
    }

    // if number is an integer
    else {
        while (number[0] === "0" && number.length > 1) {
            number = number.substring(1);
        }
        return number;
    }
}

function numberClickListener(numBtn) {
    numBtn.addEventListener('click', function() {
        buttonNumber = numBtn.getAttribute("data-value");
        numberHandler(buttonNumber);
    });
}

function numberHandler(number) {
    if (number === "." && currentNumber.indexOf(".") != -1) {
        // do nothing
    }
    else {
        currentNumber += number;
        currentNumber = removeLeadingZeros(currentNumber);
        currentExpression[currentExpression.length - 1] = currentNumber;
        updateDisplay(currentExpression);  
        console.log(currentExpression); 
        console.log(currentNumber);
    }
}

function operatorClickListener(opBtn) {
    opBtn.addEventListener('click', function() {
        allOperators = Object.values(OPERATORS);
        chosenOperator = opBtn.getAttribute("data-value");
        operatorHandler(chosenOperator);
        console.log(currentExpression);
    });
}

function operatorHandler(chosenOperator) {
    // if current expression is complete and can be solved
    if (isCompleteExpression(currentExpression)) {
        result = collapseExpression(currentExpression)[0];
        currentExpression = [result]; 
        currentNumber = "";
    }

    // if last item in current expression is a number
    if (isNumber(currentExpression[currentExpression.length - 1])) {   
        currentExpression.push(chosenOperator);
        currentExpression.push(""); // after an operator there must be a number, this leaves an 'empty space' that the next inputted number can fill
        currentNumber = ""; 

    }

    // last item in current expression is an operator
    else if (allOperators.includes(currentExpression[currentExpression.length - 2])) {
        currentExpression[currentExpression.length - 2] = chosenOperator; // overwrite the last selected operator
    }  

    // current expression is empty 
    else if (currentExpression === [""]) {
        // do nothing
    }

    updateDisplay(currentExpression);
}

function equalsClickListener(eqlsBtn) {
    eqlsBtn.addEventListener('click', equalsHandler);
}

function equalsHandler() {
    if (isCompleteExpression(currentExpression)) {
        result = collapseExpression(currentExpression)[0];
        currentExpression = [result]; 
        currentNumber = "";
        updateDisplay(currentExpression);
        console.log(currentExpression);
    }
    else {
        console.log("not a complete expr")
        console.log(currentExpression);
    }
}

function isNumber(string) {
    for (let i = 0; i < string.length; i++) {
        if (NUMBERS.includes(string[i]) === false) {
            return false
        }
    }
    if (string.length === 0) {
        return false;
    }
    return true;
}

/* For an expression to be 'complete', all of the following requirements must be fulfilled:
-Must have at least three items
-Must have an odd number of items
-Every even item must be a number (zero is even), every odd number must be an operator
*/

function isCompleteExpression(expression) {
    let hasThreeItems = (expression.length >= 3);
    let oddItemCount = (expression.length % 2 === 1);
    let allEvensNumbers = true;
    let allOddsOperators = true;

    // Check if all even indices are numbers
    for (let i = 0; i < expression.length; i += 2) {
        if (isNumber(expression[i]) === false) {
            allEvensNumbers = false;
            break;
        }
    }

    // Check if all odd indices are operators
    for (let j = 1; j < expression.length; j += 2) {
        if (!Object.values(OPERATORS).includes(expression[j])) {
            allOddsOperators = false;
            break;
        }
    }    
    isComplete = hasThreeItems && oddItemCount && allEvensNumbers && allOddsOperators;
    return isComplete;
}

function collapseExpression(expression) {
    operator = expression[1];
    firstNum = Number(expression[0]);
    secondNum = Number(expression[2]);
    result = operate(operator, firstNum, secondNum);
    return [result];
}

function allClearClickListener(acBtn) {
    acBtn.addEventListener('click', allClearHandler);
}

function allClearHandler() {
    currentExpression = ["0"];
    currentNumber = "";
    updateDisplay(currentExpression[0]);
    console.log(currentExpression);
}

numberButtons.forEach(numberClickListener);
operatorButtons.forEach(operatorClickListener);
equalsClickListener(equalsButton);
allClearClickListener(allClearButton);


window.addEventListener("keydown", function(e) {
    let button = document.querySelector(`button[data-key="${e.key}"]`);
    if (!button) {
        // see if pressed key matches any alternate options
        button = document.querySelector(`button[data-keyalt="${e.key}"]`);
        console.log(button);
        // key press does not match any calculator button
        if (!button) {
            console.log("enter key failed");
            return;
        }
    }
    buttonValue = button.dataset.value;
    console.log(buttonValue);
    if (NUMBERS.includes(buttonValue)) {
        numberHandler(buttonValue);
    }
    else if (Object.values(OPERATORS).includes(buttonValue)) {
        operatorHandler(buttonValue);
    }
    else if (buttonValue === equalsButton.dataset.value) {
        equalsHandler();
    }
});
