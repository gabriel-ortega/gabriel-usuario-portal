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
import VerifyDocuments from "./VerifyDocuments";
import ImgFirma from "../../../../../assets/imagenes/FIRMA_LETICIA_ALVARADO.png";
import Encabezado from "../Encabezado";

export default function Formulario10({
  data = {},
  hiring = {},
  interviewData = {},
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

  // Formatear la fecha si está disponible
  const formattedDate = hiring?.contractDate
    ? formatDate(hiring.contractDate)
    : "";

  // Obtener el entrevistador

  const nameInterview = hiring?.interviewer?.name;
  const fullName =
    (data?.seafarerData?.seafarerProfile?.profile?.firstName || "") +
    " " +
    (data?.seafarerData?.seafarerProfile?.profile?.lastName || "");

  const firma = data?.signature?.url || null;
  const interviewId = hiring?.interviewer?.id || "";
  const interviewers = interviewData || [];

  // Buscar la firma según la coincidencia entre interviewId y uid
  const firmaEntrevistador =
    interviewers.find((interviewer) => interviewer.id === interviewId)
      ?.signature?.url || null;
  return (
    <>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header} fixed>
          <Encabezado
            text1="VERIFICATION AND VALIDATION OF CREW"
            text2="DOCUMENTS"
            code="F-PMSSA-10"
            revision="03"
            date="Dec 28th, 2022"
          />
        </View>
        <View style={styles.section}>
          <VerifyDocuments />
          <Text
            style={[{ fontSize: "10px", paddingTop: 15, fontWeight: "bold" }]}
          >
            Crew member's statement:{" "}
          </Text>
          <Text style={[{ fontSize: "10px", paddingTop: 10 }]}>
            I have delivered the documents requested by the Placement Agency, to
            proceed to carry out the respective verification in relation to the
            period of validity of the same. In addition, I authorize the
            Placement Agency to carry out the validations of the documents. I am
            aware that, if any anomaly is found in any of the documents in the
            validation, the Placement Agency is free to suspend the procedures
            carried out to date.{" "}
          </Text>
          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 20 }]}
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
                  width: 80,
                  height: 70,
                  position: "absolute",
                  marginLeft: 60,
                  marginTop: 295,
                },
              ]}
            ></Image>
          ) : (
            <View style={{}} /> // Espacio vacío
          )}

          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 50 }]}
          >
            <Text style={[{ fontSize: "10px" }]}>SIGN </Text>
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
              {formattedDate}
            </Text>
          </View>

          <Text style={[{ fontSize: "10px", paddingTop: 30 }]}>
            Concluding Remarks:
          </Text>
          <Text
            style={[{ fontSize: "10px", borderBottom: 1, paddingTop: 10 }]}
          ></Text>
          <Text
            style={[{ fontSize: "10px", borderBottom: 1, paddingTop: 10 }]}
          ></Text>
          <Text
            style={[{ fontSize: "10px", borderBottom: 1, paddingTop: 10 }]}
          ></Text>
          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 30 }]}
          >
            <Text style={[{ fontSize: "10px", marginRight: 10 }]}>
              LOGISTIC Representative Name:{" "}
            </Text>
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
              {" "}
              {nameInterview}
            </Text>
          </View>
          {firmaEntrevistador ? (
            <Image
              source={firmaEntrevistador ? { uri: firmaEntrevistador } : null}
              style={[
                {
                  width: 80,
                  height: 70,
                  position: "absolute",
                  marginLeft: 60,
                  marginTop: 475,
                },
              ]}
              resizeMode="contain"
            />
          ) : (
            <View style={{}} /> // Espacio vacío
          )}

          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 30 }]}
          >
            <Text style={[{ fontSize: "10px" }]}>SIGN </Text>
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
              {formattedDate}
            </Text>
          </View>
        </View>
      </Page>
    </>
  );
}
