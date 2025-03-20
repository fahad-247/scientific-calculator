// script.js
function clearDisplay() {
  document.getElementById('display').value = '';
}

function appendToDisplay(value) {
  document.getElementById('display').value += value;
}

function calculate() {
  let displayValue = document.getElementById('display').value;

  // Handling the calculation with math functions
  try {
    displayValue = displayValue.replace('^', '**'); // Replace ^ with ** for exponentiation
    displayValue = displayValue.replace('sqrt(', 'Math.sqrt(');
    displayValue = displayValue.replace('Math.PI', Math.PI);
    displayValue = displayValue.replace('Math.E', Math.E);

    // Use eval for mathematical expressions
    let result = eval(displayValue);
    if (result === undefined || result === Infinity || result === -Infinity) {
      throw new Error('Math Error');
    }
    document.getElementById('display').value = result;
  } catch (error) {
    document.getElementById('display').value = 'Error';
  }
}
