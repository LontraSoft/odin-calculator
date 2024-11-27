const OPERATIONS = Object.freeze({
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide
});

let operandLeft = 0;
let operandRight = 0;
let operator = "?";

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
	return NaN;
    }
    
    return num1 / num2;
}

function operate(operandL, operandR, operator) {
    if (operator in OPERATIONS) {
	return OPERATIONS[operator](operandL, operandR);
    }
    return undefined;
}
