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
  console.log(value);
  document.querySelector("input").value;
  document.querySelector("input").value += value;
}

function calculateResult() {
  const currentInput = document.querySelector("input").value.trim();
  if (currentInput === "") {
    // Handle empty input gracefully
    return;
  }

  try {
    const result = evaluateExpression(currentInput);

    localStorage.setItem(currentInput, result);
    sessionStorage.setItem(currentInput, result);

    document.querySelector("input").value = result;
  } catch (error) {
    // Handle errors and display the error
    console.error(error.message);
  }
}

function evaluateExpression(expression) {
  const elements = regularExp(expression);
  const postfixForm = infixToPostfixConversion(elements);
  const result = postfixExpressionEvaluator(postfixForm);
  return result;
}

function regularExp(expression) {
  const readableExpression = expression.replace(/([+\-*/()])/g, " $1 ");
  const formattedNegatives = readableExpression.replace(
    /-\s(\d+\.\d+|\d+)/g,
    "-$1"
  );
  console.log(formattedNegatives);
  return formattedNegatives.match(/(\d+\.\d+|\d+|[+\-*/()])/g) || [];
}

function infixToPostfixConversion(infixTokens) {
  const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };
  const stack = [];
  const postfixElements = [];

  for (const val of infixTokens) {
    console.log(val);
    if (!isNaN(val) || val.includes(".")) {
      postfixElements.push(val);
    } else {
      while (
        stack.length &&
        precedence[stack[stack.length - 1]] >= precedence[val]
      ) {
        postfixElements.push(stack.pop());
      }
      stack.push(val);
    }
  }

  while (stack.length) {
    postfixElements.push(stack.pop());
  }
  console.log(postfixElements);
  return postfixElements;
}

function postfixExpressionEvaluator(postfixValues) {
  const postfixResultsStack = [];

  for (const val of postfixValues) {
    if (!isNaN(val) || val.includes(".")) {
      postfixResultsStack.push(parseFloat(val));
    } else {
      const operand2 = postfixResultsStack.pop();
      const operand1 = postfixResultsStack.pop();

      switch (val) {
        case "+":
          postfixResultsStack.push(operand1 + operand2);
          break;
        case "-":
          postfixResultsStack.push(operand1 - operand2);
          break;
        case "*":
          postfixResultsStack.push(operand1 * operand2);
          break;
        case "/":
          if (operand2 === 0) {
            throw new Error("Division by zero");
          }
          postfixResultsStack.push(operand1 / operand2);
          break;
        default:
          throw new Error("Invalid operator: " + val);
      }
    }
  }

  if (postfixResultsStack.length !== 1) {
    throw new Error("Invalid expression");
  }
  return postfixResultsStack.pop();
}
