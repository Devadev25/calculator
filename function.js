window.onload = () => {
  document.getElementById("display").focus();
};

function clearInput() {
  document.querySelector("input").value = "";
}

function deleteLastChar() {
  const currentInput = document.querySelector("input").value;
  document.querySelector("input").value = currentInput.slice(0, -1);
}

function appendToInput(value) {
  document.querySelector("input").value += value;
}

function calculateResult() {
  const currentInput = document.querySelector("input").value;
  const result = evaluateExpression(currentInput);

  localStorage.setItem(document.querySelector("input").value, result);
  sessionStorage.setItem(document.querySelector("input").value, result);

  document.querySelector("input").value = result;
}

function evaluateExpression(expression) {
  const tokens = regularExp(expression);
  const postfixExpression = infixToPostfix(tokens);
  const result = evaluateValidation(postfixExpression);
  return result;
}

function regularExp(expression) {
  const spacedExpression = expression.replace(/([+\-*/()])/g, " $1 ");
  const spacedNegativeExpression = spacedExpression.replace(
    /-\s(\d+\.\d+|\d+)/g,
    "-$1"
  );
  return spacedNegativeExpression.match(/(\d+\.\d+|\d+|[+\-*/()])/g);
}

function infixToPostfix(infixTokens) {
  const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };
  const stack = [];
  const postfixTokens = [];

  for (const token of infixTokens) {
    if (!isNaN(token) || token.includes(".")) {
      postfixTokens.push(token);
    } else {
      while (
        stack.length &&
        precedence[stack[stack.length - 1]] >= precedence[token]
      ) {
        postfixTokens.push(stack.pop());
      }
      stack.push(token);
    }
  }

  while (stack.length) {
    postfixTokens.push(stack.pop());
  }

  return postfixTokens;
}

function evaluateValidation(postfixTokens) {
  const stack = [];

  for (const token of postfixTokens) {
    if (!isNaN(token) || token.includes(".")) {
      stack.push(parseFloat(token));
    } else {
      const operand2 = stack.pop();
      const operand1 = stack.pop();

      switch (token) {
        case "+":
          stack.push(operand1 + operand2);
          break;
        case "-":
          stack.push(operand1 - operand2);
          break;
        case "*":
          stack.push(operand1 * operand2);
          break;
        case "/":
          if (operand2 === 0) {
            throw new Error("Division by zero");
          }
          stack.push(operand1 / operand2);
          break;
      }
    }
  }

  if (stack.length !== 1) {
    throw new Error("Invalid expression");
  }
  return stack.pop();
}
