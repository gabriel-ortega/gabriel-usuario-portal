import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import logistic from "../../../../assets/imagenes/LOGO-LOGISTIC.png";

export default function Encabezado({ text1, text2, code, revision, date }) {
  const styles = StyleSheet.create({
    headerContainer: {
      marginTop: 5,
      marginBottom: 20,
    },
    tableRow: {
      flexDirection: "row",
      border: "1px solid #000",
    },
    tableCell: {
      padding: 6,
      borderWidth: 1,
      borderColor: "#000000",
    },
    tableCellTitulo: {
      borderBottom: 0.5,
      borderRight: 0.5,
      borderTop: 0.5,
      borderTopColor: "black",
      borderColor: "#000000",
    },
    tableCellTituloContent: {
      fontSize: "12px",
    },
    text: {
      fontSize: "12px",
      fontWeight: "bold",
    },
  });
  return (
    <>
      <View style={styles.tableRow}>
        <View style={[styles.tableCell, { width: "100px" }]}>
          <Image
            src={logistic}
            style={[{ paddingTop: "8px", width: 80, height: 50 }]}
          />
        </View>
        <View style={[styles.tableCellTitulo, { width: "350px" }]}>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                styles.text,
                { paddingTop: 9.5, borderBottom: 0.5, textAlign: "center" },
              ]}
            >
              LOGISTIC INTERNATIONAL SERVICES CORPORATION
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text style={[styles.text, { paddingTop: 3, textAlign: "center" }]}>
              {text1}
            </Text>
            <Text style={[styles.text, { paddingTop: 1, textAlign: "center" }]}>
              {text2}
            </Text>
          </View>
        </View>
        <View style={[styles.tableCellTitulo, { width: "100px" }]}>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "9px",
                  paddingTop: 1,
                  borderBottom: 0.5,
                  paddingLeft: 4,
                },
              ]}
            >
              Code: {code}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "9px",
                  paddingTop: 1,
                  borderBottom: 0.5,
                  paddingLeft: 4,
                },
              ]}
            >
              Revision: {revision}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text style={[{ fontSize: "9px", paddingTop: 1, paddingLeft: 4 }]}>
              Effective date:
            </Text>
            <Text
              style={[
                {
                  fontSize: "9px",
                  paddingTop: 1,
                  borderBottom: 0.5,
                  paddingLeft: 4,
                },
              ]}
            >
              {date}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[{ fontSize: "9px", paddingTop: 1, paddingLeft: 4 }]}
              render={({ pageNumber, totalPages }) =>
                `Page ${pageNumber} of ${totalPages}`
              }
              fixed
            />
          </View>
        </View>
      </View>
    </>
  );
}
