function add (num1, num2) {
    return num1 + num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function divide (num1, num2) {
    return num1 / num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function operate(num1, operator, num2) {
    return operator(num1, num2);
}

function getNumber(buttonText) {
    calcScreen.textContent += buttonText;
}

let calcScreen = document.querySelector(".display");
let numbers = document.querySelectorAll(".number");

numbers.forEach(number => {
    number.addEventListener("click", function() {
        getNumber(this.textContent);
    })
})

let operators = document.querySelectorAll(".operator");
let num1 = null;
let num2 = null;
let operatorOnDisplay = null;

function getFunction(selectOperator) {
    switch(selectOperator) {
        case 'fa-plus': return add;
        case 'fa-minus': return subtract;
        case 'fa-xmark': return multiply;
        case 'fa-divide': return divide;
        default: return null;
    }
}

operators.forEach(operator => {
    operator.addEventListener("click", function() {
        if (calcScreen.textContent !== '') {
            if (num1 === null) {
                num1 = parseFloat(calcScreen.textContent); // First number
            } else if (operatorOnDisplay !== null) {
                num2 = parseFloat(calcScreen.textContent); // Second number
                let result = operate(num1, operatorOnDisplay, num2);
                calcScreen.textContent = result;  // Update screen with result
                num1 = result;  // Store result for further operations
            }
            // Clear screen for the next number
            calcScreen.textContent = ''; 

            // Get the correct operator function by class
            operatorOnDisplay = getFunction(this.querySelector('i').classList[1]);
        }
    });
});

let result;
let equals = document.querySelector(".evaluate");
equals.addEventListener("click", function() {
    if (calcScreen.textContent !== '') {
        num2 = parseFloat(calcScreen.textContent);
        let result = operate(num1, operatorOnDisplay, num2);
        calcScreen.textContent = result;  // Show the result
        num1 = result;  // Store result for the next calculation
        operatorOnDisplay = null;  // Reset operator for next operation
    }
});

let clear = document.querySelector(".clear");
clear.addEventListener("click", function() {
    calcScreen.textContent = calcScreen.textContent.slice(0, -1);
})

let reset = document.querySelector(".reset");
reset.addEventListener("click", function() {
    calcScreen.textContent = '';
    num1 = null;
    num2 = null;
    operatorOnDisplay = null;
})

