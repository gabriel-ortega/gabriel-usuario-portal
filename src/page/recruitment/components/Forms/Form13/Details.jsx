import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function Details({ seafarerData, pos }) {
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
  const position = seafarerData?.position?.[0]?.name || " ";
  // Obtener el id de posicion
  const positionId = seafarerData?.position?.[0]?.id;

  // Buscar la posicion correspondiente
  const selectedPosition =
    pos.length > 0
      ? pos.find((position) => String(position.Id) === String(positionId))
      : null;

  // Extraer airportCode y city de repatriación si hay coincidencia
  const report = selectedPosition ? selectedPosition.ReportsTo : " ";
  const respond = selectedPosition ? selectedPosition.DirectRespondsTo : "";
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
                  height: "25px",
                  justifyContent: "space-around",
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
                  height: "25px",
                  justifyContent: "space-around",
                },
              ]}
            >
              POSITION NAME
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
                  justifyContent: "space-around",
                  borderRight: 1,
                  height: "25px",
                },
              ]}
            >
              REPORTS TO:
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  justifyContent: "space-around",
                  borderTop: 1,
                  borderRight: 1,
                  height: "25px",
                },
              ]}
            >
              RESPOND DIRECTLY TO THE FOLLOWING {"\n"}POSITION
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
                  justifyContent: "space-around",
                  borderRight: 1,
                  height: "25px",
                },
              ]}
            >
              REVIEW OF THE JOB DESCRIPTION WITH THE {"\n"}CREW MEMBER.
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
                  justifyContent: "space-around",
                  borderRight: 1,
                  height: "40px",
                },
              ]}
            >
              REVIEW ESSENTIAL OBLIGATIONS AND {"\n"}RESPONSIBILITIES ONBOARD
              WITH THE CREW MEMBER
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
                  justifyContent: "space-around",
                  borderRight: 1,
                  height: "25px",
                },
              ]}
            >
              REVIEW REQUIRED QUALIFICATION WITH THE {"\n"} CREW MEMBER.
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
                  justifyContent: "space-around",
                  borderRight: 1,
                  height: "25px",
                },
              ]}
            >
              INFORM THE REQUIRED LANGUAGES (MARLIN {"\n"} TEST UP TO 70%)
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
                  height: "25px",
                  justifyContent: "space-around",
                  borderBottom: 1,
                  borderRight: 1,
                },
              ]}
            >
              REQUIRED PHYSICAL CONDITIONS TO RECEIVE {"\n"} THE CONTRACT OFFER.
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
                  height: "25px",
                  textAlign: "center",
                  justifyContent: "space-around",
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
                  height: "25px",
                  textAlign: "center",
                  justifyContent: "space-around",
                  color: "#00008B",
                },
              ]}
            >
              {position}
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
                  height: "25px",
                  textAlign: "center",
                  justifyContent: "space-around",
                  color: "#00008B",
                },
              ]}
            >
              {report}
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
                  height: "25px",
                  textAlign: "center",
                  justifyContent: "space-around",
                  color: "#00008B",
                },
              ]}
            >
              {respond}
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
                  height: "25px",
                  textAlign: "center",
                  justifyContent: "space-around",
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
                  height: "40px",
                  textAlign: "center",
                  justifyContent: "space-around",
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
                  height: "25px",
                  textAlign: "center",
                  justifyContent: "space-around",
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
                  height: "25px",
                  textAlign: "center",
                  justifyContent: "space-around",
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
                  height: "25px",
                  textAlign: "center",
                  justifyContent: "space-around",
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
