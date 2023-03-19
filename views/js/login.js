
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const bloodBankName = document.querySelector('#bloodBankName').value;
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bloodBankName, username, password })
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      window.location.href = '/blood-bank-management.html?bloodBankName=' + bloodBankName;
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred while logging in. Please try again.');
  }
});
