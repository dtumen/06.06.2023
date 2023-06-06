const signinForm = document.forms.signinForm;

signinForm?.addEventListener('submit', async (event) => {
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
        password: event.target.password.value,
      }),
    });
    if (response.status !== 200) {
      const data = await response.json();
      console.log('response ststus code', response.status);
      return failSignin(event.target, data.err);
    }
  } catch (err) {
    return failSignin(event.target, err.message);
  }
 
  window.location.assign('/');
});


signinForm?.addEventListener('input', (event) => {
  event.target.setCustomValidity('');
  event.target.checkValidity();
});


function failSignin(signinForm, err) {
  signinForm.name.setCustomValidity(`Ошибка  авторизации. ${err}`);
  signinForm.name.reportValidity();
  setTimeout(() => {signinForm.name.setCustomValidity('')}, 3500);
}
