import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function StatementDoc() {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      width: "100%",
    },
    sideText: {
      width: 20,
      height: "100%",
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
          D{"\n"}O{"\n"}C
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
          <View style={[styles.tableCell, { width: "5%", height: 30 }]}>
            <Text style={styles.text}>39. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 30 }]}>
            <Text style={styles.text}>
              I have received information about MLC 2006, and the most
              frequently asked questions, with which I can get a clearer idea
              about the scope of the maritime labor agreement.
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "10%", textAlign: "center", height: 30 },
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
              { width: "15%", justifyContent: "center", height: 30 },
            ]}
          >
            <Text style={styles.text}></Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "5%", height: 30 }]}>
            <Text style={styles.text}>40. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 30 }]}>
            <Text style={styles.text}>
              I have received the form of complaints, claims and suggestions, in
              which they have explained their use.
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
