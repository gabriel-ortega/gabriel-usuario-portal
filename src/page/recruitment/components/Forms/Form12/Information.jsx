import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function Information({ seafarerData }) {
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
      <View style={[styles.tableRow]}>
        <View style={[styles.tableCellTitulo, { width: "50%" }]}>
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
                },
              ]}
            >
              INFORMATION{" "}
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
                },
              ]}
            >
              I SEE LIFE ON BOARD
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
                },
              ]}
            >
              POSITION TO PERFORM
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
                },
              ]}
            >
              VIDEO OF THE RELATED DEPARTMENT ON BOARD
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
                },
              ]}
            >
              DESCRIPTION OF THE POSITION ON BOARD
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
                  height: "30px",
                },
              ]}
            >
              ESSENTIAL OBLIGATIONS AND RESPONSIBILITIES.
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
                  height: "30px",
                  borderBottom: 1,
                },
              ]}
            >
              VIDEO USE OF THE ENGLISH LANGUAGE IN ONBOARD COMMUNICATION.
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
                  textAlign: "center",
                },
              ]}
            >
              DETAIL
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
              YES{" "}
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
              {" "}
              {seafarerData?.position[0].name
                ? seafarerData.position[0].name
                : ""}
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
              YES
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
              YES
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
                  height: "30px",
                  textAlign: "center",
                  color: "#00008B",
                },
              ]}
            >
              YES
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
                  height: "30px",
                  textAlign: "center",
                  borderBottom: 1,
                  color: "#00008B",
                },
              ]}
            >
              YES
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
