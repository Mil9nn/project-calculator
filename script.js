// Math functions
function sum(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function divide(num1, num2) {
    if (num2 === 0) return 'Error'; // Handle division by zero
    return num1 / num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function modulus(num1, num2) {
    return num1 % num2;
}

function operate(num1, operator, num2) {
    return operator(num1, num2);
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
        case 'fa-plus': return sum;
        case '+': return sum; 
        case 'fa-minus': return subtract; 
        case '-': return subtract;
        case 'fa-xmark': return multiply;
        case '*': return multiply; 
        case 'fa-divide': return divide;
        case '/': return divide;
        case 'fa-percent': return modulus;
        case '%': return modulus;
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
                
                num2 = parseFloat(display.textContent);
                result = operate(num1, getFunctionFromOperator(operatorOnDisplay), num2);
                display.textContent = result;
                num1 = result; 
            } else {
                num1 = parseFloat(display.textContent); // First number
            }

            
            operatorOnDisplay = this.querySelector('i').classList[1]; // Get the second class of <i> (icon class)
            display.textContent = ''; // Clear display for next input
        }
    });
});

// Evaluate button click event
evaluate.addEventListener("click", function() {
    if (display.textContent !== '' && num1 !== null && operatorOnDisplay) {
        num2 = parseFloat(display.textContent);
        result = operate(num1, getFunctionFromOperator(operatorOnDisplay), num2);
        display.textContent = result; 
        num1 = result; // Store the result for further operations
        operatorOnDisplay = null; // Reset the operator
    }
});

let functions = document.querySelectorAll(".func");

functions.forEach(func => {
    func.addEventListener("click", function() {
        if(this.textContent == "AC") {
            display.textContent = '';
            num1 = null;
            num2 = null;
            operatorOnDisplay = null;
        } else if (this.querySelector('.fa-delete-left')) {
            display.textContent = display.textContent.slice(0, -1);
        }
    });
});

// KeyBoard Events...
document.addEventListener("keydown", function(event) {
    const key = event.key;

    // Handle number and decimal point
    if (!isNaN(key) || key === '.') {
        display.textContent += key;
    } 
    // Handle operators
    else if (['+', '-', '*', '/', '%'].includes(key)) {
        handleOperator(key);
    }
    // Handle Enter
    else if (key === 'Enter') {
        if (num1 != null && operatorOnDisplay && display.textContent !== '') {
            num2 = parseFloat(display.textContent);
            result = operate(num1, getFunctionFromOperator(operatorOnDisplay), num2);
            display.textContent = result;
            num1 = result;
            operatorOnDisplay = null;
        }
    }
    // Handle Backspace
    else if (key === 'Backspace') {
        display.textContent = display.textContent.slice(0, -1);
    }
});

// Function to handle operators in keypress and click events
function handleOperator(key) {
    if (num1 == null) {
        num1 = parseFloat(display.textContent);
    } else if (display.textContent !== '' && operatorOnDisplay) {
        num2 = parseFloat(display.textContent);
        result = operate(num1, getFunctionFromOperator(operatorOnDisplay), num2);
        display.textContent = result;
        num1 = result;  // Store result for the next operation
    }
    operatorOnDisplay = key;
    display.textContent = '';
}



