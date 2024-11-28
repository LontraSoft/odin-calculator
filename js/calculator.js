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
    "one-button": () => pressNumber("1"),
    "two-button": () => pressNumber("2"),
    "three-button": () => pressNumber("3"),
    "four-button": () => pressNumber("4"),
    "five-button": () => pressNumber("5"),
    "six-button": () => pressNumber("6"),
    "seven-button": () => pressNumber("7"),
    "eight-button": () => pressNumber("8"),
    "nine-button": () => pressNumber("9"),
    "zero-button": () => pressNumber("0"),
    "plus-button": () => pressOperation(OPERATIONS.ADD),
    "minus-button": () => pressOperation(OPERATIONS.SUBTRACT),
    "multiply-button": () => pressOperation(OPERATIONS.MULTIPLY),
    "divide-button": () => pressOperation(OPERATIONS.DIVIDE),
    "equals-button": () => pressOperation(OPERATIONS.EQUAL),
});

const LEFT_OPERAND_DEFAULT_VALUE = "0";
const RIGHT_OPERAND_UNDEFINED_VALUE = "";
const CALC_OPERATION_UNDEFINED_VALUE = OPERATIONS.UNDEFINED;

const displayElement = document.querySelector(".display");
const buttonContainer = document.querySelector(".calculator-buttons-container");

let currentDisplay = "";
let leftOperand = LEFT_OPERAND_DEFAULT_VALUE;
let rightOperand = RIGHT_OPERAND_UNDEFINED_VALUE;
let calcOperation = CALC_OPERATION_UNDEFINED_VALUE;

function isOperationDefined() {
    return calcOperation !== CALC_OPERATION_UNDEFINED_VALUE;
}

function isRightOperandDefined() {
    return rightOperand != RIGHT_OPERAND_UNDEFINED_VALUE;
}

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

function updateDisplay() {
    let leftDisplay = leftOperand;
    let operatorDisplay = isOperationDefined() ? " " + calcOperation.symbol : "";
    let rightDisplay = isRightOperandDefined() ? " " + rightOperand : "";
    displayElement.textContent = `${leftDisplay}${operatorDisplay}${rightDisplay}`;
}

function pressNumber(singleDigitNumber) {
    num = Number(singleDigitNumber);
    if (num < 0 || num > 9 || !Number.isInteger(num)) {
	return;
    }

    let isModifyingLeftOperand = !isOperationDefined();
    if (isModifyingLeftOperand) {
	if (leftOperand !== "0") {
	    leftOperand += singleDigitNumber;
	}
	else {
	    leftOperand = singleDigitNumber;
	}
    }
    else {
	if (rightOperand === "0") {
	    rightOperand = singleDigitNumber;
	}
	else {
	    rightOperand += singleDigitNumber;
	}
    }
}
function pressEquals() {
    if (!isRightOperandDefined()) {
	calcOperation = OPERATIONS.UNDEFINED;
	return;
    }

    leftOperand = String(operate(Number(leftOperand), Number(rightOperand), calcOperation).toFixed(4));
    calcOperation = CALC_OPERATION_UNDEFINED_VALUE;
    rightOperand = RIGHT_OPERAND_UNDEFINED_VALUE;
}

function pressOperation(operation) {
    if (calcOperation === OPERATIONS.DIVIDE && Number(rightOperand) === 0) {
	alert("Cannot divide by yourself, sorry about that");
	return;
    }
    
    if (operation === OPERATIONS.EQUAL) {
	pressEquals();
	return;
    }
    
    if (isOperationDefined() && isRightOperandDefined()) {
	pressEquals();
    }

    calcOperation = operation;
}
function buttonClicked(event) {
    BUTTON_ID_TO_ACTION[event.target.id]();
    updateDisplay();
}

buttonContainer.addEventListener("click", buttonClicked);
