import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function Participation() {
  const styles = StyleSheet.create({
    table: {
      display: "table",
      width: "5%",
      borderStyle: "solid",
      borderColor: "#000",
    },
    row: {
      flexDirection: "row",
    },
    cell: {
      width: "50%",
      borderStyle: "solid",
      borderColor: "#000",
    },
    text: {
      margin: 5,
      fontSize: 10,
    },
    borderBottom: {
      borderBottomWidth: 1, // Elimina el borde inferior
    },
  });

  return (
    <>
      <View style={{ paddingTop: 20 }}>
        <View style={[styles.table, { borderTop: 1 }]}>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.text}>WORK</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
