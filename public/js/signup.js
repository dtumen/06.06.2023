const signupForm = document.forms.signupForm;

signupForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { method, action } = event.target;
  let response;
  try {
    response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value,
      }),
    });
    if (response.status !== 200) {
      console.log('response.status :', response.status);
      const data = await response.json()
      return failSignup(event.target, data.err);
    }
  } catch (err) {
    console.error('CATCH ERR', err);
    return failSignup(event.target, err.message);
  }

  window.location.assign('/');
});


signupForm?.addEventListener('input', (event) => {

  event.target.setCustomValidity('');
  event.target.checkValidity();
});


function failSignup(signupForm, err) {
  signupForm.name.setCustomValidity(`Ошибка регистрации. Ошибка: ${err}`);
  signupForm.name.reportValidity();
  setTimeout(() => {signupForm.name.setCustomValidity('')}, 350000)
}
