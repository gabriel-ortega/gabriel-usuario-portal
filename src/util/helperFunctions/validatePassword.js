export const validatePassword = (password) => {
  const errors = [];

  // Validación: Mínimo 6 caracteres
  if (password.length < 6) {
    errors.push("The password must have at least 6 characters.");
  }

  // Validación: Al menos un número
  if (!/\d/.test(password)) {
    errors.push("The password must include at least one number");
  }

  // Validación: Al menos una letra mayúscula
  if (!/[A-Z]/.test(password)) {
    errors.push("The password must include at least one capital letter.");
  }

  // Validación: Al menos un carácter especial
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("The password must include at least one special character.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
