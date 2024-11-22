import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function StatementHealth() {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      width: "100%",
    },
    sideText: {
      width: 20, // Ajusta el ancho según sea necesario
      height: "100%", // Tomar toda la altura
      textAlign: "center",
      justifyContent: "center",
      backgroundColor: "black",
      color: "white",
      fontSize: 8,
      padding: 1,
      lineHeight: 1.5,
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
      justifyContent: "flex-start",
      alignItems: "flex-start",
      height: "auto",
    },
    text: {
      margin: 2,
      textAlign: "justify",
      fontSize: 8,
    },
    tableCell: {
      width: "100%",
      height: 45,
      border: 0.6,
      padding: 2,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.sideText}>
        <Text style={{ color: "white" }}>
          HE{"\n"}A{"\n"}L{"\n"}T{"\n"}H
        </Text>
      </View>
      <View style={styles.table}>
        {/* Encabezado */}
        <View style={[styles.row, { backgroundColor: "black" }]}>
          <View style={[styles.tableCell, { width: "5%", height: 20 }]}>
            <Text style={[styles.text, { fontSize: 8, color: "white" }]}>
              #
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 20 }]}>
            <Text style={[styles.text, { fontSize: 8, color: "white" }]}>
              STATEMENT
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "10%", height: 20 }]}>
            <Text style={[styles.text, { fontSize: 8, color: "white" }]}></Text>
          </View>
          <View style={[styles.tableCell, { width: "15%", height: 20 }]}>
            <Text style={[styles.text, { fontSize: 8, color: "white" }]}></Text>
          </View>
        </View>

        {/* Filas de datos */}

        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "5%", height: 50 }]}>
            <Text style={styles.text}>18. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 50 }]}>
            <Text style={styles.text}>
              I have in my possession a medical certificate, valid from a
              certified doctor in a clinic authorized by the company or by a
              physical examination before hiring authorized by the company,
              including all the results of laboratory tests, indicating that I
              am fit for the service (make sure you have the original
              certificate with you at the time of boarding)
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "10%", textAlign: "center", height: 50 },
            ]}
          >
            <Text
              style={[
                styles.text,
                {
                  color: "#00008B",
                  justifyContent: "center",
                  textAlign: "center",
                },
              ]}
            >
              x
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "15%", justifyContent: "center", height: 50 },
            ]}
          >
            <Text style={styles.text}></Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "5%", height: 30 }]}>
            <Text style={styles.text}>19. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 30 }]}>
            <Text style={styles.text}>
              All my questions have been answered by my placement agency or the
              representatives of the shipping agency to my satisfaction
              regarding my medical examination.
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "10%", textAlign: "center", height: 30 },
            ]}
          >
            {" "}
            <Text
              style={[
                styles.text,
                {
                  color: "#00008B",
                  justifyContent: "center",
                  textAlign: "center",
                },
              ]}
            >
              x
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "15%", justifyContent: "center", height: 30 },
            ]}
          >
            <Text style={styles.text}></Text>
          </View>
        </View>
      </View>
    </View>
  );
}
