// Function to clear the display
function clearDisplay() {
  document.getElementById('display').value = '';
}

// Function to append values to the display
function appendToDisplay(value) {
  const display = document.getElementById('display');
  // Check if it's a scientific function (sin, cos, etc.), then ensure proper parentheses
  if (value === 'sin(' || value === 'cos(' || value === 'tan(' || value === 'sqrt(') {
    // Automatically append closing parentheses if it's not already there
    if (!display.value.endsWith(')')) {
      display.value += value;
    } else {
      display.value = display.value.slice(0, -1) + value;
    }
  } else {
    // For all other buttons, append normally
    display.value += value;
  }
}

// Function to calculate the expression
function calculate() {
  let expression = document.getElementById('display').value;

  // Ensure any open parentheses have matching closing parentheses.
  let openParenthesesCount = (expression.match(/\(/g) || []).length;
  let closeParenthesesCount = (expression.match(/\)/g) || []).length;

  // If there are unclosed parentheses, append the necessary closing parentheses
  if (openParenthesesCount > closeParenthesesCount) {
    expression += ')'.repeat(openParenthesesCount - closeParenthesesCount);
  }

  try {
    // Handling special cases such as square roots, powers, etc.
    // Replace the functions with their JavaScript equivalents.
    expression = expression.replace(/sqrt\((.*)\)/g, 'Math.sqrt($1)');
    expression = expression.replace(/sin\((.*)\)/g, 'Math.sin($1)');
    expression = expression.replace(/cos\((.*)\)/g, 'Math.cos($1)');
    expression = expression.replace(/tan\((.*)\)/g, 'Math.tan($1)');
    expression = expression.replace(/\^/g, '**'); // To handle power operation
    expression = expression.replace(/Math\.PI/g, 'Math.PI');
    expression = expression.replace(/Math\.E/g, 'Math.E');

    // Evaluate the expression using eval, which can compute basic mathematical functions and operations
    let result = eval(expression);

    // Display the result
    document.getElementById('display').value = result;
  } catch (error) {
    // If an error occurs (invalid expression), display error message
    document.getElementById('display').value = 'Error';
  }
}
