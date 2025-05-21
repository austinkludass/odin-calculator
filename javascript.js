let first = "0";
let second = "0";
let isFirst = true;
let operand = "";
const operands = ["+", "-", "x", "÷"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const validKeyboardInputs = ["-", "+", "/", "*", "=", ".", "Enter", "Backspace", "Escape"];

const resultDiv = document.querySelector(".current-num");
const historyDiv = document.querySelector(".history-num");

document.addEventListener('keydown', (event) => {
    if (numbers.includes(event.key) || validKeyboardInputs.includes(event.key)) {
        switch (event.key) {
            case "*":
                handleInput("x");
                break;
            case "/":
                handleInput("÷");
                break;
            default:
                handleInput(event.key);
                break;
        }
    }
});

const buttonContainer = document.querySelector(".container");
buttonContainer.addEventListener("click", (event) => {
    let target = event.target;
    handleInput(target.textContent);
});

function handleInput(str) {
    switch (str) {
        case "=":
        case "Enter":
            operate();
            break;
        case "CLEAR":
        case "Escape":
            clearDisplay();
            break;
        case "⌫":
        case "Backspace":
            handleBackspace();
            break;
        default:
            updateEquation(str);
            break;
    }
}

function handleBackspace() {
    if (isFirst) {
        const firstStr = first.toString().slice(0, -1);
        if (firstStr.length < 1) first = 0;
        else first = +firstStr;
    } else {
        const secondStr = second.toString().slice(0, -1);
        if (secondStr.length < 1) second = 0;
        else second = +secondStr;
    }
    updateDisplay();
}

function clearDisplay() {
    first = 0;
    second = 0;
    operand = "";
    isFirst = true;
    resultDiv.textContent = "0";
    historyDiv.textContent = "";
}

function updateEquation(char) {
    if (!numbers.includes(char) && !operands.includes(char)) return;
    if (!isFirst && operands.includes(char)) {
        operate();
        updateEquation(char);
    } else if (operands.includes(char)) {
        operand = char;
        isFirst = false;
        historyDiv.textContent = `${resultDiv.textContent} ${operand}`;
    } else if (isFirst) {
        if (first.toString() === "0" && char != ".") first = "";
        if (char === "." && first.split("").includes(char)) return;
        first = (first.toString() + char);
    } else {
        if (second.toString() === "0" && char != ".") second = "";
        if (char === "." && second.split("").includes(char)) return;
        second = (second.toString() + char);
    }
    updateDisplay();
}

function updateDisplay() {
    if (isFirst) {
        resultDiv.textContent = first;
    } else {
        resultDiv.textContent = second;
    }
}

function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function operate () {
    let result = 0;
    switch (operand) {
        case "+":
            result = add(+first, +second);
            break;
        case "-":
            result = subtract(+first, +second);
            break;
        case "x":
            result = multiply(+first, +second);
            break;
        case "÷":
            result = divide(+first, +second);
            break;
        default:
            result = first;
            break;
    }

    const rounded = Math.round((result + Number.EPSILON) * 100) / 100;
    resultDiv.textContent = rounded;
    first = rounded.toString();
    second = 0;
    operand = "";
    isFirst = true;
    historyDiv.textContent = "";
}