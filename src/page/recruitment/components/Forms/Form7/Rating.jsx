import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function Rating({ resp }) {
  const styles = StyleSheet.create({
    tableRow: {
      flexDirection: "row",
      paddingTop: 20,
      paddingBottom: 10,
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
      fontSize: "12px",
    },
    text: {
      fontSize: "12px",
      fontWeight: "bold",
    },
  });
  return (
    <>
      <View style={[styles.tableRow]}>
        <View style={[styles.tableCellTitulo, { width: "100px" }]}>
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
                  height: "60px",
                },
              ]}
            >
              Rating Scale
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 5,
                  borderBottom: 1,
                  borderLeft: 1,
                  paddingLeft: 4,
                  height: "30px",
                },
              ]}
            >
              English Language Proficiency
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 6,
                  borderBottom: 1,
                  borderLeft: 1,
                  paddingLeft: 4,
                  height: "30px",
                },
              ]}
            >
              Comprehension
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 6,
                  borderBottom: 1,
                  borderLeft: 1,
                  paddingLeft: 4,
                  height: "30px",
                },
              ]}
            >
              Vocabulary
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 6,
                  borderBottom: 1,
                  borderLeft: 1,
                  paddingLeft: 4,
                  height: "30px",
                },
              ]}
            >
              Understand
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 6,
                  borderBottom: 1,
                  borderLeft: 1,
                  paddingLeft: 4,
                  height: "30px",
                },
              ]}
            >
              Other languaje
            </Text>
          </View>
        </View>

        <View style={[styles.tableCellTitulo, { width: "70px" }]}>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  borderBottom: 1,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "30px",
                  textAlign: "center",
                },
              ]}
            >
              Very good
            </Text>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                  textAlign: "center",
                },
              ]}
            >
              {" "}
              5
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 5,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                  color: "#00008B",
                },
              ]}
            >
              {resp?.englishLanguage || ""}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 6,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                  color: "#00008B",
                },
              ]}
            >
              {resp?.comprehension || ""}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 6,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                  color: "#00008B",
                },
              ]}
            >
              {resp?.vocabulary || ""}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 6,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                  color: "#00008B",
                },
              ]}
            >
              {resp?.understand || ""}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 6,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                  color: "#00008B",
                },
              ]}
            >
              {resp?.otherLanguages || ""}
            </Text>
          </View>
        </View>

        <View style={[{ width: "80px" }]}>
          <View style={[styles.tableCelTituloContent, { borderRight: 1 }]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  borderBottom: 1,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "30px",
                  textAlign: "center",
                },
              ]}
            >
              Well
            </Text>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                  textAlign: "center",
                },
              ]}
            >
              {" "}
              4
            </Text>
          </View>
        </View>

        <View style={[styles.tableCellTitulo, { width: "80px" }]}>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  borderBottom: 1,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "30px",
                  textAlign: "center",
                },
              ]}
            >
              Acceptable
            </Text>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                  textAlign: "center",
                },
              ]}
            >
              3{" "}
            </Text>
          </View>
        </View>

        <View style={[styles.tableCellTitulo, { width: "100px" }]}>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  borderBottom: 1,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "30px",
                  textAlign: "center",
                },
              ]}
            >
              Poor
            </Text>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                  textAlign: "center",
                },
              ]}
            >
              {" "}
              2
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 5,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                },
              ]}
            >
              Appearance
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 6,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                },
              ]}
            >
              Personality
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 6,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                },
              ]}
            >
              Courtesy
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 6,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                },
              ]}
            >
              Familiarity with work
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 6,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                },
              ]}
            >
              Previous experience
            </Text>
          </View>
        </View>

        <View style={[styles.tableCellTitulo, { width: "100px" }]}>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  borderBottom: 1,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "30px",
                  textAlign: "center",
                },
              ]}
            >
              Very poor
            </Text>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                  textAlign: "center",
                },
              ]}
            >
              1{" "}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 5,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                  color: "#00008B",
                },
              ]}
            >
              {" "}
              {resp?.appearance || ""}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 6,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                  color: "#00008B",
                },
              ]}
            >
              {" "}
              {resp?.personality || ""}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 6,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                  color: "#00008B",
                },
              ]}
            >
              {" "}
              {resp?.courtesy || ""}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 6,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                  color: "#00008B",
                },
              ]}
            >
              {" "}
              {resp?.familiarity || ""}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 6,
                  borderBottom: 1,
                  paddingLeft: 4,
                  height: "30px",
                  color: "#00008B",
                },
              ]}
            >
              {" "}
              {resp?.previous || ""}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
