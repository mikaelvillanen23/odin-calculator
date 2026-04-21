let firstNum = "";
let operator = "";
let secondNum = "";

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
      divide(a, b);
      break;
    case "×":
      multiply(a, b);
      break;
    case "−":
      subtract(a, b);
      break;
    case "+":
      add(a, b);
      break;
  }
}
function updateFirstNum(input) {
  if (firstNum && firstNum !== "0") {
    firstNum += input;
  } else {
    firstNum = input;
  }
}
function updateOperator(input) {
  if (secondNum) return;

  switch (input) {
    case "÷":
      operator = "÷";
      break;
    case "×":
      operator = "×";
      break;
    case "−":
      operator = "−";
      break;
    case "+":
      operator = "+";
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
  display.textContent = `${firstNum} ${operator} ${secondNum}`;
}
function clearDisplay() {
  firstNum = "0";
  operator = "";
  secondNum = "";
  updateDisplay()
}
function deleteLastChar() {
  if (secondNum) {
    secondNum = secondNum.slice(0, -1);
  } else if (operator) {
    operator = "";
  } else {
    if (firstNum.length > 1) {
      firstNum = firstNum.slice(0, -1);
    } else {
      firstNum = "0";
    }
  }
  updateDisplay()
}

// button click effect

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

//button press to display functionality

const numberButtons = document.querySelectorAll(".numberButton");
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!operator) {
      updateFirstNum(button.textContent);
    } else {
      updateSecondNum(button.textContent);
    }
    updateDisplay();
  });
});

const operators = document.querySelectorAll(".operator");
operators.forEach((button) => {
  button.addEventListener("click", () => {
    updateOperator(button.textContent);
    updateDisplay();
  });
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearDisplay)

const deleteButton = document.querySelector("#del");
deleteButton.addEventListener("click", deleteLastChar);