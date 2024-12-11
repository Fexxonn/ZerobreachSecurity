let attemptsLeft = 5;
let successfulAttempts = 0;

document.getElementById('verify').addEventListener('click', function () {
  const password = document.getElementById('password').value;
  const feedback = document.getElementById('feedback');
  const strengthBar = document.getElementById('password-strength');
  const attempts = document.getElementById('attempts');
  const approvedButton = document.getElementById('approved');

  // Reset visual feedback
  feedback.textContent = '';
  strengthBar.style.width = '0';

  let score = 0;

  // Reglas de validación
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[\W_]/.test(password)) score++;

  // Feedback visual
  let result = '';
  switch (score) {
    case 0:
    case 1:
      strengthBar.style.width = "20%";
      strengthBar.style.backgroundColor = "red";
      result = "Muy débil";
      break;
    case 2:
      strengthBar.style.width = "40%";
      strengthBar.style.backgroundColor = "orange";
      result = "Débil";
      break;
    case 3:
      strengthBar.style.width = "60%";
      strengthBar.style.backgroundColor = "yellow";
      result = "Moderada";
      successfulAttempts++; // Se cuenta como éxito
      break;
    case 4:
      strengthBar.style.width = "80%";
      strengthBar.style.backgroundColor = "blue";
      result = "Fuerte";
      successfulAttempts++;
      break;
    case 5:
      strengthBar.style.width = "100%";
      strengthBar.style.backgroundColor = "green";
      result = "Muy fuerte";
      successfulAttempts++;
      break;
  }

  feedback.textContent = `Fortaleza: ${result}`;
  attemptsLeft--;

  // Actualiza intentos restantes
  attempts.textContent = `Intentos restantes: ${attemptsLeft}`;

  // Deshabilita el botón si se agotan los intentos
  if (attemptsLeft <= 0) {
    document.getElementById('verify').disabled = true;
  }

  // Muestra botón "Aprobado" si cumple la condición
  if (successfulAttempts >= 3 && attemptsLeft <= 0) {
    approvedButton.style.display = 'inline-block';
  } else if (attemptsLeft <= 0 && successfulAttempts < 3) {
    feedback.textContent += ' | No alcanzaste el nivel requerido para aprobar.';
  }
});
