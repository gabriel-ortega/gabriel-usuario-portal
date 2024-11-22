import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function Beneficiary({
  title,
  split,
  name,
  surname,
  phone,
  email,
  code,
  date,
  state,
  country,
  address,
}) {
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

      marginBottom: 0,
    },
    text: {
      margin: 0,
      textAlign: "left", // Alineado a la izquierda
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
        {/* Encabezado   */}

        <View style={styles.row}>
          <View style={styles.headerCell}>
            <Text style={{ ...styles.text, textAlign: "center" }}>
              {title}
              <Text style={[styles.text, { color: "#00008B" }]}>{split} </Text>%
            </Text>
            <View
              style={{
                height: 1,
                backgroundColor: "black", // Color de la línea
                marginHorizontal: 5, // Espacio a los lados
              }}
            />
          </View>
        </View>
        {/* Encabezado de la tabla */}
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "35%" }]}>
            <Text style={styles.text}>
              First name:{" "}
              <Text style={[styles.text, { color: "#00008B" }]}>{name} </Text>
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "35%" }]}>
            <Text style={styles.text}>
              Surname:
              <Text style={[styles.text, { color: "#00008B" }]}>
                {surname}{" "}
              </Text>
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "30%" }]}>
            <Text style={styles.text}>
              Date of birth:
              <Text style={[styles.text, { color: "#00008B" }]}>
                {date}{" "}
              </Text>{" "}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "100%" }]}>
            <Text style={styles.text}>Address</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "100%" }]}>
            <Text style={[styles.text, { color: "#00008B" }]}>{address}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "30%" }]}>
            <Text style={styles.text}>
              Zip code:{" "}
              <Text style={[styles.text, { color: "#00008B" }]}>{code} </Text>{" "}
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "35%" }]}>
            <Text style={styles.text}>
              State{" "}
              <Text style={[styles.text, { color: "#00008B" }]}>{state} </Text>{" "}
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "35%" }]}>
            <Text style={styles.text}>
              Country:{" "}
              <Text style={[styles.text, { color: "#00008B" }]}>
                {country}{" "}
              </Text>{" "}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "40%" }]}>
            <Text style={styles.text}>
              Phone Number:{" "}
              <Text style={[styles.text, { color: "#00008B" }]}>{phone} </Text>{" "}
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "60%" }]}>
            <Text style={styles.text}>
              Email:{" "}
              <Text style={[styles.text, { color: "#00008B" }]}>{email} </Text>{" "}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
