let display = document.getElementById("display");
let preview = document.getElementById("preview");
let memoryIndicator = document.getElementById("memory-indicator");
let memory = 0;
let shouldClearOnNextInput = false;

function updateMemoryIndicator() {
  if (memory !== 0) {
    memoryIndicator.style.display = "block";
  } else {
    memoryIndicator.style.display = "none";
  }
}

function press(val) {
  if (shouldClearOnNextInput && ((!isNaN(val) && val !== '') || val === '.')) {
    display.value = "";
    preview.value = "";
    shouldClearOnNextInput = false;
  }

  let lastChar = display.value.slice(-1);

  if ("+-*/".includes(val) && "+-*/".includes(lastChar)) {
    display.value = display.value.slice(0, -1) + val;
    shouldClearOnNextInput = false;
    updatePreview();
    return;
  }

  if (val === ".") {
    let parts = display.value.split(/[\+\-\*\/]/); 
    let lastNumber = parts[parts.length - 1];
    if (lastNumber.includes(".")) return;
  }

  display.value += val;
  shouldClearOnNextInput = false;
  updatePreview();
}

function updatePreview() {
  if (display.value && !display.value.endsWith("+") && !display.value.endsWith("-") && 
      !display.value.endsWith("*") && !display.value.endsWith("/")) {
    preview.value = evalLeftToRight(display.value);
  }
}

function calculate() {
  try {
    let result = evalMDAS(display.value);
    preview.value = result;
    display.value = result;
    shouldClearOnNextInput = true;
  } catch {
    preview.value = "Error";
    shouldClearOnNextInput = true;
  }
}

function clearDisplay() {
  display.value = "";
  preview.value = "";
  shouldClearOnNextInput = false;
}

function backspace() {
  display.value = display.value.slice(0, -1);
  shouldClearOnNextInput = false;

  if (display.value !== "") {
    updatePreview();
  } else {
    preview.value = "";
  }
}

function evalLeftToRight(expr) {
  if (!expr) return "";
  
  let tokens = expr.match(/(\d+(\.\d+)?|[+\-*/])/g);
  if (!tokens || tokens.length === 0) return "";

  let result = parseFloat(tokens[0]);
  if (isNaN(result)) return "";

  for (let i = 1; i < tokens.length; i += 2) {
    if (i + 1 >= tokens.length) break;
    let op = tokens[i];
    let num = parseFloat(tokens[i + 1]);
    if (isNaN(num)) break;
    
    if (op === "+") result += num;
    else if (op === "-") result -= num;
    else if (op === "*") result *= num;
    else if (op === "/") result /= num;
  }
  
  return result.toString();
}

function memoryAdd() {
  let currentValue = parseFloat(display.value) || 0;
  memory += currentValue;
  updateMemoryIndicator();
}

function memorySubtract() {
  let currentValue = parseFloat(display.value) || 0;
  memory -= currentValue;
  updateMemoryIndicator();
}

function memoryRecall() {
  display.value = memory.toString();
  preview.value = memory.toString();
  shouldClearOnNextInput = true;
}

function memoryClear() {
  memory = 0;
  updateMemoryIndicator();
}

function evalMDAS(expr) {
  if (!expr) return "";
  
  let tokens = expr.match(/(\d+(\.\d+)?|[+\-*/])/g);
  if (!tokens || tokens.length === 0) return "";

  let numbers = [];
  let operators = [];
  
  for (let i = 0; i < tokens.length; i++) {
    if (i % 2 === 0) {
      numbers.push(parseFloat(tokens[i]));
    } else {
      operators.push(tokens[i]);
    }
  }

  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '*' || operators[i] === '/') {
      let result;
      if (operators[i] === '*') {
        result = numbers[i] * numbers[i + 1];
      } else {
        result = numbers[i] / numbers[i + 1];
      }
      
      numbers.splice(i, 2, result);
      operators.splice(i, 1);
      i--;
    }
  }

  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '+' || operators[i] === '-') {
      let result;
      if (operators[i] === '+') {
        result = numbers[i] + numbers[i + 1];
      } else {
        result = numbers[i] - numbers[i + 1];
      }
      
      numbers.splice(i, 2, result);
      operators.splice(i, 1);
      i--;
    }
  }

  return numbers[0].toString();
}

updateMemoryIndicator();
