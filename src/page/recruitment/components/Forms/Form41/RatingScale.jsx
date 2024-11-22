import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function RatingScale() {
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
                  fontWeight: "bold",
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
              I-PMSSA-01 INSTRUCTIVE GETTING ON BOARD.
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
              I-PMSSA-02 SAFETY TRAINING INSTRUCTIONS FOR CREW MEMBERS
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
              I-PMSSA-03 ETHICS POLICIES AND STANDARD OF CONDUCT ON BOARD.
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
              I-PMSSA-05 WELCOME ON BOARD.
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
              I-PMSSA-06 ONBOARD WORKPLACE SAFETY TRAINING
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
                  color: "#00008B",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "20px",
                  textAlign: "center",
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
                  color: "#00008B",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "30px",
                  textAlign: "center",
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
                  color: "#00008B",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "30px",
                  textAlign: "center",
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
                  color: "#00008B",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "20px",
                  textAlign: "center",
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
                  color: "#00008B",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "30px",
                  textAlign: "center",
                  borderBottom: 1,
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
