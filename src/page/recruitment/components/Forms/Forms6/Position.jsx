import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function Position({ departments, title }) {
  const styles = StyleSheet.create({
    title: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      border: title ? 0.7 : 0, // Establecer borde solo si hay un título
    },
    table: {
      border: 0.7,
      borderCollapse: "collapse",
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCell: {
      width: "100%", // Asegura que las celdas ocupen el 100% del ancho disponible
      border: 0.5,
      padding: 3,
    },
    header: {
      fontSize: 10,
      fontWeight: "bold",
      textAlign: "center",
    },
    bulletContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 1,
    },
    bulletPoint: {
      marginRight: 5,
    },
  });

  return (
    <View>
      {/* Título general */}
      <Text style={styles.title}>{title || ""}</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { width: "40%" }]}>
            <Text style={styles.header}>Department</Text>
          </View>
          <View style={[styles.tableCell, { width: "60%" }]}>
            <Text style={styles.header}>Positions</Text>
          </View>
        </View>
        {departments.map((dept, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={[styles.tableCell, { width: "40%" }]}>
              <Text style={{ fontSize: 10 }}>{dept.department}</Text>
            </View>
            <View style={[styles.tableCell, { width: "60%" }]}>
              {dept.positions.map((pos, index) => (
                <View key={index} style={styles.bulletContainer}>
                  <Text style={[styles.bulletPoint, { fontSize: 10 }]}>•</Text>
                  <Text style={{ fontSize: 10 }}>{pos}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
