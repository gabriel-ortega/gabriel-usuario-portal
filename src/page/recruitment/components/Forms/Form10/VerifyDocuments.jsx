import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function VerifyDocuments() {
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
  return (
    <>
      <Text
        style={[
          {
            fontSize: "10px",
            textAlign: "center",
            paddingBottom: 10,
            fontWeight: "bold",
          },
        ]}
      >
        Mark with one (X) the documents that have been verified or validated.
      </Text>
      <View style={[styles.tableRow]}>
        <View style={[styles.tableCellTitulo, { width: "70%" }]}>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderRight: 1,
                  height: "20px",
                  textAlign: "center",
                  fontWeight: "bold",
                },
              ]}
            >
              DOCUMENTS{" "}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderRight: 1,
                  height: "20px",
                  fontWeight: "bold",
                },
              ]}
            >
              STCW 1978 Training Courses
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderRight: 1,
                  height: "20px",
                  fontWeight: "bold",
                },
              ]}
            >
              Medical examinations and accredited laboratories
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderRight: 1,
                  height: "20px",
                  fontWeight: "bold",
                },
              ]}
            >
              Yellow fever.
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderRight: 1,
                  height: "20px",
                  fontWeight: "bold",
                },
              ]}
            >
              COVID-19 BOOK + BOOSTER
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderRight: 1,
                  height: "20px",
                  fontWeight: "bold",
                },
              ]}
            >
              Seaman book.
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderRight: 1,
                  height: "20px",
                  fontWeight: "bold",
                },
              ]}
            >
              COC (Certificate of Competence)
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
                  borderRight: 1,
                  height: "20px",
                  fontWeight: "bold",
                },
              ]}
            >
              Police record.
            </Text>
          </View>
        </View>

        <View style={[styles.tableCellTitulo, { width: "15%" }]}>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderRight: 1,
                  height: "20px",
                },
              ]}
            >
              VERIFICATION
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderRight: 1,
                  height: "20px",
                  textAlign: "center",
                  color: "#00008B",
                },
              ]}
            >
              X
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderRight: 1,
                  height: "20px",
                  textAlign: "center",
                  color: "#00008B",
                },
              ]}
            >
              X
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderRight: 1,
                  height: "20px",
                  textAlign: "center",
                  color: "#00008B",
                },
              ]}
            >
              X
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderRight: 1,
                  height: "20px",
                  textAlign: "center",
                  color: "#00008B",
                },
              ]}
            >
              X
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderRight: 1,
                  height: "20px",
                  textAlign: "center",
                  color: "#00008B",
                },
              ]}
            >
              X
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderRight: 1,
                  height: "20px",
                  textAlign: "center",
                  color: "#00008B",
                },
              ]}
            >
              X
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
                  borderRight: 1,
                  height: "20px",
                  textAlign: "center",
                  color: "#00008B",
                },
              ]}
            >
              X
            </Text>
          </View>
        </View>

        <View style={[styles.tableCellTitulo, { width: "15%" }]}>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "20px",
                  textAlign: "center",
                },
              ]}
            >
              VALIDATION
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "20px",
                  textAlign: "center",
                  color: "#00008B",
                },
              ]}
            >
              X
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "20px",
                  textAlign: "center",
                  color: "#00008B",
                },
              ]}
            >
              X
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "20px",
                  textAlign: "center",
                  color: "#00008B",
                },
              ]}
            >
              X
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "20px",
                  textAlign: "center",
                  color: "#00008B",
                },
              ]}
            >
              X
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "20px",
                  textAlign: "center",
                  color: "#00008B",
                },
              ]}
            >
              X
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "20px",
                  textAlign: "center",
                  color: "#00008B",
                },
              ]}
            >
              X
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderBottom: 1,
                  height: "20px",
                  textAlign: "center",
                  color: "#00008B",
                },
              ]}
            >
              X
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
