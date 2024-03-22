// Select elements
let calculation = '';  
const buttons = document.querySelectorAll('.button');
const inputField = document.getElementById('inputField'); 
const inputTotal = document.getElementById('inputTotal');
let equalButton = document.getElementById("equal");
let clearButton= document.getElementById("clear-button");
let deleteButton = document.getElementById("delete-button");
let percentageButton = document.getElementById("percentage");

// Set default value for inputField
window.onload = () => {
  inputField.value = "";
};

// Function to handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        inputField.value += button.textContent; 
    }
)});
    
// Function to handle equal button
equal.addEventListener("click", () => {
  let inputValue = inputField.value;
  calculation = eval(inputValue);
    
    if (Number.isNaN(calculation) || !Number.isFinite(calculation)) {
      throw new Error("Invalid mathematical expression");
    }
    const formattedCalculation =
      Number.isInteger(calculation) ? calculation : calculation.toFixed(1);

  inputTotal.value = formattedCalculation;
  
});

// function to handle clear button
clearButton.addEventListener("click", () => {
  inputField.value = "";
  inputTotal.value = "";
});

// function to handle delete button
deleteButton.addEventListener("click", () => {
  const currentValue = inputField.value;
  if (inputField.value.length > 0) {
    inputField.value = inputField.value.slice(0, -1);
  }
});

percentageButton.addEventListener("click", () => {
  if (inputField.value !== "") {
    const currentValue = parseFloat(inputField.value);
    inputTotal.value = currentValue / 100;
  }
});

      
    


