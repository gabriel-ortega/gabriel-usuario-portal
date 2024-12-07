export function convertirFechaYHora(fechaISO) {
  const fecha = new Date(fechaISO);

  // Extraer los componentes de la fecha en hora local
  const dia = String(fecha.getDate()).padStart(2, "0"); // Día del mes
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes (de 0 a 11, por eso +1)
  const anio = fecha.getFullYear(); // Año completo

  // Extraer los componentes de la hora en hora local
  let horas = fecha.getHours(); // Hora local
  const minutos = String(fecha.getMinutes()).padStart(2, "0"); // Minutos
  const periodo = horas >= 12 ? "PM" : "AM"; // Determinar AM o PM
  horas = horas % 12 || 12; // Convertir a formato de 12 horas (0 -> 12)

  // Formatear fecha y hora
  const fechaFormateada = `${dia}/${mes}/${anio}`;
  const horaFormateada = `${horas}:${minutos} ${periodo}`;

  return `${fechaFormateada} ${horaFormateada}`;
}
