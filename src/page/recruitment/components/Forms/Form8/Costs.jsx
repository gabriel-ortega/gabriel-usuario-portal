import React from "react";
import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
export default function Costs({
  text1,
  text2,
  text3,
  text4,
  text5,
  text6,
  text7,
  text8,
  text9,
  text10,
  text11,
  text12,
  text13,
  text14,
}) {
  const styles = StyleSheet.create({
    header: {
      position: "fixed",
      top: 25,
      left: 0,
      right: 0,
      paddingBottom: 45,
      justifyContent: "center",
      alignItems: "center",
    },
    page: {
      paddingBottom: 90,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: "#FFFFFF",
    },
    section: {
      margin: "10 20 20 20",
      flexGrow: 1,
    },
    text: {
      fontSize: "10px",
      fontWeight: "bold",
      color: "#00008B",
    },
    container: {
      paddingTop: 90,
      flexDirection: "row",
      alignItems: "flex-start",
    },
    column: {
      width: "30%",
      // Ajusta este valor según tus necesidades
    },
    container1: {
      paddingTop: 10,
      flexDirection: "row",
      alignItems: "flex-start",
    },
  });

  return (
    <View style={[styles.container1, {}]}>
      <View style={[{ paddingTop: 5, paddingLeft: 50, width: "65%" }]}>
        <Text style={[{ fontSize: "11px" }]}>{text1}</Text>
        <Text style={[{ fontSize: "11px", paddingTop: 17 }]}>{text2}</Text>
        <Text style={[{ fontSize: "11px", paddingTop: 17 }]}>{text3}</Text>
        <Text style={[{ fontSize: "11px", paddingTop: 17 }]}>{text4}</Text>
        <Text style={[{ fontSize: "11px", paddingTop: 17 }]}>{text5}</Text>
        <Text style={[{ fontSize: "11px", paddingTop: 17 }]}>{text6}</Text>
        <Text style={[{ fontSize: "11px", paddingTop: 17 }]}>{text7}</Text>
      </View>

      <View style={[{ paddingTop: 0, width: "35%", marginLeft: 50 }]}>
        <View style={[{ display: "flex", flexDirection: "row" }]}>
          <Text style={[{ fontSize: "11px", paddingTop: 10 }]}>$ </Text>
          <Text
            style={[
              {
                fontSize: "11px",
                borderBottom: 1,
                width: "50%",
                color: "#00008B",
                paddingTop: 10,
              },
            ]}
          >
            {text8}
          </Text>
        </View>

        <View
          style={[{ display: "flex", flexDirection: "row", paddingTop: 5 }]}
        >
          <Text style={[{ fontSize: "11px", paddingTop: 10 }]}>$</Text>
          <Text
            style={[
              {
                fontSize: "11px",
                borderBottom: 1,
                width: "50%",
                color: "#00008B",
                paddingTop: 10,
              },
            ]}
          >
            {text9}
          </Text>
        </View>
        <View
          style={[{ display: "flex", flexDirection: "row", paddingTop: 5 }]}
        >
          <Text style={[{ fontSize: "11px", paddingTop: 10 }]}>$</Text>
          <Text
            style={[
              {
                fontSize: "11px",
                borderBottom: 1,
                width: "50%",
                color: "#00008B",
                paddingTop: 10,
              },
            ]}
          >
            {text10}
          </Text>
        </View>
        <View
          style={[{ display: "flex", flexDirection: "row", paddingTop: 5 }]}
        >
          <Text style={[{ fontSize: "11px", paddingTop: 10 }]}>$</Text>
          <Text
            style={[
              {
                fontSize: "11px",
                borderBottom: 1,
                width: "50%",
                color: "#00008B",
                paddingTop: 10,
              },
            ]}
          >
            {text11}
          </Text>
        </View>
        <View
          style={[{ display: "flex", flexDirection: "row", paddingTop: 5 }]}
        >
          <Text style={[{ fontSize: "11px", paddingTop: 10 }]}>$</Text>
          <Text
            style={[
              {
                fontSize: "11px",
                borderBottom: 1,
                width: "50%",
                color: "#00008B",
                paddingTop: 10,
              },
            ]}
          >
            {text12}
          </Text>
        </View>
        <View
          style={[{ display: "flex", flexDirection: "row", paddingTop: 5 }]}
        >
          <Text style={[{ fontSize: "11px", paddingTop: 10 }]}>$</Text>
          <Text
            style={[
              {
                fontSize: "11px",
                borderBottom: 1,
                width: "50%",
                color: "#00008B",
                paddingTop: 10,
              },
            ]}
          >
            {text13}
          </Text>
        </View>
        <View
          style={[{ display: "flex", flexDirection: "row", paddingTop: 5 }]}
        >
          <Text style={[{ fontSize: "11px", paddingTop: 10 }]}></Text>
          <Text
            style={[
              {
                fontSize: "11px",
                borderBottom: 0,
                width: "50%",
                color: "#00008B",
                paddingTop: 10,
              },
            ]}
          >
            {text14}
          </Text>
        </View>
      </View>
    </View>
  );
}
