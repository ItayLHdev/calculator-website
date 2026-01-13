function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return "Something Went Wrong :(";
    return a / b;
}

let firstNum = "";
let secondNum = "";
let operator = "";
let isOperatorClicked = false;

function operate(a = 0, operator, b = 0) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
        case "×":
            return multiply(a, b);
        case "/":
        case "÷":
            return divide(a, b);
        default:
            return "Something Went Wrong :(";
    }
}

const operators = document.querySelectorAll(".operator");
operators.forEach((sign) => {
    sign.addEventListener("click", () => {
        if (firstNum && operator && secondNum) {
            firstNum = operate(firstNum, operator, secondNum);
            secondNum = ""
        }
        operator = sign.textContent;
        display.textContent += operator;
        isOperatorClicked = true;
    })
})

const display = document.querySelector(".display");
function updateNumbers(val) {
    if (isOperatorClicked) {
        if (val === "." && secondNum.includes(".")) return;
        secondNum += val;
        display.textContent += val;
    } else {
        if (val === "." && firstNum.includes(".")) return;
        firstNum += val;
        display.textContent += val;
    }
}

const digits = document.querySelectorAll(".digit");
digits.forEach((digit) => {
    digit.addEventListener("click", () => {
        if (!firstNum && !operator && !secondNum) {
            display.textContent = "";
        }
        updateNumbers(digit.textContent);
    });
})

function roundNumber(number, digits) {
    const multiple = Math.pow(10, digits);
    const roundedNum = Math.round(number * multiple) / multiple;
    return roundedNum;
}

const equalSign = document.querySelector(".equal")
equalSign.addEventListener("click", () => {
    if (!firstNum && !operator && !secondNum) return;
    firstNum = operate(firstNum, operator, secondNum)
    if (firstNum === "Something Went Wrong :(") {
        display.textContent = "Something Went Wrong :(";
    } else {
        display.textContent = roundNumber(firstNum, 5);
    }
    firstNum = "";
    secondNum = "";
    operator = "";
    isOperatorClicked = false;
})

const clearBtn = document.querySelector(".clear");
function clearCalculator() {
    firstNum = "";
    secondNum = "";
    operator = "";
    isOperatorClicked = false;
    display.textContent = "";
}
clearBtn.addEventListener("click", clearCalculator)

const undoBtn = document.querySelector(".undo");
undoBtn.addEventListener("click", () => {
    if (isOperatorClicked) {
        secondNum = secondNum.slice(0, -1);
    } else {
        firstNum = firstNum.slice(0, -1);
    }
    display.textContent = firstNum + operator + secondNum;
})

document.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (!firstNum && !operator && !secondNum) {
        display.textContent = "";
    }
    if ("1234567890.".includes(e.key)) {
        updateNumbers(e.key);
    }
    if ("+-/*".includes(e.key)) {
        if (firstNum && operator && secondNum) {
            firstNum = operate(firstNum, operator, secondNum);
            secondNum = ""
        }
        operator = e.key;
        display.textContent += operator;
        isOperatorClicked = true;
    }
    if (e.key === "Enter") {
        equalSign.click();
    }
    if (e.key === "Backspace") {
        undoBtn.click();
    }
    if (e.key.toLowerCase() === "c") {
        clearCalculator();
    }
})