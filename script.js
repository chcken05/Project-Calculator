let fNumber = null;
let sNumber = null;
let operator = "";
let displayValue = "";
let resultCalculated = false;
let percentageFlag = false;
let display = document.getElementById("display");
const opButtons = document.querySelectorAll(".op");
const numberButtons = document.querySelectorAll(".number");

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if (y === 0) {
    fNumber = null;
    sNumber = null;
    operator = "";
    displayValue = "0";
    updateDisplay();
    alert("Cannot divide by zero!");
    return null;
  }
  return parseFloat((x / y).toFixed(2));
}

function operate(x, y, op) {
  switch (op) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "/":
      return divide(x, y);
    default:
      return null;
  }
}

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let numberValue = e.target.textContent;
    if (resultCalculated) {
      displayValue = numberValue;
      resultCalculated = false;
    } else {
      displayValue = displayValue === "0" ? numberValue : displayValue + numberValue;
    }
    updateDisplay();
  });
});

opButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (fNumber === null) {
      fNumber = parseFloat(displayValue);
    } else if (operator !== "" && displayValue !== "") {
      sNumber = parseFloat(displayValue);
      let result = operate(fNumber, sNumber, operator);
      if (result !== null) {
        displayValue = result.toString();
        updateDisplay();
        fNumber = result;
      }
    }
    operator = e.target.textContent;
    displayValue = "";
  });
});

document.getElementById("equal").addEventListener("click", () => {
  if (fNumber !== null && operator !== "" && displayValue !== "") {
    sNumber = parseFloat(displayValue);
    let result = operate(fNumber, sNumber, operator);
    if (result !== null) {
      displayValue = result.toString();
      updateDisplay();
      fNumber = result;
      operator = "";
      resultCalculated = true;
    }
  }
});

document.querySelector("#percentage").addEventListener("click", () => {
  convertPercentage();
});

document.querySelector("#clear").addEventListener("click", () => {
  fNumber = null;
  sNumber = null;
  operator = "";
  displayValue = "0";
  updateDisplay();
});

document.querySelector("#signNumber").addEventListener("click", () => {
  if (displayValue !== "") {
    displayValue = (parseFloat(displayValue) * -1).toString();
    updateDisplay();
  }
});

function updateDisplay() {
  display.textContent = displayValue;
}

function convertPercentage() {
  if (!percentageFlag && displayValue !== "") {
    percentageFlag = true;
    displayValue = (parseFloat(displayValue) / 100).toString();
    updateDisplay();
  } else if (percentageFlag && displayValue !== "") {
    percentageFlag = false;
    displayValue = (parseFloat(displayValue) * 100).toString();
    updateDisplay();
  }
}
