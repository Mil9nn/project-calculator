// Math functions
function sum(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function modulus(num1, num2) {
    return num1 % num2;
}

function operate(num1, operator, num2) {
    return operator(num1, num2); // Return the result of the operation
}

// DOM Manipulation
let display = document.querySelector(".display");
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let evaluate = document.querySelector(".evaluate");

let num1 = null;
let num2 = null;
let operatorOnDisplay = null;
let result = null;

// Utility function to map operators
function getFunctionFromOperator(operatorSymbol) {
    switch (operatorSymbol) {
        case 'fa-plus': return sum; // Font Awesome icon class for plus
        case 'fa-minus': return subtract; // Font Awesome icon class for minus
        case 'fa-xmark': return multiply; // Font Awesome icon class for multiplication
        case 'fa-divide': return divide; // Font Awesome icon class for division
        case 'fa-percent': return modulus;
    }
}

// Update the display with the pressed number
function getNumber(buttonText) {
    display.textContent += buttonText;
}

// Number button click event
numbers.forEach(number => {
    number.addEventListener("click", function() {
        getNumber(this.textContent);
    });
});

// Operator button click event
operators.forEach(operator => {
    operator.addEventListener("click", function() {
        if (display.textContent !== '') {
            if (num1 !== null && operatorOnDisplay) {
                // Perform the previous calculation
                num2 = parseFloat(display.textContent);
                result = operate(num1, getFunctionFromOperator(operatorOnDisplay), num2);

                display.textContent = result; // Show result
                num1 = result; // Update num1 with result
            } else {
                num1 = parseFloat(display.textContent); // First number
            }

            // Get operator class from Font Awesome icon
            operatorOnDisplay = this.querySelector('i').classList[1]; // Get the second class of <i> (icon class)
            display.textContent = ''; // Clear display for next input
        }
    });
});

// Evaluate button click event
evaluate.addEventListener("click", function() {
    if (display.textContent !== '' && num1 !== null && operatorOnDisplay) {
        num2 = parseFloat(display.textContent); // Capture the second number
        result = operate(num1, getFunctionFromOperator(operatorOnDisplay), num2);

        display.textContent = result; // Display the final result
        num1 = result; // Store the result for further operations
        operatorOnDisplay = null; // Reset the operator
    }
});

let functions = document.querySelectorAll(".func");

functions.forEach(func => {
    func.addEventListener("click", function() {
        if(this.textContent == "AC") {
            display.textContent = '';
        }
    });
});

