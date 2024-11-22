import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { useSelector } from "react-redux";

import Encabezado from "../Encabezado";
import ImgFirma from "../../../../../assets/imagenes/FIRMA_LETICIA_ALVARADO.png";
import ImgFirmaS from "../../../../../assets/imagenes/LICONA KEVIN - FIRMA.png";
import RatingScale from "./RatingScale";

export default function Formulario41({
  data = {},
  hiring = {},
  interviewData,
}) {
  const styles = StyleSheet.create({
    header: {
      position: "fixed",
      top: 10,
      left: 0,
      right: 0,
      paddingBottom: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    page: {
      paddingTop: 25,
      paddingBottom: 90,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: "#FFFFFF",
    },
    section: {
      margin: "10 20 10 20",
      flexGrow: 1,
    },
    text: {
      fontSize: "10px",
      fontWeight: "bold",
      color: "#00008B",
    },
    container: {
      paddingTop: 10,
      flexDirection: "row",
      alignItems: "flex-start",
    },
    column: {
      width: "30%",
    },
  });

  //FUNCION PARA LA FECHA DEL FORMATO
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return " ";
    }
    date.setUTCDate(date.getUTCDate() + 1);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formattedDate = hiring?.contractDate
    ? formatDate(hiring.contractDate)
    : " ";

  const fullName =
    (data?.seafarerData?.seafarerProfile?.profile?.firstName || "\u00A0") +
    " " +
    (data?.seafarerData?.seafarerProfile?.profile?.lastName || "\u00A0");

  const firma = data?.signature?.url || null;

  const interviewId = hiring?.interviewer?.id || "";
  const interviewers = interviewData || [];

  // Buscar la firma según la coincidencia entre interviewId y uid
  const firmaEntrevistador =
    interviewers.some((interviewer) => {
      if (interviewer.uid === interviewId) {
        return interviewData.signature?.url || null;
      }
    }) || null;

  return (
    <>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header} fixed>
          <Encabezado
            text1="PRE-DEPARTURE ORIENTATION SEMINAR"
            code="F-PMSSA-41"
            revision="02"
            date="Dec 28th, 2022"
          />
        </View>
        <View style={styles.section}>
          <RatingScale />
          <Text style={[{ fontSize: "10px", paddingTop: 25 }]}>
            Crew member's statement:{" "}
          </Text>
          <Text style={[{ fontSize: "10px", paddingTop: 10 }]}>
            I have attended the instructions presented on the conduct on board
            as well as those related tothe work to be performed, and I believe
            that the information contained will help me to understand the
            functions I will perform on board the ship and understand what life
            is like at sea.
          </Text>
          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 30 }]}
          >
            <Text style={[{ fontSize: "10px" }]}>CREW MEMBER'S NAME: </Text>
            <Text
              style={[
                {
                  fontSize: "10px",
                  borderBottom: 1,
                  width: "400px",
                  paddingLeft: 5,
                  color: "#00008B",
                },
              ]}
            >
              {fullName}
            </Text>
          </View>
          {firma ? (
            <Image
              source={firma ? { uri: firma } : null}
              style={[
                {
                  width: 70,
                  height: 70,
                  position: "absolute",
                  marginLeft: 60,
                  marginTop: 265,
                },
              ]}
            ></Image>
          ) : (
            <View style={{}} /> // Espacio vacío
          )}

          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 50 }]}
          >
            <Text style={[{ fontSize: "10px" }]}>SIGNATURE </Text>
            <Text
              style={[{ fontSize: "10px", borderBottom: 1, width: "150px" }]}
            ></Text>
          </View>

          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 10 }]}
          >
            <Text style={[{ fontSize: "10px" }]}>DATE:</Text>
            <Text
              style={[
                {
                  fontSize: "10px",
                  borderBottom: 1,
                  width: "150px",
                  color: "#00008B",
                },
              ]}
            >
              {formattedDate ? formattedDate : "\u00A0"}
            </Text>
          </View>

          <Text style={[{ fontSize: "10px", paddingTop: 30 }]}>
            Concluding Remarks:
          </Text>
          <Text
            style={[{ fontSize: "10px", borderBottom: 1, paddingTop: 10 }]}
          ></Text>

          <Text style={[{ fontSize: "10px", marginRight: 10, paddingTop: 30 }]}>
            LOGISTIC Representative Name:{" "}
          </Text>
          <Text
            style={[
              {
                fontSize: "10px",
                borderBottom: 1,
                width: "300px",
                paddingLeft: 5,
                paddingTop: 20,
                color: "#00008B",
              },
            ]}
          >
            {hiring.interviewer && hiring.interviewer.name
              ? hiring.interviewer.name
              : " \u00A0"}
          </Text>

          {firmaEntrevistador ? (
            <Image
              source={firmaEntrevistador ? { uri: firmaEntrevistador } : null}
              style={[
                {
                  width: 70,
                  height: 70,
                  position: "absolute",
                  marginLeft: 60,
                  marginTop: 480,
                },
              ]}
              resizeMode="contain"
            />
          ) : (
            <View style={{}} /> // Espacio vacío
          )}
          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 50 }]}
          >
            <Text style={[{ fontSize: "10px" }]}>SIGNATURE </Text>
            <Text
              style={[{ fontSize: "10px", borderBottom: 1, width: "150px" }]}
            ></Text>
          </View>

          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 10 }]}
          >
            <Text style={[{ fontSize: "10px" }]}>DATE:</Text>
            <Text
              style={[
                {
                  fontSize: "10px",
                  borderBottom: 1,
                  width: "150px",
                  color: "#00008B",
                },
              ]}
            >
              {formattedDate ? formattedDate : ""}
            </Text>
          </View>
        </View>
      </Page>
    </>
  );
}
