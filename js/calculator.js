class Operation {
    constructor(symbol, func = () => {}) {
	this.symbol = symbol;
	this.func = func;
    }
}

const OPERATIONS = Object.freeze({
    ADD: new Operation("+", add),
    SUBTRACT: new Operation("-", subtract),
    MULTIPLY: new Operation("*", multiply),
    DIVIDE: new Operation("/", divide),
    EQUAL: undefined,
    UNDEFINED: undefined
});

const BUTTON_ID_TO_ACTION = Object.freeze({
});

const LEFT_OPERAND_DEFAULT_VALUE = "0";
const RIGHT_OPERAND_UNDEFINED_VALUE = "";
const CALC_OPERATION_UNDEFINED_VALUE = OPERATIONS.UNDEFINED;

const buttonContainer = document.querySelector(".calculator-buttons-container");

let currentDisplay = "";
let leftOperand = LEFT_OPERAND_DEFAULT_VALUE;
let rightOperand = RIGHT_OPERAND_UNDEFINED_VALUE;
let calcOperation = CALC_OPERATION_UNDEFINED_VALUE;

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

function operate(operandL, operandR, operation) {
    if (Object.values(OPERATIONS).includes(operation)) {
	return operation.func(operandL, operandR);
    }
    return undefined;
}
function buttonClicked(event) {
    BUTTON_ID_TO_ACTION[event.target.id]();
}

buttonContainer.addEventListener("click", buttonClicked);
