import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function Owner({ embark, imo, vesselType, hiring, position }) {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      width: "100%",
    },
    sideText: {
      textAlign: "center",
      fontSize: 9,
      padding: 1,
      lineHeight: 1.0,
    },
    table: {
      border: 0.7,
      display: "flex",
      flexDirection: "column",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    text: {
      margin: 0,
      textAlign: "justify",
      fontSize: 9,
    },
    tableCell: {
      width: "100%",
      height: "30", // Cambiar a auto para que ajuste el contenido
      border: 0.6,
      padding: 2,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      display: "flex",
    },
    headerCell: {
      width: "100%",
      height: 20,
      border: 0.6,
      padding: 2,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      display: "flex",
      fontWeight: "bold",
    },
  });

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      return " ";
    }

    // Obtener los componentes de la fecha
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    // Formato en DD/MM/YYYY
    return `${day}/${month}/${year}`;
  };
  const date = embark?.commenceDate ? formatDate(embark?.commenceDate) : " ";

  return (
    <View style={styles.container}>
      <View style={styles.sideText} />
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.headerCell}>
            <Text style={{ ...styles.text, textAlign: "center" }}>
              The Owner
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "15%" }]}>
            <Text style={styles.text}>Vessel Name</Text>
          </View>
          <View style={[styles.tableCell, { width: "20%" }]}>
            <Text style={[styles.text, { color: "#00008B" }]}>
              {embark?.vessel?.name || ""}
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "15%" }]}>
            <Text style={styles.text}>IMO Number</Text>
          </View>
          <View style={[styles.tableCell, { width: "15%" }]}>
            <Text style={[styles.text, { color: "#00008B" }]}>{imo || ""}</Text>
          </View>
          <View style={[styles.tableCell, { width: "15%" }]}>
            <Text style={styles.text}>Vessel Type</Text>
          </View>
          <View style={[styles.tableCell, { width: "20%" }]}>
            <Text style={[styles.text, { color: "#00008B" }]}>
              {vesselType || " "}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "30%" }]}>
            <Text style={styles.text}>Employment Commence (dd/mm/yy)</Text>
          </View>
          <View style={[styles.tableCell, { width: "30%" }]}>
            <Text style={[styles.text, { color: "#00008B" }]}>
              {date || ""}
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "30%" }]}>
            <Text style={styles.text}>Duration of Employment: +/-1 Month</Text>
          </View>
          <View style={[styles.tableCell, { width: "10%" }]}>
            <Text style={[styles.text, { color: "#00008B" }]}>
              ± {embark?.contractLength || ""}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "30%" }]}>
            <Text style={styles.text}>The owner employs the seafarer as:</Text>
          </View>
          <View style={[styles.tableCell, { width: "30%" }]}>
            <Text style={[styles.text, { color: "#00008B" }]}>
              {position || ""}
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "30%" }]}>
            <Text style={styles.text}>Employee Number</Text>
          </View>
          <View style={[styles.tableCell, { width: "10%" }]}>
            <Text style={[styles.text, { color: "#00008B" }]}>
              {hiring?.employeeNumber || ""}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
