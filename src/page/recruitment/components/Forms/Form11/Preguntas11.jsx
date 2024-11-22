import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { useState, useEffect } from "react";

export default function Preguntas11({
  item,
  index,
  justificaciones,
  handleJustificacionChange,
  resp,
}) {
  const styles = StyleSheet.create({
    text: {
      fontSize: "10px",
    },
    preguntaContainer: {
      paddingTop: 10,
      paddingBottom: 10,
      flexDirection: "column",
      flexWrap: "wrap",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    respuestaContainer: {
      border: 1,
      width: "100%",
      height: 40,
      paddingTop: 15,
      fontSize: "10px",
      paddingBottom: 15,
      padding: 5,
    },
    input: {
      borderBottom: 1,
      width: "100px",
      paddingLeft: 5,
      marginLeft: 5,
      fontSize: "10px",
    },
    label: {
      paddingLeft: 3,
      marginRight: 10,
      fontSize: "10px",
    },
    lineContainer: {
      position: "relative",
      width: "60px",
      marginLeft: 10,
      paddingTop: 5,
    },
    line: {
      borderBottom: "1px solid #000",
      position: "absolute",
      top: "80%",
      width: "100%",
    },
    xText: {
      position: "absolute",
      justifyContent: "center",
      top: "80%",
      left: 0,
      color: "#00008B",
      fontSize: "10px",
    },
    table: {
      flexDirection: "row",
      margin: 10,
      width: "100%",
      borderWidth: 1,
      borderColor: "#ccc",
    },
    row: {
      flexDirection: "row",
      width: "100%",
    },
    tableCell: {
      flex: 1,
      padding: 5,
      borderWidth: 1,
      borderColor: "#ccc",
      justifyContent: "center",
      alignItems: "center",
      width: "25%",
      height: 30,
    },
  });

  const isFirstQuestion = index === 0;

  return (
    <View style={styles.preguntaContainer}>
      <Text style={[styles.text, { paddingLeft: 4 }]}>{item.pregunta}</Text>

      {isFirstQuestion && (
        <View>
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginLeft: 20,
                alignItems: "center",
                paddingTop: 10,
                paddingBottom: 5,
              }}
            >
              {/* Opción para "YES" */}
              <View style={styles.lineContainer}>
                <Text
                  style={[
                    styles.xText,
                    {
                      justifyContent: "center",
                      textAlign: "center",
                      fontSize: 10,
                      left: 20,
                    },
                  ]}
                >
                  {item.respuesta === true ? "X" : ""}
                </Text>
                <View style={[styles.line, { paddingTop: 10 }]} />
              </View>
              <Text style={[styles.text, { paddingLeft: 10 }]}>
                YES, please indicate BELOW on behalf of the Placement Agency
              </Text>

              {/* Opción para "NO" */}
              <View style={[styles.lineContainer, { paddingTop: 0 }]}>
                <Text
                  style={[
                    styles.xText,
                    {
                      justifyContent: "center",
                      textAlign: "center",
                      fontSize: 10,
                      left: 20,
                    },
                  ]}
                >
                  {item.respuesta === false ? "X" : ""}
                </Text>
                <View style={[styles.line, { paddingTop: 10 }]} />
              </View>
              <Text style={[styles.text, { paddingLeft: 10 }]}>NO</Text>
            </View>
          </View>

          <View
            style={{
              paddingTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 10,
              paddingBottom: 5,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <Text style={styles.label}>PLACEMENT AGENCY:</Text>
              <Text
                style={[
                  styles.input,
                  { width: "200px", paddingTop: 1, color: "#00008B" },
                ]}
              >
                {resp?.otherAgencyName || ""}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 5,
              }}
            >
              <Text style={styles.label}>COUNTRY:</Text>
              <Text
                style={[
                  styles.input,
                  { width: "100px", paddingTop: 1, color: "#00008B" },
                ]}
              >
                {resp?.otherAgencyCountry || ""}
              </Text>
            </View>
          </View>
        </View>
      )}

      {index === 3 && (
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={[styles.tableCell, { width: "25%" }]}>
              <Text style={[{ color: "#00008B", fontSize: "10px" }]}>
                {resp?.language1 || ""}
              </Text>
            </View>
            <View style={[styles.tableCell, { width: "25%" }]}>
              <Text style={[{ color: "#00008B", fontSize: "10px" }]}>
                {resp?.language2 || ""}
              </Text>
            </View>
            <View style={[styles.tableCell, { width: "25%" }]}>
              <Text style={[{ color: "#00008B", fontSize: "10px" }]}>
                {resp?.language3 || ""}
              </Text>
            </View>
            <View style={[styles.tableCell, { width: "25%" }]}>
              <Text style={{ color: "#00008B", fontSize: "10px" }}>
                {resp?.language4 || ""}
              </Text>
            </View>
          </View>
        </View>
      )}
      {index === 11 && (
        <Text
          style={[
            styles.respuestaContainer,
            { color: "#00008B", height: item.respuesta ? 60 : 40 },
          ]}
        >
          {item.respuesta}
        </Text>
      )}
      {index === 4 && (
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.tableCell}>
              <Text style={[{ color: "#00008B", fontSize: "10px" }]}>
                {resp?.language5 || ""}
              </Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={[{ color: "#00008B", fontSize: "10px" }]}>
                {resp?.language6 || ""}
              </Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={[{ color: "#00008B", fontSize: "10px" }]}>
                {resp?.language7 || ""}
              </Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={[{ color: "#00008B", fontSize: "10px" }]}>
                {resp?.language8 || ""}
              </Text>
            </View>
          </View>
        </View>
      )}

      {index !== 0 &&
        index !== 3 &&
        index !== 4 &&
        index !== 11 &&
        typeof item.respuesta !== "boolean" && (
          <Text style={[styles.respuestaContainer, { color: "#00008B" }]}>
            {item.respuesta}
          </Text>
        )}
    </View>
  );
}
