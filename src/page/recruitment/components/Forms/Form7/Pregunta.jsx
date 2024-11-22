import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function Pregunta({ item, index, resp, prof }) {
  const styles = StyleSheet.create({
    text: {
      fontSize: "10px",
    },
    text_subrayado: {
      borderBottom: 0.5,
      marginLeft: 2,
      paddingLeft: 5,
      fontSize: "11px",
    },
    preguntaContainer: {
      paddingTop: 20,
      paddingBottom: 20,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    respuestaContainer: {
      borderBottom: 1,
      width: "525px", //anchura del container

      paddingTop: 5,
      fontSize: "10px",
    },
    input: {
      borderBottom: 1,
      width: "50px",
      paddingLeft: 5,
      marginLeft: 5,
      fontSize: "10px",
    },
    label: {
      paddingLeft: 3,
      marginRight: 10,
      fontSize: "10px",
    },
    justificacionContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 10,
      marginLeft: 20,
    },
    line: {
      borderBottom: 1,
      marginTop: 2,
      width: "60px",
      height: 0,
      borderColor: "#000",
      borderStyle: "solid",
      marginLeft: 20,
    },
    respuestaWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginLeft: 30,
      position: "relative",
    },
    xText: {
      position: "absolute",
      paddingLeft: 25,
      top: 0,
      fontSize: "10px",
      color: "#00008B",
    },
    whyContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 10,
    },
  });
  function formatWeight(weight) {
    // Convierte el valor a número y verifica si es válido
    const numericWeight = parseFloat(weight);

    // Si es un número y tiene más de dos decimales, lo formatea a dos decimales
    if (!isNaN(numericWeight)) {
      const weightString = numericWeight.toString();
      if (weightString.includes(".")) {
        const decimalPart = weightString.split(".")[1];
        if (decimalPart.length > 2) {
          return numericWeight.toFixed(2) + " lb"; // Formatea a dos decimales
        }
      }
      return weight; // Retorna el valor tal cual
    }

    return ""; // Retorna vacío si no es un número
  }

  function formatHeight(height) {
    // Convierte el valor a número y verifica si es válido
    const numericHeight = parseFloat(height);

    // Si es un número y tiene más de dos decimales, lo formatea a dos decimales
    if (!isNaN(numericHeight)) {
      const weightString = numericHeight.toString();
      if (weightString.includes(".")) {
        const decimalPart = weightString.split(".")[1];
        if (decimalPart.length > 2) {
          return numericHeight.toFixed(2); // Formatea a dos decimales
        }
      }
      return height; // Retorna el valor tal cual
    }

    return ""; // Retorna vacío si no es un número
  }
  const height =
    formatHeight(resp?.newquestion16Height) ||
    formatHeight(prof?.height?.format) ||
    "";
  const weight =
    formatWeight(resp?.newquestion16Weight) ||
    formatWeight(prof?.weight?.lb) ||
    "";

  const mostrarYesNo = [4, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20].includes(
    index + 1
  );

  const renderYesNo = () => (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 20,
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <RespuestaYesNo label="YES:" checked={item.respuesta === true} />
        {index === 9 && (
          <View style={styles.whyContainer}>
            <Text style={[styles.label, { marginLeft: 10 }]}>Why?</Text>
            <Text
              style={[
                styles.label,
                {
                  color: "#00008B",
                  marginLeft: 5,
                  borderBottom: 1,
                  width: "80px",
                },
              ]}
            >
              {resp?.newquestion10Why}
            </Text>
          </View>
        )}

        <RespuestaYesNo label="NO:" checked={item.respuesta === false} />
      </View>{" "}
      {index === 14 && (
        <View style={{ paddingTop: 15, width: "100%" }}>
          <Text
            style={[
              styles.text,
              {
                borderBottom: 1,
                width: "525px",

                marginLeft: 10,
                fontSize: "10px",
                color: "#00008B",
              },
            ]}
          >
            {resp?.newquestion15Why}
          </Text>{" "}
        </View>
      )}
    </View>
  );

  const RespuestaYesNo = ({ label, checked }) => (
    <View style={styles.respuestaWrapper}>
      <Text style={styles.text}>{label}</Text>
      <Text style={styles.xText}>{checked ? "X" : ""}</Text>
      <View style={styles.line} />
    </View>
  );

  return (
    <View style={styles.preguntaContainer}>
      <Text style={[styles.text, { paddingLeft: 4 }]}>{item.pregunta}</Text>
      {mostrarYesNo && renderYesNo()}
      {index === 15 && (
        <View style={styles.justificacionContainer}>
          <Text style={styles.label}>Height:</Text>
          <Text style={[styles.input, { paddingTop: 3, color: "#00008B" }]}>
            {height}
          </Text>
          <Text style={[styles.label, { paddingLeft: 20 }]}>Weight:</Text>
          <Text style={[styles.input, { paddingTop: 3, color: "#00008B" }]}>
            {weight}
          </Text>
        </View>
      )}
      {!mostrarYesNo && index !== 15 && (
        <Text
          style={[
            styles.text_subrayado,
            styles.respuestaContainer,
            { color: "#00008B" },
          ]}
        >
          {item.respuesta}
        </Text>
      )}
    </View>
  );
}
