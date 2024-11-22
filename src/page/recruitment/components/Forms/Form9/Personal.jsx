import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function Personal({ profile, contractDate, seafarerDocument }) {
  const styles = StyleSheet.create({
    tableRow: {
      flexDirection: "row",
    },
    tableCell: {
      padding: 6,
      borderWidth: 0.5,
      borderColor: "#000000",
    },
    tableCellTitulo: {
      borderRight: 1,

      borderTopColor: "black",
      borderColor: "#000000",
    },
    tableCellTituloContent: {
      fontSize: "10px",
    },
    text: {
      fontSize: "12px",
      fontWeight: "bold",
    },
  });

  //FUNCION PARA LA FECHA DEL FORMATO
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return " ";
    }
    date.setUTCDate(date.getUTCDate() + 1);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Formatear la fecha si está disponible
  const formattedDate = contractDate ? formatDate(contractDate) : " ";

  const documentNumber = Array.isArray(seafarerDocument)
    ? seafarerDocument.find((doc) => doc?.documentName?.id === "2")?.data
        ?.documentNumber || ""
    : "";

  const identificationNumber = profile?.identification || "";
  return (
    <>
      <View style={[styles.tableRow]}>
        <View style={[styles.tableCellTitulo, { width: "25%" }]}>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  borderLeft: 1,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "20px",
                },
              ]}
            >
              Candidate Name:{" "}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  borderBottom: 1,
                  borderLeft: 1,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "20px",
                },
              ]}
            >
              No. ID/Passport
            </Text>
          </View>
        </View>

        <View style={[styles.tableCellTitulo, { width: "50%" }]}>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "20px",
                  color: "#00008B",
                },
              ]}
            >
              {profile && profile.firstName && profile.lastName
                ? `${profile.firstName} ${profile.lastName}`
                : " "}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  borderBottom: 1,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "20px",
                  color: "#00008B",
                },
              ]}
            >
              {documentNumber || identificationNumber || ""}
            </Text>
          </View>
        </View>

        <View style={[styles.tableCellTitulo, { width: "25%" }]}>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "20px",
                },
              ]}
            >
              Date:{" "}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  borderBottom: 1,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "20px",
                  color: "#00008B",
                },
              ]}
            >
              {formattedDate}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
