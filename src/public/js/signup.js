window.addEventListener('load', () => {
  const $form = document.forms[0];

  $form.addEventListener('submit', (e) => {
    let $inputPass = $form.querySelector('div input#pass');
    let $inputPassConfim = $form.querySelector('div input#passConfirm');
    let $passErrorAlert = $form.querySelector('div#password-error-alert');

    /* password length is < to 8 characters */
    if ($inputPass.value.length < 8) {
      $passErrorAlert.textContent = 'Password cannot be less than 8 characters';

      $passErrorAlert.classList.remove('d-none');

      e.preventDefault();
      return false;
    }

    /* password and confirm password arent equal*/
    if ($inputPass.value !== $inputPassConfim.value) {
      $passErrorAlert.textContent =
        'Password and confirm passport are not equal';

      $passErrorAlert.classList.remove('d-none');

      e.preventDefault();

      return false;
    }

    $passErrorAlert.classList.add('d-none');
  });
});
