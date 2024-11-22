import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function PersonalReference({ personal }) {
  const styles = StyleSheet.create({
    tableRow: {
      flexDirection: "row",
      paddingBottom: 5,
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
  return (
    <>
      <Text style={[{ fontSize: "10px", paddingTop: 10, paddingBottom: 10 }]}>
        {personal}
      </Text>
      <View style={[styles.tableRow]}>
        <View style={[styles.tableCellTitulo, { width: "30%" }]}>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  borderLeft: 1,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "15px",
                },
              ]}
            >
              Name{" "}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  borderLeft: 1,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderBottom: 1,
                  height: "20px",
                },
              ]}
            >
              Years of knowledge:{" "}
            </Text>
          </View>
        </View>

        <View style={[styles.tableCellTitulo, { width: "70%" }]}>
          <View style={[styles.tableCelTituloContent, {}]}>
            <View
              style={[
                {
                  fontSize: "10px",
                  borderTop: 1,
                  height: "15px",
                  display: "flex",
                  flexDirection: "row",
                },
              ]}
            >
              <View style={[{ width: "50%", borderRight: 1 }]}>
                <Text style={[{ paddingLeft: 5 }]}>Telephone:</Text>
              </View>
              <View style={[{ width: "50%" }]}>
                <Text style={[{ paddingLeft: 5 }]}>Relation:</Text>
              </View>
            </View>
            <View style={[styles.tableCelTituloContent, {}]}>
              <Text
                style={[
                  {
                    fontSize: "10px",
                    paddingTop: 3,
                    paddingLeft: 4,
                    borderTop: 1,
                    height: "20px",
                    borderBottom: 1,
                  },
                ]}
              >
                feedback:
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
