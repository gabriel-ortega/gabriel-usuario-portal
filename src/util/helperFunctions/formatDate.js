export function formatDate(dateString, format) {
  if (typeof dateString !== "string" || !dateString) {
    return "Invalid date";
  }

  const [year, month, day] = dateString.split("T")[0].split("-");

  // Validar si year, month y day son valores numéricos válidos
  if (
    !year ||
    !month ||
    !day ||
    isNaN(new Date(`${year}-${month}-${day}`).getTime())
  ) {
    return "Invalid date";
  }

  // Convertir mes y día en texto
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const date = new Date(`${year}-${month}-${day}`);
  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const monthName = months[parseInt(month, 10) - 1];

  // Agregar sufijo al día
  const dayWithSuffix = (d) => {
    if (d > 3 && d < 21) return `${d}th`;
    switch (d % 10) {
      case 1:
        return `${d}st`;
      case 2:
        return `${d}nd`;
      case 3:
        return `${d}rd`;
      default:
        return `${d}th`;
    }
  };

  switch (format) {
    case "mm-dd-yyyy":
      return `${month}-${day}-${year}`;
    case "yyyy-mm-dd":
      return `${year}-${month}-${day}`;
    case "MM-dd-yyyy":
      return `${monthName} ${dayWithSuffix(parseInt(day))} ${year}`;
    case "dd-mm-yyyy":
      return `${day}-${month}-${year}`;
    case "dddd, mmmm dd yyyy":
      return `${dayOfWeek}, ${monthName} ${dayWithSuffix(
        parseInt(day)
      )} ${year}`;
    default:
      return `${year}-${month}-${day}`;
  }
}

export function formatDateToMonthDayYear(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);

  // Array de meses para obtener el nombre abreviado
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Obtenemos el nombre abreviado del mes (restamos 1 porque el array es cero-indexado)
  const monthName = months[month - 1];

  return `${monthName} ${day}, ${year}`;
}
