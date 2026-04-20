let firstNum;
let operator;
let secondNum;

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
function operate(operator, a, b) {
  switch (operator) {
    case "+":
      add(a, b);
      break;
    case "-":
      subtract(a, b);
      break;
    case "x":
      multiply(a, b);
      break;
    case "/":
      divide(a, b);
      break;
  }
}
function updateFirstNum(input) {
  firstNum = input;
}
function updateOperator(input) {
  operator = input;
}
function updateSecondtNum(input) {
  secondNum = input;
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
