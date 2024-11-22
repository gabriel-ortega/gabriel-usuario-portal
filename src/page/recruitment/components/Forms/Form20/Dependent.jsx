import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function Owner() {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
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
      width: "100%",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "justify",
      alignItems: "flex-start",
      height: 20,
      marginBottom: 0,
    },
    text: {
      margin: 0,
      textAlign: "justify",
      fontSize: 9,
    },
    tableCell: {
      width: "100%",
      height: 20,
      border: 0.6,
      padding: 2,
      justifyContent: "justify",
      alignItems: "flex-start",
      display: "flex",
    },
    headerCell: {
      width: "100%",
      height: 20,
      border: 0.6,
      padding: 2,
      justifyContent: "justify",
      alignItems: "flex-start",
      display: "flex",
      fontWeight: "bold", // Texto en negrita para mayor énfasis
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.sideText} />
      <View style={styles.table}>
        {/* Encabezado  */}
        <View style={styles.row}>
          <View style={styles.headerCell}>
            <Text style={{ ...styles.text, textAlign: "center" }}>
              Please indicate below the dependent children under the age of 18
            </Text>
          </View>
        </View>
        {/* Encabezado de la tabla */}
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "50%" }]}>
            <Text style={styles.text}>
              Full name:{" "}
              <Text style={[styles.text, { color: "#00008B" }]}> </Text>
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "50%" }]}>
            <Text style={styles.text}>
              Date of birth
              <Text style={[styles.text, { color: "#00008B" }]}> </Text>
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "50%" }]}>
            <Text style={styles.text}>
              Full name:
              <Text style={[styles.text, { color: "#00008B" }]}> </Text>
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "50%" }]}>
            <Text style={styles.text}>
              Date of birth
              <Text style={[styles.text, { color: "#00008B" }]}> </Text>
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "50%" }]}>
            <Text style={styles.text}>
              Full name:{" "}
              <Text style={[styles.text, { color: "#00008B" }]}> </Text>
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "50%" }]}>
            <Text style={styles.text}>
              Date of birth
              <Text style={[styles.text, { color: "#00008B" }]}> </Text>
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "50%" }]}>
            <Text style={styles.text}>
              Full name:
              <Text style={[styles.text, { color: "#00008B" }]}> </Text>
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "50%" }]}>
            <Text style={styles.text}>
              Date of birth
              <Text style={[styles.text, { color: "#00008B" }]}> </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
