const toggleBtn = document.querySelector(".toggle-btn");
let theme = 1;

const screen = document.querySelector(".screen");

const digitBtns = document.querySelectorAll(".digit");
const increment = document.querySelector(".increment");
const decrement = document.querySelector(".decrement");
const multiplication = document.querySelector(".multiplication");
const division = document.querySelector(".division");
const dot = document.querySelector(".dot");
const equal = document.querySelector(".equal");
const del = document.querySelector(".del");
const reset = document.querySelector(".reset");

let currentInput = "";
let operator = null;
let operand1 = null;

/* Theme Toggle */
toggleBtn?.addEventListener("click", () => {
  theme = theme < 3 ? theme + 1 : 1;
  const body = document.body;

  body.classList.remove("second", "third");
  if (theme === 2) {
    body.classList.add("second");
  } else if (theme === 3) {
    body.classList.add("third");
  }
});

/* Calculator Functionality */
digitBtns.forEach((digitBtn) => {
  digitBtn.addEventListener("click", () => {
    currentInput += digitBtn.textContent;
    screen.textContent = currentInput;
  });
});

increment.addEventListener("click", () => setOperator("+"));
decrement.addEventListener("click", () => setOperator("-"));
multiplication.addEventListener("click", () => setOperator("*"));
division.addEventListener("click", () => setOperator("/"));

equal.addEventListener("click", () => {
  if (operator && operand1 !== null && currentInput) {
    const operand2 = parseInput(currentInput);
    let result;

    switch (operator) {
      case "+":
        result = operand1 + operand2;
        break;
      case "-":
        result = operand1 - operand2;
        break;
      case "*":
        result = operand1 * operand2;
        break;
      case "/":
        if (operand2 === 0) {
          screen.textContent = "Error";
          currentInput = "";
          operator = null;
          operand1 = null;
          return;
        }
        result = operand1 / operand2;
        break;
    }

    screen.textContent = result.toString().replace(".", ",");
    currentInput = result.toString().replace(".", ",");
    operator = null;
    operand1 = null;
  }
});

dot.addEventListener("click", () => {
  if (!currentInput.includes(",")) {
    currentInput += ",";
    screen.textContent = currentInput;
  }
});

reset.addEventListener("click", () => {
  currentInput = "";
  operator = null;
  operand1 = null;
  screen.textContent = "0";
});

del.addEventListener("click", () => {
  currentInput = currentInput.slice(0, -1);
  screen.textContent = currentInput || "0";
});

function setOperator(op) {
  if (currentInput) {
    operand1 = parseInput(currentInput);
    operator = op;
    currentInput = "";
  }
}

function parseInput(input) {
  return parseFloat(input.replace(",", "."));
}
