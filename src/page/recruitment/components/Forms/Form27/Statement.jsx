import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function Statement({
  titlePrincipal,

  encabezado2,
  encabezado3,
  items,
}) {
  const styles = StyleSheet.create({
    page: {
      padding: 20,
    },
    table: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      borderWidth: 1,
      borderColor: "black",
    },
    column1: {
      width: "5%", // Ajusta este valor para cambiar el ancho de la primera columna
      borderRightWidth: 1,
      borderRightColor: "black",
      justifyContent: "center",
      alignItems: "center",
    },
    column: {
      flex: 1,
      borderLeftWidth: 1,
      borderLeftColor: "black",
      flexDirection: "column",
    },
    row: {
      borderBottomWidth: 1,
      borderBottomColor: "black",
      justifyContent: "center",
      alignItems: "center",
      height: 40, // Altura de cada fila
    },
    text: {
      margin: 5,
      textAlign: "center", // Centrar el texto
    },
  });
  return (
    <>
      <View style={styles.table}>
        {/* Primera columna con una sola fila */}
        <View
          style={[
            styles.column1,
            { backgroundColor: "black", alignContent: "space-evenly" },
          ]}
        >
          <Text style={[styles.text, { color: "white" }]}>
            {titlePrincipal}
          </Text>
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { width: "80%" }]}>
            <Text style={styles.header}>STATEMENT</Text>
          </View>
          <View style={[styles.tableCell, { width: "10%" }]}>
            <Text style={styles.header}>{encabezado2}</Text>
          </View>
          <View style={[styles.tableCell, { width: "10%" }]}>
            <Text style={styles.header}>{encabezado3}</Text>
          </View>
        </View>
        {items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={[styles.tableCell, { width: "80%" }]}>
              <Text style={{ fontSize: 10 }}>{item.description}</Text>
            </View>
            <View style={[styles.tableCell, { width: "10%" }]}>
              {item.agree.map((agree, index) => (
                <View key={index} style={styles.bulletContainer}>
                  <Text style={{ fontSize: 10 }}>{agree}</Text>
                </View>
              ))}
            </View>
            <View style={[styles.tableCell, { width: "10%" }]}>
              {item.disagreement.map((disagreement, index) => (
                <View key={index} style={styles.bulletContainer}>
                  <Text style={{ fontSize: 10 }}>{disagreement}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </>
  );
}
