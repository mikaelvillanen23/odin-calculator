let firstNum = "0";
let currentOperator = "";
let secondNum = "";
let isResult = false;
const primaryDisplay = document.querySelector(".primaryDisplay");
const secondaryDisplay = document.querySelector(".secondaryDisplay");

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
function updateDisplays() {
  if (!isResult) secondaryDisplay.textContent = "";

  primaryDisplay.textContent = `${firstNum} ${currentOperator} ${secondNum}`;
}
function initializeValues() {
  firstNum = "0";
  currentOperator = "";
  secondNum = "";
  isResult = false;
  secondaryDisplay.textContent = "";
}
function clearDisplays() {
  initializeValues();
  updateDisplays();
}
function deleteLastChar() {
  if (secondNum) {
    secondNum = secondNum.slice(0, -1);
  } else if (currentOperator) {
    if (isResult) {
      return;
    } else currentOperator = "";
  } else {
    if (firstNum.length > 1 && !isResult) {
      firstNum = firstNum.slice(0, -1);
    } else {
      firstNum = "0";
    }
  }
  isResult = false;
  updateDisplays()
}
function addDecimalPoint() {
  if (primaryDisplay.textContent.includes(":)") || isResult) return;

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
  updateDisplays();
}
function toggleSign() {
  if (primaryDisplay.textContent.includes(":)") || isResult) return;

  if (secondNum) {
    if (secondNum.includes("-")) {
      secondNum = secondNum.slice(1);
    } else {
      secondNum = "-" + secondNum;
    }
  } else if (firstNum.includes("-")) {
     firstNum = firstNum.slice(1);
  } else {
    firstNum = "-" + firstNum;
  }
  updateDisplays();
}
function evaluateprimaryDisplayContent() {
  if (!secondNum) return;

  const a = Number(firstNum);
  const b = Number(secondNum);
  const operator = currentOperator;

  initializeValues();

  if (isNaN(a) || isNaN(b)) {
    primaryDisplay.textContent = "Error :)";
  } else if (operator === "÷" && (b === 0 || b === -0)) {
    primaryDisplay.textContent = "Can't divide by zero :)";
  } else {
    firstNum = (operate(operator, a, b));
    isResult = true;
    updateDisplays();
    secondaryDisplay.textContent = `${a} ${operator} ${b} =`;
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
    isResult = false;
    updateDisplays();
  });
});

const operators = document.querySelectorAll(".operator");
operators.forEach((button) => {
  button.addEventListener("pointerdown", () => {
    if (primaryDisplay.textContent.includes(":)")) return;
    if (secondNum) evaluateprimaryDisplayContent();
    updateOperator(button.textContent);
    updateDisplays();
  });
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("pointerdown", clearDisplays)

const deleteButton = document.querySelector("#del");
deleteButton.addEventListener("pointerdown", deleteLastChar);

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("pointerdown", evaluateprimaryDisplayContent);

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