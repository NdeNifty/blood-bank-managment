console.log("Signup JS loaded");
const signupForm = document.querySelector('#signup-form');

function handleSignup(event) {
  event.preventDefault(); // prevent form submission behavior

  const nameInput = document.querySelector('#admin-name');
  const usernameInput = document.querySelector('#signup-username');
  const passwordInput = document.querySelector('#signup-password');
  const bloodBankNameInput = document.querySelector('#blood-bank-name-input');

  const data = {
    adminname: nameInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
    bloodbankname: bloodBankNameInput.value,
  };
  console.log(data)
  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log('Yeah it signed up....!!!')
        alert('Signup successful! Please login to continue.');
        window.location.href = '/views/management.html'; // redirect to login page
      } else {
        alert('Signup failed. Please try again.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

signupForm.addEventListener('submit', handleSignup);
