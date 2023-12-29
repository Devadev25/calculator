window.onload=()=>{
    document.getElementById("display").focus()
}
function clearInput() {
    document.querySelector('input[name="answer"]').value = '';
  }
  
  function deleteLastChar() {
    const currentInput = document.querySelector('input[name="answer"]').value;
    document.querySelector('input[name="answer"]').value = currentInput.substr(0, currentInput.length - 1);
  }
  
  function appendToInput(value) {
    document.querySelector('input[name="answer"]').value += value;
  }
  
  function calculateResult() {
    document.querySelector('input[name="answer"]').value = eval(document.querySelector('input[name="answer"]').value);
  }
  