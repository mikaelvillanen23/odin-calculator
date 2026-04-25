let firstNum = "0";
let currentOperator = "";
let secondNum = "";
let isResult = false;
const display = document.querySelector(".display");

function divide(a, b) {
  return a / b;
}
function multiply(a, b) {
  return a * b;
}
function subtract(a, b) {
  return a - b;
}
function add(a, b) {
  return a + b;
}
function operate(operator, a, b) {
  switch (operator) {
    case "÷":
      return divide(a, b);
      break;
    case "×":
      return multiply(a, b);
      break;
    case "−":
      return subtract(a, b);
      break;
    case "+":
      return add(a, b);
      break;
  }
}
function updateFirstNum(input) {
  if (firstNum && firstNum !== "0" && !isResult) {
    firstNum += input;
  } else {
    firstNum = input;
  }
}
function updateOperator(input) {
  switch (input) {
    case "÷":
      currentOperator = "÷";
      break;
    case "×":
      currentOperator = "×";
      break;
    case "−":
      currentOperator = "−";
      break;
    case "+":
      currentOperator = "+";
      break;
  }
}
function updateSecondNum(input) {
  if (secondNum && secondNum !== "0") {
    secondNum += input;
  } else {
    secondNum = input;
  }
}
function updateDisplay() {
  display.textContent = `${firstNum} ${currentOperator} ${secondNum}`;
}
function initializeValues() {
  firstNum = "0";
  currentOperator = "";
  secondNum = "";
}
function clearDisplay() {
  initializeValues();
  updateDisplay();
}
function deleteLastChar() {
  if (secondNum) {
    secondNum = secondNum.slice(0, -1);
  } else if (currentOperator) {
    currentOperator = "";
  } else {
    if (firstNum.length > 1 && !isResult) {
      firstNum = firstNum.slice(0, -1);
    } else {
      firstNum = "0";
    }
  }
  updateDisplay()
}
function addDecimalPoint() {
  if (display.textContent.includes(":)") || isResult) return;

  if (secondNum) {
    if (secondNum.includes(".")) {
      return;
    } else {
      secondNum += ".";
    }
  } else if (firstNum.includes(".")) {
     return;
  } else {
    firstNum += ".";
  }
  updateDisplay();
}
function toggleSign() {
  if (display.textContent.includes(":)") || isResult) return;

  if (secondNum) {
    if (secondNum.includes("-")) {
      secondNum = secondNum.slice(1);
    } else {
      secondNum = "-" + secondNum;
    }
  } else if (firstNum.includes("-")) { // tää kusee resultin tapauksessa
     firstNum = firstNum.slice(1);
  } else {
    firstNum = "-" + firstNum;
  }
  updateDisplay();
}
function evaluateDisplayContent() {
  if (!secondNum) return;

  const a = Number(firstNum);
  const b = Number(secondNum);
  const operator = currentOperator;

  initializeValues();

  if (isNaN(a) || isNaN(b)) {
    display.textContent = "Error :)";
  } else if (operator === "÷" && (b === 0 || b === -0)) {
    display.textContent = "Can't divide by zero :)";
  } else {
    firstNum = (operate(operator, a, b));
    isResult = true;
    updateDisplay();
  }
}


//button functionalities

const numberButtons = document.querySelectorAll(".numberButton");
numberButtons.forEach((button) => {
  button.addEventListener("pointerdown", () => {
    if (!currentOperator) {
      updateFirstNum(button.textContent);
    } else {
      updateSecondNum(button.textContent);
    }
    updateDisplay();
    isResult = false;
  });
});

const operators = document.querySelectorAll(".operator");
operators.forEach((button) => {
  button.addEventListener("pointerdown", () => {
    if (secondNum) evaluateDisplayContent();
    if (display.textContent.includes(":)")) return;

    updateOperator(button.textContent);
    updateDisplay();
  });
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("pointerdown", clearDisplay)

const deleteButton = document.querySelector("#del");
deleteButton.addEventListener("pointerdown", deleteLastChar);

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("pointerdown", evaluateDisplayContent);

const decimalButton = document.querySelector("#point");
decimalButton.addEventListener("pointerdown", addDecimalPoint);

const signButton = document.querySelector("#signToggle");
signButton.addEventListener("pointerdown", toggleSign);


// button click visual effect

let clickHeld = false;
const buttons = document.querySelectorAll(".button");
function togglePressed(elem) {
  if (clickHeld) elem.classList.toggle("pressed");
}
buttons.forEach((button) => {
  button.addEventListener("pointerleave", () => {
    togglePressed(button);
    clickHeld = false;
  });
  button.addEventListener("pointerdown", () => {
    clickHeld = true;
    togglePressed(button);
  });
  button.addEventListener("pointerup", () => {
    togglePressed(button);
    clickHeld = false;
  });
});
window.addEventListener("dragstart", (event) => {event.preventDefault()});

/*
TODO
- fix overflow
- show last operation on separate line after operation?
- round very long floats?
*/