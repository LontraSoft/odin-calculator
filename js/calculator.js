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
});

let currentDisplay = "";
let leftOperand = "0";
let rightOperand = "";
let calcOperation = OPERATIONS.UNDEFINED;

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
