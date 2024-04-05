const users = {};
const signUpUser = document.getElementById('username');
const signUpEmail = document.getElementById('email');
const signUpPassword = document.getElementById('password');
const userErr = document.getElementById('username-error');
const emailErr = document.getElementById('email-error');
const passErr = document.getElementById('password-error');
const successMessage = document.querySelector('.success');

const loginUser = document.getElementById('login-username');
const loginPass = document.getElementById('login-password');
const loginUserErr = document.getElementById('login-username-error');
const loginPassErr = document.getElementById('login-password-error');

document.querySelector('#signup-btn').addEventListener('click', (event) => {
  event.preventDefault(); 
  register();
});

document.querySelector('#login-btn').addEventListener('click', (event) => {
  event.preventDefault(); 
  login();
});


function hashPassword(password) {
  return password.split('').reverse().join('');
}

function deleteErrorMessage(element) {
  element.innerText = ""; // Delete the error message
}

function displayErrorMessage(element, message) {
  element.innerText = message; // Display the error message
  setTimeout(() => {
    deleteErrorMessage(element); // Delete the error message after a timeout
  }, 3000);
}

function isValidEmail(email) {
  const emailRegex =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}(?:\.[a-zA-Z]{2})?$/;
  return emailRegex.test(email);
}

function register() {
  const registerUsername = signUpUser.value.trim();
  const registerEmail = signUpEmail.value.trim();
  const registerPassword = signUpPassword.value.trim(); 

  [userErr, emailErr, passErr].forEach(deleteErrorMessage);

  if (!registerUsername) {
    displayErrorMessage(userErr, "Please enter a username.");
    return false;
  }

  if (!registerEmail) {
    displayErrorMessage(emailErr, "Please enter an email address.");
    return false;
  }

  if (!isValidEmail(registerEmail)) {
    displayErrorMessage(emailErr, "Please enter a valid email address.");
    return false;
  }

  if (!registerPassword) {
    displayErrorMessage(passErr, "Please enter a password.");
    return false;
  }

  if (registerPassword.length < 6) {
    displayErrorMessage(passErr, "Password must be at least 6 characters long.");
    return false;
  }

  // Retrieve existing users from local storage or create an empty object
  const existingUsers = JSON.parse(localStorage.getItem('users')) || {};

  // Check if the username or email already exists
  if (existingUsers[registerUsername] || Object.values(existingUsers).some(user => user.email === registerEmail)) {
    displayErrorMessage(userErr, "Username or email already exists.");
    return false;
  }

  // Hash the password before storing it
  const hashedPass = hashPassword(registerPassword);

  // Add the new user to the existing users
  existingUsers[registerUsername] = { username: registerUsername, email: registerEmail, password: hashedPass };

  // Save the updated users object back to local storage
  localStorage.setItem('users', JSON.stringify(existingUsers));

  successMessage.innerText = "Registration successful. You can now log in.";
  document.getElementById("signup-form").reset();

  setTimeout(() => {
    deleteErrorMessage(successMessage);
  }, 3000);

  return false;
}

// Function to handle login form submission
function login() {
  const loginUsername = loginUser.value.trim();
  const loginPassword = loginPass.value.trim();

  [loginUserErr, loginPassErr].forEach(deleteErrorMessage);

  if (!loginUsername) {
    displayErrorMessage(loginUserErr, "Please enter a username.");
    return false;
  }

  if (!loginPassword) {
    displayErrorMessage(loginPassErr, "Please enter a password.");
    return false;
  }

  // Retrieve the user from the users object
  const users = JSON.parse(localStorage.getItem('users')) || {};
  const user = users[loginUsername];

  if (!user) {
    displayErrorMessage(loginUserErr, 'No user with that username found. Please try again.');
    return false;
  }

  // Compare the provided password with the saved one
  if (user.password !== hashPassword(loginPassword)) {
    displayErrorMessage(loginPassErr, 'Incorrect password. Please try again.');
    return false;
  }

  // Log in successfully!
  sessionStorage.setItem('currentUser', JSON.stringify(user));
  window.location.href = 'home.html';

  return false;
}