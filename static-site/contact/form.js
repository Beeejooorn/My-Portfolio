const form = document.querySelector('form');
const feedback = document.getElementById('status');
const submit = form.querySelector('[type="submit"]');

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (submit.disabled || !form.reportValidity()) return;

  submit.disabled = true;
  feedback.textContent = 'Sending your inquiry…';
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    });
    if (!response.ok) throw new Error('Submission rejected');
    form.reset();
    feedback.textContent = 'Your inquiry was submitted. Thank you.';
  } catch {
    feedback.textContent = 'Submission could not be confirmed. Try again or contact me directly by email.';
  } finally {
    submit.disabled = false;
  }
});
