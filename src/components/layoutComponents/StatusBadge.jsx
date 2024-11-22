import { Badge } from "flowbite-react"; // Asegúrate de importar el componente Badge

const StatusBadge = ({ status }) => {
  // Definir un objeto para mapear el estado con los colores correspondientes
  const statusColorMap = {
    pending: "warning",
    approved: "success",
    denied: "failure",
  };

  // Obtener el color basado en el estado actual, si el estado no coincide, usar 'info' como predeterminado
  const badgeColor = statusColorMap[status] || "info";

  return (
    <Badge color={badgeColor}>
      {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
      {/* Capitalizar la primera letra */}
    </Badge>
  );
};
