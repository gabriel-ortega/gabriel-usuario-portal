export const validatePassword = (password) => {
  const errors = [];

  // Validación: Mínimo 6 caracteres
  if (password.length < 6) {
    errors.push("La contraseña debe tener al menos 6 caracteres.");
  }

  // Validación: Al menos un número
  if (!/\d/.test(password)) {
    errors.push("La contraseña debe incluir al menos un número.");
  }

  // Validación: Al menos una letra mayúscula
  if (!/[A-Z]/.test(password)) {
    errors.push("La contraseña debe incluir al menos una letra mayúscula.");
  }

  // Validación: Al menos un carácter especial
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("La contraseña debe incluir al menos un carácter especial.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
