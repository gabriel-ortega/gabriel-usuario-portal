import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatDate } from "../../../../../util/helperFunctions";
export default function Owner({ profile, email, seafarerDocument }) {
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
      height: 30,
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
  let state;

  const documentNumber = Array.isArray(seafarerDocument)
    ? seafarerDocument.find((doc) => doc?.documentName?.id === "2")?.data
        ?.documentNumber || ""
    : "";
  const country = profile?.countryResidency?.CountryName || "";
  if (country !== "Panama") {
    state = "";
  } else {
    state = profile?.province?.name;
  }

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      return " ";
    }

    // Obtener los componentes de la fecha
    const day = String(date.getUTCDate()).padStart(2, "0"); // Asegurarse de que tenga dos dígitos
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Sumar 1 para obtener el mes correcto
    const year = date.getUTCFullYear();

    // Formato en DD/MM/YYYY
    return `${day}/${month}/${year}`;
  };

  const date = profile?.dateBirth ? formatDate(profile.dateBirth) : " ";

  return (
    <View style={styles.container}>
      <View style={styles.sideText} />
      <View style={styles.table}>
        {/* Encabezado  */}
        <View style={styles.row}>
          <View style={styles.headerCell}>
            <Text style={{ ...styles.text, textAlign: "center" }}>
              Insured person (employee)
            </Text>
          </View>
        </View>
        {/* Encabezado de la tabla */}
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "30%" }]}>
            <Text style={styles.text}>First Name:</Text>
          </View>
          <View style={[styles.tableCell, { width: "30%" }]}>
            <Text style={styles.text}>Surname:</Text>
          </View>
          <View style={[styles.tableCell, { width: "20%" }]}>
            <Text style={styles.text}>Passport</Text>
          </View>
          <View style={[styles.tableCell, { width: "20%" }]}>
            <Text style={styles.text}>Date of birth (dd/mm/yyyy)</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "30%", height: 20 }]}>
            <Text style={[styles.text, { color: "#00008B" }]}>
              {profile?.firstName || ""}
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "30%", height: 20 }]}>
            <Text style={[styles.text, { color: "#00008B" }]}>
              {profile?.lastName || ""}
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "20%", height: 20 }]}>
            <Text style={[styles.text, { color: "#00008B" }]}>
              {documentNumber || ""}
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "20%", height: 20 }]}>
            <Text style={[styles.text, { color: "#00008B" }]}>
              {date || ""}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "100%", height: 20 }]}>
            <Text style={styles.text}>Address</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "100%", height: 20 }]}>
            <Text style={[styles.text, { color: "#00008B" }]}>
              {profile?.address || ""}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "30%", height: 20 }]}>
            <Text style={styles.text}>Zip code: </Text>
          </View>
          <View style={[styles.tableCell, { width: "35%", height: 20 }]}>
            <Text style={styles.text}>
              State:{" "}
              <Text style={[styles.text, { color: "#00008B", height: 20 }]}>
                {state || ""}
              </Text>
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "35%", height: 20 }]}>
            <Text style={styles.text}>
              Country:{" "}
              <Text style={[styles.text, { color: "#00008B" }]}>
                {" "}
                {profile?.countryResidency?.CountryName || ""}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "40%", height: 20 }]}>
            <Text style={styles.text}>
              Phone number:{" "}
              <Text style={[styles.text, { color: "#00008B" }]}>
                {" "}
                {profile?.phone?.value || ""}
              </Text>
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "60%", height: 20 }]}>
            <Text style={styles.text}>
              Email:{" "}
              <Text style={[styles.text, { color: "#00008B" }]}> {email}</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
