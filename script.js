let firstNum = "0";
let currentOperator = "";
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
    if (firstNum.length > 1) {
      firstNum = firstNum.slice(0, -1);
    } else {
      firstNum = "0";
    }
  }
  updateDisplay()
}
function addDecimalPoint() {
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
function evaluateDisplayContent() {
  if (!secondNum) return;

  const a = Number(firstNum);
  const b = Number(secondNum);
  const operator = currentOperator;

  initializeValues();

  if (!b) {
    display.textContent = "Nope, can't divide by zero.";
  } else {
    firstNum = (operate(operator, a, b)).toString();
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
  });
});

const operators = document.querySelectorAll(".operator");
operators.forEach((button) => {
  button.addEventListener("pointerdown", () => {
    if (display.textContent.includes("Nope")) return;

    updateOperator(button.textContent);
    updateDisplay();
  });
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("pointerdown", clearDisplay)

const deleteButton = document.querySelector("#del");
deleteButton.addEventListener("pointerdown", deleteLastChar);

const decimalButton = document.querySelector("#point");
decimalButton.addEventListener("pointerdown", addDecimalPoint);

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("pointerdown", evaluateDisplayContent);


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
- sign toggle? -> first char can also be "-" ! (fix this)
- evaluation when choosing operator after secondNum
- fix overflow
- round very long floats?
*/