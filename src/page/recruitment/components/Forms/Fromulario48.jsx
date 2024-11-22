import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

import ImgFirma from "../../../../assets/imagenes/FIRMA_LETICIA_ALVARADO.png";
import Encabezado from "./Encabezado";

export default function Formulario48({ data = {}, interview = {} }) {
  const styles = StyleSheet.create({
    header: {
      position: "fixed",
      top: 10,
      left: 0,
      right: 0,
      paddingBottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    page: {
      paddingTop: 10,
      paddingBottom: 5,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: "#FFFFFF",
    },
    section: {
      margin: "0 40 0 40",
      flexGrow: 1,
    },
    text: {
      fontSize: "10px",
      fontWeight: "bold",
      color: "#00008B",
      lineHeight: 1.0,
    },
  });

  // Función para convertir la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return " ";
    }

    // Ajustar la fecha sumando un día (24 horas)
    date.setUTCDate(date.getUTCDate() + 1);

    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formattedDate = interview?.interviewDate
    ? formatDate(interview.interviewDate)
    : " ";

  const fullName =
    (data?.seafarerData?.seafarerProfile?.profile?.firstName || "") +
    " " +
    (data?.seafarerData?.seafarerProfile?.profile?.lastName || "");

  const firma = data?.signature?.url || null;
  return (
    <>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header} fixed>
          <Encabezado
            text1="INFORMATION CONFIDENTIALITY AGREEMENT"
            code="F-PMSSA-48"
            revision="00"
            date="May 18th, 2023"
          />
        </View>
        <View style={[styles.section, { paddingTop: 20 }]}>
          <Text style={[{ fontSize: "11px", paddingTop: 10, lineHeight: 1.7 }]}>
            Dear Applicant
          </Text>

          <Text style={[{ fontSize: "11px", paddingTop: 10, lineHeight: 1.7 }]}>
            The purpose of this document is to set forth the terms and
            conditions of the confidentiality of the information the company has
            received from me in my application process.
          </Text>
          <Text style={[{ fontSize: "11px", paddingTop: 10, lineHeight: 1.7 }]}>
            I hereby confirm that I give consent with regards to the fully
            processing of my personal data. {"\n"}I understand that my personal
            data will be stored and will be distributed for service purposes and
            reporting when required. I have been well-informed on the right to
            request to access and rectification or erase of my personal data and
            the right to withdraw this consent at any time. {"\n"}
            This consent does not have a date of expiration and is given of my
            own free will.
          </Text>
          <Text style={[{ fontSize: "11px", paddingTop: 10, lineHeight: 1.7 }]}>
            As a company Logistic International Service Corporation agrees not
            to use the applicant's signature for any fraudulent or illegal
            purpose. The company is responsible for maintaining the
            confidentiality of my personal information and will not disclose it
            to any third party without my prior written consent.
          </Text>
          <Text style={[{ fontSize: "11px", paddingTop: 40, lineHeight: 1.7 }]}>
            Logistics International Services Corporation
          </Text>
          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 40 }]}
          >
            <Text style={[{ fontSize: "11px", paddingRight: 5 }]}>
              Crew Members name:{" "}
            </Text>
            <Text
              style={[
                {
                  fontSize: "11px",
                  borderBottom: 1,
                  width: "52%",

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
                  width: 150,
                  height: 100,
                  position: "absolute",
                  marginLeft: 60,
                  marginTop: 415,
                },
              ]}
            ></Image>
          ) : (
            <View style={{}} /> // Espacio vacío
          )}

          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 50 }]}
          >
            <Text style={[{ fontSize: "11px", paddingRight: 5 }]}>Sign</Text>
            <Text
              style={[
                {
                  fontSize: "11px",
                  borderBottom: 1,
                  borderTop: 1,
                  border: 1,
                  paddingLeft: 15,
                  height: "70px",
                  width: "350px",
                },
              ]}
            ></Text>
          </View>

          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 35 }]}
          >
            <Text style={[{ fontSize: "11px", paddingRight: 5 }]}>Date:</Text>
            <Text
              style={[
                {
                  fontSize: "11px",
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
