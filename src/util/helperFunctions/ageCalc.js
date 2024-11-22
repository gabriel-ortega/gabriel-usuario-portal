export const ageCalc = (fechaNacimiento) => {
  const fechaNac = new Date(fechaNacimiento);

  // Obtener la fecha actual
  const fechaActual = new Date();

  // Calcular la edad en años
  let edad = fechaActual.getFullYear() - fechaNac.getFullYear();

  // Ajustar si el cumpleaños de este año aún no ha ocurrido
  const mes = fechaActual.getMonth() - fechaNac.getMonth();
  if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNac.getDate())) {
    edad--;
  }
  return edad >= 18;
};

export const ageCalcNumber = (fechaNacimiento) => {
  const fechaNac = new Date(fechaNacimiento);

  // Obtener la fecha actual
  const fechaActual = new Date();

  // Calcular la edad en años
  let edad = fechaActual.getFullYear() - fechaNac.getFullYear();

  // Ajustar si el cumpleaños de este año aún no ha ocurrido
  const mes = fechaActual.getMonth() - fechaNac.getMonth();
  if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNac.getDate())) {
    edad--;
  }
  return edad;
};
