import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function StatementTrips() {
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
          T{"\n"}R{"\n"}I{"\n"}P{"\n"}S
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
          <View style={[styles.tableCell, { width: "5%", height: 40 }]}>
            <Text style={styles.text}>20. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 40 }]}>
            <Text style={styles.text}>
              I have obtained all valid documents, including C1/D or Schengen
              visa, valid for one month after the indication of the expected
              date of completion of the contract and my passport is valid at
              least 6 months from the expected date of disembarkation.
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "10%", textAlign: "center", height: 40 },
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
              { width: "15%", justifyContent: "center", height: 40 },
            ]}
          >
            <Text style={styles.text}></Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "5%", height: 30 }]}>
            <Text style={styles.text}>21. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 30 }]}>
            <Text style={styles.text}>
              The company's policy regarding the air ticket to join the ship and
              return home at the end of my contract, has been explained by the
              placement agency or by the representative of the shipping agency
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
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "5%", height: 30 }]}>
            <Text style={styles.text}>22. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 30 }]}>
            <Text style={styles.text}>
              I understand that there are certain personal items that I will
              have to take with me and I had the opportunity to clarify any
              doubts.
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
          <View style={[styles.tableCell, { width: "5%", height: 20 }]}>
            <Text style={styles.text}>23. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 20 }]}>
            <Text style={styles.text}>
              I have understood that the repatriation airport will be
              ___________________________________
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "10%", textAlign: "center", height: 20 },
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
              { width: "15%", justifyContent: "center", height: 20 },
            ]}
          >
            <Text style={styles.text}></Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "5%", height: 30 }]}>
            <Text style={styles.text}>24. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 30 }]}>
            <Text style={styles.text}>
              All my questions have been answered by the placement agency or
              representative of the shipping agency to my satisfaction regarding
              the trip.
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
      </View>
    </View>
  );
}
