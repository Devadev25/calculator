
window.onload = () => {
  document.getElementById("display").focus();
}

function clearInput() {
  document.querySelector('input').value = '';
}

function deleteLastChar() {
  const currentInput = document.querySelector('input').value;
  document.querySelector('input').value = currentInput.substr(0, currentInput.length - 1);
}

function appendToInput(value) {
  document.querySelector('input').value += value;
}

function calculateResult() {
  const currentInput = document.querySelector('input').value;
  const result = customCalculate(currentInput);

  
  localStorage.setItem('result',result);
   sessionStorage.setItem('result',result)

  document.querySelector('input').value = result;
}

function customCalculate(input) {
  try {
    // Regular expression to match valid operators (+, -, *, /)
    const operatorRegex = /[-+*/]/;
    // Split the input into operands and operator
    const [operand1, operator, operand2] = input.split(operatorRegex);
    
    // Convert operands to numbers
    const num1 = parseInt(operand1);
    const num2 = parseInt(operand2);

    // Perform the calculation based on the operator
    switch (operator) {
      case '+':
        return num1 + num2;

      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        
        return num1 / num2;
      default:
        throw new Error('Invalid operator');
    }
  } catch (error) {
    return 'Error';
  }
}