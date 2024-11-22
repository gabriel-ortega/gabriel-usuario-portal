export function unixToYyyyMmDd(unixTimestamp) {
  // Crear un objeto Date desde el Unix timestamp
  const date = new Date(unixTimestamp * 1000); // Multiplicar por 1000 para convertir a milisegundos
  // Formatear la fecha a yyyy-mm-dd
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Mes es 0 indexado
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
