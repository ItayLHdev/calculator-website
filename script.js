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
    return a / b;
}

let firstNum = "";
let secondNum = "0";
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
        case "×":
            return multiply(a, b);
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
            display.textContent = firstNum
        }
        operator = sign.textContent;
        display.textContent += operator;
        isOperatorClicked = true;
    })
})

const display = document.querySelector(".display");
function updateNumbers(val) {
    if (isOperatorClicked) {
        secondNum += val;
        display.textContent += val;
    } else {
        firstNum += val;
        display.textContent += val;
    }
}

const digits = document.querySelectorAll(".digit");
digits.forEach((digit) => {
    digit.addEventListener("click", () => {
        updateNumbers(digit.textContent)
    });
})

const equalSign = document.querySelector(".equal")
equalSign.addEventListener("click", () => {
    firstNum = operate(firstNum, operator, secondNum)
    display.textContent = firstNum
    secondNum = "";
    isOperatorClicked = false;
})

const clearBtn = document.querySelector(".clear");
function clearCalculator() {
    firstNum = "";
    secondNum = "";
    operator = "";
    display.textContent = "";
}
clearBtn.addEventListener("click", clearCalculator)