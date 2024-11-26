export function generatePassword(length) {
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+";
  const allChars = lowerCase + upperCase + numbers + specialChars;

  if (length < 6) {
    throw new Error(
      "La longitud de la contraseña debe ser de al menos 6 caracteres."
    );
  }

  // Asegurar al menos un carácter de cada categoría
  const passwordArray = [
    lowerCase.charAt(Math.floor(Math.random() * lowerCase.length)),
    upperCase.charAt(Math.floor(Math.random() * upperCase.length)),
    numbers.charAt(Math.floor(Math.random() * numbers.length)),
    specialChars.charAt(Math.floor(Math.random() * specialChars.length)),
  ];

  // Completar la contraseña con caracteres aleatorios
  for (let i = passwordArray.length; i < length; i++) {
    passwordArray.push(
      allChars.charAt(Math.floor(Math.random() * allChars.length))
    );
  }

  // Mezclar la contraseña para evitar patrones predecibles
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }

  return passwordArray.join("");
}
